import { ICommand } from '@nestjs/cqrs';
import { ResetUserPasswordInput } from 'src/users/dto';

export class ResetUserPasswordCommand implements ICommand {
  constructor(public readonly payload: ResetUserPasswordInput) {}
}
