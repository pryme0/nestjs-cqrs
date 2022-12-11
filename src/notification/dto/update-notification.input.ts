import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NotificationInput {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  notifiableid?: string;

  @Field({ nullable: true })
  notificationType?: string;

  @Field({ nullable: true })
  seen?: boolean;

  @Field({ nullable: true })
  priority?: string;

  @Field({ nullable: true })
  isDeleted?: boolean;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class UpdateNotificationInput {
  @Field({ nullable: true })
  id?: string;
  @Field(() => NotificationInput, { nullable: true })
  updatedAt?: Partial<NotificationInput>;
}
