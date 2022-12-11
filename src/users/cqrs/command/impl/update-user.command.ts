import { ICommand } from '@nestjs/cqrs';
import { UpdateUserInput } from 'src/users/dto';

export class UpdateUserCommand implements ICommand {
  constructor(public readonly payload: UpdateUserInput) {}
}
