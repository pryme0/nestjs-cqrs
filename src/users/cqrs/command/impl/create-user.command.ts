import { ICommand } from '@nestjs/cqrs';
import { CreateUserInput } from 'src/users/dto';

export class CreateUserCommand implements ICommand {
  constructor(public readonly payload: CreateUserInput) {}
}
