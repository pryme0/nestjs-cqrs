import { Logger } from '@nestjs/common';
import {
  CommandHandler,
  ICommandHandler,
  EventBus,
  QueryBus,
  CommandBus,
} from '@nestjs/cqrs';
import { ResetUserPasswordCommand, UpdateUserCommand } from '../impl';
import { GetUserQuery } from '../../queries';
import { HttpQueryError } from 'apollo-server-core';
import { ResetUserPasswordResponse, User } from 'src/users/dto';

/**
 * @implements {ICommandHandler<UpdateUserCommand>}
 * @classdesc CQRS command to update user entity
 * @class
 */
@CommandHandler(ResetUserPasswordCommand)
export class ResetUserPasswordCommandHandler
  implements ICommandHandler<ResetUserPasswordCommand>
{
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(
    command: ResetUserPasswordCommand,
  ): Promise<ResetUserPasswordResponse> {
    this.logger.log(`Async ${command.constructor.name}...`);
    const { payload } = command;
    try {
      const user = await this.queryBus.execute(
        new GetUserQuery({ phoneNumber: payload.phoneNumber }),
      );
      if (!user) {
        throw new HttpQueryError(400, 'Phone number not valid');
      }

      await this.commandBus.execute(
        new UpdateUserCommand({
          id: user._id,
          input: { password: payload.password },
        }),
      );

      return { message: 'Your password reset was sucessful' };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }
}
