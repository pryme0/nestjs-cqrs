import { IEvent } from '@nestjs/cqrs';

export class SendOtpEvent implements IEvent {
  constructor(
    public readonly payload: {
      phoneNumber: string;
      otp: string;
    },
  ) {}
}
