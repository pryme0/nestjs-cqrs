import { Logger } from '@nestjs/common';
import {
  CommandHandler,
  ICommandHandler,
  EventBus,
  QueryBus,
  CommandBus,
} from '@nestjs/cqrs';
import { OtpRepository } from 'src/users/repository';
import { SendResetPasswordOtpCommand } from '../impl';
import { ResetPasswordEvent } from 'libs';
import { GetUserQuery } from '../../queries';
import { HttpQueryError } from 'apollo-server-core';

/**
 * @implements {ICommandHandler<UpdateUserCommand>}
 * @classdesc CQRS command to update user entity
 * @class
 */
@CommandHandler(SendResetPasswordOtpCommand)
export class SendPasswordResetOtpCommandHandler
  implements ICommandHandler<SendResetPasswordOtpCommand>
{
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly otpRepository: OtpRepository,
  ) {}

  async execute(command: SendResetPasswordOtpCommand): Promise<any> {
    this.logger.log(`Async ${command.constructor.name}...`);
    const { payload } = command;
    try {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const user = await this.queryBus.execute(
        new GetUserQuery({ phoneNumber: payload.phoneNumber }),
      );
      if (!user) {
        throw new HttpQueryError(400, 'Phone number not valid');
      }

      const creatOtp = await this.otpRepository.create({
        phoneNumber: payload.phoneNumber,
        userId: user._id,
        type: 'Password reset',
        otp,
      });

      this.eventBus.publish(
        new ResetPasswordEvent({
          phoneNumber: payload.phoneNumber,
          message: `You are trying to reset your paymais account password, please use the otp below ${creatOtp.otp}`,
        }),
      );

      return { message: 'Otp sent sucessfully' };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }
}
