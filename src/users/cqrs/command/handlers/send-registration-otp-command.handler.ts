import { Logger } from '@nestjs/common';
import {
  CommandHandler,
  ICommandHandler,
  EventBus,
  QueryBus,
} from '@nestjs/cqrs';
import { OtpRepository } from 'src/users/repository';
import { SendValidateAccountOtpCommand } from '../impl';
import { SendOtpEvent } from 'libs';
import { GetUserQuery } from '../../queries';
import { HttpQueryError } from 'apollo-server-core';

/**
 * @implements {ICommandHandler<UpdateUserCommand>}
 * @classdesc CQRS command to update user entity
 * @class
 */
@CommandHandler(SendValidateAccountOtpCommand)
export class SendOtpCommandHandler
  implements ICommandHandler<SendValidateAccountOtpCommand>
{
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly otpRepository: OtpRepository,
  ) {}

  async execute(command: SendValidateAccountOtpCommand): Promise<any> {
    this.logger.log(`Async ${command.constructor.name}...`);
    const { payload } = command;
    try {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const user = await this.queryBus.execute(
        new GetUserQuery({ phoneNumber: payload.phoneNumber }),
      );
      if (user) {
        throw new HttpQueryError(400, 'Phone number is already in use');
      }

      await this.otpRepository.create({
        phoneNumber: payload.phoneNumber,
        userId: user._id,
        type: 'VERIFY_ACCOUNT',
        otp,
      });

      this.eventBus.publish(
        new SendOtpEvent({
          phoneNumber: payload.phoneNumber,
          otp: `You are trying to reset your paymais account password, please use the otp below ${otp}`,
        }),
      );

      return { message: 'Otp sent sucessfully' };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }
}
