import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import {
  EventStoreSubscriptionType,
  EventStoreModule,
} from '@juicycleff/nestjs-event-store';
import {
  ResetPasswordEvent,
  SendOtpEvent,
  UserEventHandlers,
} from '@paymais/libs';
import { SmsSaga } from './cqrs';
import { HttpModule } from '@nestjs/axios';
import { SmsService } from './cqrs/sms/sms.service';

@Module({
  imports: [
    HttpModule,
    CqrsModule,
    EventStoreModule.registerFeature({
      featureStreamName: '$ce-notifications',
      type: 'event-store',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-user',
        },
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-notifications',
        },
      ],
      eventHandlers: {
        SendOtpEvent: (data) => new SendOtpEvent(data),
        ResetPasswordEvent: (data) => new ResetPasswordEvent(data),
      },
    }),
  ],
  providers: [
    NotificationResolver,
    NotificationService,
    SmsService,
    ...UserEventHandlers,
  ],
})
export class NotificationModule {}
