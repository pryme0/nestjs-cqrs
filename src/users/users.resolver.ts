import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateUserInput,
  CreateUserResponse,
  User,
} from './dto/create-user.input';
import {
  ResetUserPasswordInput,
  ResetUserPasswordResponse,
  SendOtpInput,
  SendPasswordResetOtpInput,
  SendPasswordResetOtpResponse,
  UpdateUserInput,
  UpdateUserResponse,
  ValidateOtpResponse,
  VerifyOtpInput,
  sendOtpResponse,
} from './dto/update-user.input';
import { UserFilterArgs, ValidateUserInput } from './dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateUserCommand,
  GetUserQuery,
  GetUsersQuery,
  RemoveUserCommand,
  ResetUserPasswordCommand,
  SendResetPasswordOtpCommand,
  SendValidateAccountOtpCommand,
  UpdateUserCommand,
  ValidateOtpCommand,
  ValidateUserCommand,
} from './cqrs';

@Resolver('User')
export class UsersResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Mutation(() => CreateUserResponse)
  async validate(
    @Args('validateUserInput') validateUserInput: ValidateUserInput,
  ): Promise<CreateUserResponse> {
    return this.commandBus.execute(new ValidateUserCommand(validateUserInput));
  }

  @Mutation(() => CreateUserResponse)
  async create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<CreateUserResponse> {
    return this.commandBus.execute(new CreateUserCommand(createUserInput));
  }

  @Query(() => [User])
  async findAll(@Args('query') query: UserFilterArgs) {
    return await this.queryBus.execute(new GetUsersQuery(query));
  }

  @Query(() => User)
  async findOne(@Args('query') query: UserFilterArgs) {
    return await this.queryBus.execute(new GetUserQuery(query.where));
  }

  @Mutation(() => UpdateUserResponse)
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.commandBus.execute(new UpdateUserCommand(updateUserInput));
  }

  @Mutation(() => sendOtpResponse)
  sendOtp(@Args('input') input: SendOtpInput) {
    return this.commandBus.execute(new SendValidateAccountOtpCommand(input));
  }

  @Mutation(() => User)
  remove(@Args('id') id: string) {
    return this.commandBus.execute(new RemoveUserCommand(id));
  }

  @Mutation(() => SendPasswordResetOtpResponse)
  sendResetPasswordOtp(
    @Args('input') input: SendPasswordResetOtpInput,
  ): Promise<SendPasswordResetOtpResponse> {
    return this.commandBus.execute(
      new SendResetPasswordOtpCommand({ phoneNumber: input.phoneNumber }),
    );
  }

  @Mutation(() => ValidateOtpResponse)
  verifyOtp(
    @Args('input') input: VerifyOtpInput,
  ): Promise<SendPasswordResetOtpResponse> {
    return this.commandBus.execute(new ValidateOtpCommand(input));
  }

  @Mutation(() => ResetUserPasswordResponse)
  resetPassword(@Args('payload') payload: ResetUserPasswordInput) {
    return this.commandBus.execute(new ResetUserPasswordCommand(payload));
  }
}
