import { ICommand } from '@nestjs/cqrs';

export class SendValidateAccountOtpCommand implements ICommand {
  constructor(public readonly payload: { phoneNumber: string }) {}
}
