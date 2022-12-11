import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/users/repository';
import { CreateSmsCommand } from '../impl';
/**
 * @implements {ICommandHandler<UpdateUserCommand>}
 * @classdesc CQRS command to update user entity
 * @class
 */
@CommandHandler(CreateSmsCommand)
export class CreateSMSCommandHandler
  implements ICommandHandler<CreateSmsCommand>
{
  logger = new Logger(this.constructor.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateSmsCommand): Promise<any> {
    this.logger.log(`Async ${command.constructor.name}...`);
    const { payload } = command;
    try {
      console.log({ fromHandler: payload });
    } catch (error) {
      this.logger.log(error);
    }
  }
}
