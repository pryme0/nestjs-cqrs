import { ICommand } from '@nestjs/cqrs';
import { ValidateUserInput } from 'src/users/dto';

export class ValidateUserCommand implements ICommand {
  constructor(public readonly payload: ValidateUserInput) {}
}
