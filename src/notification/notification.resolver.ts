import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { NotificationEntity } from './entities/notification.entity';
import {
  UpdateNotificationInput,
  Notification,
  CreateNotificationInput,
} from './dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Mutation(() => Notification)
  createNotification(
    @Args('createNotificationInput')
    createNotificationInput: CreateNotificationInput,
  ) {
    return this.notificationService.create(createNotificationInput);
  }

  @Query(() => [Notification], { name: 'notification' })
  findAll() {
    return this.notificationService.findAll();
  }

  @Query(() => Notification, { name: 'notification' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.notificationService.findOne(id);
  }

  @Mutation(() => Notification)
  updateNotification(
    @Args('updateNotificationInput')
    updateNotificationInput: UpdateNotificationInput,
  ) {}

  @Mutation(() => Notification)
  removeNotification(@Args('id', { type: () => Int }) id: number) {
    return this.notificationService.remove(id);
  }
}
