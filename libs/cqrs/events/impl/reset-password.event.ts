import { IEvent } from '@nestjs/cqrs';

export class ResetPasswordEvent implements IEvent {
  constructor(
    public readonly payload: {
      phoneNumber: string | [string];
      message: string;
    },
  ) {}
}
