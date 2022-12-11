import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from '@paymais/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { NotificationModule } from '@paymais/notification/notification.module';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import { AwsModule } from '@paymais/libs';
import { DocumentModule } from '@paymais/document/document.module';
import { EventStoreModule } from '@juicycleff/nestjs-event-store';
import { EventstoreConfigService } from '@paymais/libs';

@Module({
  imports: [
    AwsModule,
    EventStoreModule.registerAsync({
      type: 'event-store',
      useClass: EventstoreConfigService,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      path: '/paymais-graphql',
      driver: ApolloDriver,
      playground: true,
      uploads: false, // disable built-in upload handling
      introspection: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    DocumentModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('/paymais-graphql');
  }
}
