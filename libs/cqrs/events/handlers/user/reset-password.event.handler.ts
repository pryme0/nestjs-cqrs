import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SmsService } from '@paymais/notification/cqrs/sms/sms.service';
import { ResetPasswordEvent } from '../../impl/index';

@EventsHandler(ResetPasswordEvent)
export class SendResetPasswordSmsEventHandler
  implements IEventHandler<ResetPasswordEvent>
{
  constructor(private readonly smsService: SmsService) {}

  handle(event: ResetPasswordEvent): any {
    console.log(event);
    const { payload } = event;
    this.smsService.sendSms({
      message: payload.message,
      phoneNumber: payload.phoneNumber,
    });
  }
}
