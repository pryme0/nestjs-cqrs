import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { UserRepository } from 'src/users/repository';
import { UpdateUserCommand } from '@paymais/users/cqrs/command/impl';
import { UpdateUserResponse } from '@paymais/users/dto';
import { CreateDocumentCommand } from '@paymais/document/cqrs/index';
import * as bcrypt from 'bcrypt';
/**
 * @implements {ICommandHandler<UpdateUserCommand>}
 * @classdesc CQRS command to update user entity
 * @class
 */
@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<UpdateUserResponse> {
    this.logger.log(`Async ${command.constructor.name}...`);
    const { input, id } = command.payload;

    try {
      if (input.identityFile) {
        this.commandBus.execute(
          new CreateDocumentCommand({
            document: input.identityFile,
            key: `user/${id}/identityProof`,
            owner: id,
            documentType: 'IdentityProof',
          }),
        );
        delete input.identityFile;
      }

      if (input.addressFile) {
        this.commandBus.execute(
          new CreateDocumentCommand({
            document: input.addressFile,
            key: `user/${id}/addressProof`,
            owner: id,
            documentType: 'AddressProof',
          }),
        );
        delete input.addressFile;
      }
      if (input.password) {
        input.password = await bcrypt.hash(input.password, 10);
      }
      const updatedUser = await this.userRepository.update(id, input);
      return { user: updatedUser };
    } catch (error) {
      this.logger.log(error);
    }
  }
}
