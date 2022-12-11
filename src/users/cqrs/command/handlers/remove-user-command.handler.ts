import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/users/repository';
import { RemoveUserCommand } from '../impl';
import { EncryptionService } from '../../../../../libs';
/**
 * @implements {ICommandHandler<UpdateUserCommand>}
 * @classdesc CQRS command to update user entity
 * @class
 */
@CommandHandler(RemoveUserCommand)
export class RemoveUserCommandHandler
  implements ICommandHandler<RemoveUserCommand>
{
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: EncryptionService,
  ) {}

  async execute(command: RemoveUserCommand): Promise<any> {
    this.logger.log(`Async ${command.constructor.name}...`);
    const { id } = command;
    try {
      return await this.userRepository.remove(id);
    } catch (error) {
      this.logger.log(error);
    }
  }
}
