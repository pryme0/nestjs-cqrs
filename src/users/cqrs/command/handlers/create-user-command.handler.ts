import { Logger } from '@nestjs/common';
import {
  CommandHandler,
  ICommandHandler,
  EventBus,
  QueryBus,
} from '@nestjs/cqrs';
import { UserRepository } from 'src/users/repository';
import { CreateUserCommand } from '../impl';
import { EncryptionService } from '../../../../../libs';
import { CreateUserResponse } from 'src/users/dto';
import { GetUserQuery } from '../../queries';
import { HttpQueryError } from 'apollo-server-core';
/**
 * @implements {ICommandHandler<UpdateUserCommand>}
 * @classdesc CQRS command to update user entity
 * @class
 */
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: EncryptionService,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResponse> {
    this.logger.log(`Async ${command.constructor.name}...`);
    const { payload } = command;
    try {
      const userExists = await this.queryBus.execute(
        new GetUserQuery({ phoneNumber: payload.phoneNumber }),
      );
      if (userExists) {
        throw new HttpQueryError(400, 'Phone number already in use');
      }
      const user = await this.userRepository.create(payload);
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
