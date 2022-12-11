import { Logger } from '@nestjs/common';
import {
  CommandHandler,
  ICommandHandler,
  EventBus,
  QueryBus,
} from '@nestjs/cqrs';
import { UserEntity } from 'src/users/entities';
import { UserRepository } from 'src/users/repository';
import { ValidateUserCommand } from '../impl';
import { EncryptionService, SendOtpEvent } from '../../../../../libs';
import { CreateUserResponse } from 'src/users/dto';
import { GetUserQuery } from '../../queries';
import { HttpQueryError } from 'apollo-server-core';
/**
 * @implements {ICommandHandler<UpdateUserCommand>}
 * @classdesc CQRS command to update user entity
 * @class
 */
@CommandHandler(ValidateUserCommand)
export class ValidateUserCommandHandler
  implements ICommandHandler<ValidateUserCommand>
{
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: EncryptionService,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: ValidateUserCommand): Promise<CreateUserResponse> {
    this.logger.log(`Async ${command.constructor.name}...`);
    const { payload } = command;
    try {
      const user = await this.queryBus.execute(
        new GetUserQuery({ phoneNumber: payload.phoneNumber }),
      );
      if (!user) {
        throw new HttpQueryError(400, 'Invalid user account');
      }

      const validatePassword = await user.validatePassword(payload.password);

      console.log({ validatePassword });

      if (!validatePassword) {
        throw new HttpQueryError(400, 'Invalid phone number or password');
      }

      this.eventBus.publish(
        new SendOtpEvent({ phoneNumber: '09077913316', otp: '12345' }),
      );

      const token = await this.jwtService.createToken({
        _id: user?._id,
      });
      return { token, user };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }
}
