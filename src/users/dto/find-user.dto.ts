import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindUserInput {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  gradeLevel?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  isDeleted?: string;

  @Field({ nullable: true })
  completed?: string;

  @Field({ nullable: true })
  organization?: string;

  @Field({ nullable: true })
  dateOfBirth?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  normalizedAddress?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@InputType()
export class PaginateInput {
  @Field({ nullable: true })
  nextCursor?: string;
  @Field({ nullable: true })
  limit?: number;
}

@InputType()
export class UserFilterArgs {
  @Field(() => FindUserInput, { nullable: true })
  where?: FindUserInput;
  @Field({ nullable: true })
  paginate?: PaginateInput;
}
