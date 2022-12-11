import { ICommand } from '@nestjs/cqrs';
import { ValidateOptInput } from 'src/users/dto';

export class ValidateOtpCommand implements ICommand {
  constructor(public readonly payload: ValidateOptInput) {}
}
