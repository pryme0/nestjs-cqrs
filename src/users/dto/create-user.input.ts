import { ObjectType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ nullable: false })
  phoneNumber: string;
  @Field({ nullable: false })
  password: string;
}

@InputType()
export class ValidateUserInput {
  @Field({ nullable: false })
  phoneNumber: string;
  @Field({ nullable: false })
  password: string;
}

@ObjectType()
export class  User {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  identityFile?: string;

  @Field({ nullable: true })
  addressFile?: string;

  @Field({ nullable: true })
  dateOfBirth?: string;

  @Field({ nullable: true })
  gradeLevel?: string;

  @Field({ nullable: true })
  organization?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  completed?: boolean;

  @Field({ nullable: true })
  isDeleted?: boolean;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@ObjectType()
export class CreateUserResponse {
  @Field({ nullable: true })
  token: string;
  @Field({ nullable: true })
  user: User;
}
