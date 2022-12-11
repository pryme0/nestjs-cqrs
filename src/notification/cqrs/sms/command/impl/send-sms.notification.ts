import { ICommand } from '@nestjs/cqrs';

export class CreateSmsCommand implements ICommand {
  constructor(
    public readonly payload: {
      phoneNumber: string | [string];
      message: string;
    },
  ) {}
}
