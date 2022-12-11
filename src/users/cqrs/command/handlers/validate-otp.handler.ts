import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OtpRepository } from 'src/users/repository';
import { ValidateOtpCommand } from '../impl';
import { HttpQueryError } from 'apollo-server-core';
import { ValidateOtpResponse } from 'src/users/dto';

/**
 * @implements {ICommandHandler<UpdateUserCommand>}
 * @classdesc CQRS command to update user entity
 * @class
 */
@CommandHandler(ValidateOtpCommand)
export class ValidateOtpCommandHandler
  implements ICommandHandler<ValidateOtpCommand>
{
  logger = new Logger(this.constructor.name);

  constructor(private readonly otpRepository: OtpRepository) {}

  async execute(command: ValidateOtpCommand): Promise<ValidateOtpResponse> {
    this.logger.log(`Async ${command.constructor.name}...`);
    const { payload } = command;
    try {
      const otpIsValid = await this.otpRepository.get({ otp: payload.otp });

      if (!otpIsValid) {
        throw new HttpQueryError(400, 'Otp is invalid');
      }

      await this.otpRepository.remove(otpIsValid._id);

      return {
        message: 'Your password reset was sucessful',
        phoneNumber: otpIsValid.phoneNumber,
        userId: otpIsValid.userId,
      };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }
}
