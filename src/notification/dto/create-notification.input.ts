import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field({ description: 'Notification message', nullable: false })
  message?: string;

  @Field({ description: 'Notifiable Id', nullable: false })
  notiFiableId?: string;

  @Field({ description: 'notification priority', nullable: false })
  priority?: string;
}
