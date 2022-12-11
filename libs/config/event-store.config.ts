import { Injectable } from '@nestjs/common';
import {
  EventStoreOptionsFactory,
  EventStoreModuleOptions,
} from '@juicycleff/nestjs-event-store';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventstoreConfigService implements EventStoreOptionsFactory {
  constructor(private configService: ConfigService) {}

  createEventStoreOptions(
    connectionName?: string,
  ): EventStoreModuleOptions | Promise<EventStoreModuleOptions> {
    return {
      type: 'event-store',
      tcpEndpoint: {
        host: this.configService.get('EVENT_STORE_HOSTNAME'),
        port: this.configService.get('EVENT_STORE_TCP_PORT'),
      },
      options: {
        defaultUserCredentials: {
          password: this?.configService?.get('EVENT_STORE_TCP_PASSWORD'),
          username: this.configService?.get('EVENT_STORE_TCP_USERNAME'),
        },
      },
    };
  }
}
