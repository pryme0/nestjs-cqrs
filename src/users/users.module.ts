import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { OtpRepository, UserRepository } from './repository';
import { UserCommandhandlers, UserQueryHandlers } from './cqrs';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpEntity, UserEntity, UserSchema, OtpSchema } from './entities';
import {
  AwsModule,
  EncryptionService,
  S3Service,
  SendOtpEvent,
  UserEventHandlers,
} from '../../libs';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  EventStoreSubscriptionType,
  EventStoreModule,
} from '@juicycleff/nestjs-event-store';

@Module({
  imports: [
    CqrsModule,
    EventStoreModule.registerFeature({
      featureStreamName: '$ce-user',
      type: 'event-store',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-notifications',
        },
      ],
      eventHandlers: {},
    }),
    AwsModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1H' },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: UserEntity.name, schema: UserSchema },
      { name: OtpEntity.name, schema: OtpSchema },
    ]),
  ],
  providers: [
    EncryptionService,
    UsersResolver,
    UserRepository,
    OtpRepository,
    S3Service,
    ...UserCommandhandlers,
    ...UserQueryHandlers,
  ],
})
export class UsersModule {}
