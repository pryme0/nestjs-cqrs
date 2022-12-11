import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SmsService } from '@paymais/notification/cqrs/sms/sms.service';
import { SendOtpEvent } from '../../impl/index';

@EventsHandler(SendOtpEvent)
export class SendOtpEventHandler implements IEventHandler<SendOtpEvent> {
  constructor(private readonly smsService: SmsService) {}
  handle(event: SendOtpEvent): any {
    const { payload } = event;
    console.log(event);
    this.smsService.sendSms({
      message: payload.otp,
      phoneNumber: payload.phoneNumber,
    });
  }
}
