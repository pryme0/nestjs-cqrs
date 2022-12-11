import { ICommand } from '@nestjs/cqrs';

export class SendResetPasswordOtpCommand implements ICommand {
  constructor(public readonly payload: { phoneNumber: string }) {}
}
