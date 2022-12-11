import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from './create-user.input';

import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';

@InputType()
export class UpdateUserInputDto {
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

  @Field(() => GraphQLUpload, { nullable: true })
  identityFile?: FileUpload;

  @Field(() => GraphQLUpload, { nullable: true })
  addressFile?: FileUpload;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  gradeLevel?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  isDeleted?: boolean;

  @Field({ nullable: true })
  completed?: boolean;

  @Field({ nullable: true })
  organization?: string;

  @Field({ nullable: true })
  dateOfBirth?: string;

  @Field({ nullable: true })
  address?: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: false })
  id: string;
  @Field({ nullable: false })
  input: UpdateUserInputDto;
}

@ObjectType()
export class UpdateUserResponse {
  @Field({ nullable: true })
  user: User;
}

@ObjectType()
export class sendOtpResponse {
  @Field({ nullable: true })
  message: string;
}

@InputType()
export class ResetUserPasswordInput {
  @Field({ nullable: true })
  password: string;
  @Field({ nullable: true })
  phoneNumber: string;
}

@ObjectType()
export class ResetUserPasswordResponse {
  @Field({ nullable: true })
  message: string;
}

@InputType()
export class ValidateOptInput {
  @Field({ nullable: true })
  otp: string;
}

@InputType()
export class SendPasswordResetOtpInput {
  @Field({ nullable: true })
  phoneNumber: string;
}

@InputType()
export class VerifyOtpInput {
  @Field({ nullable: true })
  otp: string;
}

@ObjectType()
export class SendPasswordResetOtpResponse {
  @Field({ nullable: true })
  message: string;
}

@ObjectType()
export class ValidateOtpResponse {
  @Field({ nullable: true })
  message: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  userId: string;
}

@InputType()
export class SendOtpInput {
  @Field({ nullable: false })
  phoneNumber: string;
}
