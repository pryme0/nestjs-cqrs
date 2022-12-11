import { Logger } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserEntity } from 'src/users/entities';
import { UserRepository } from 'src/users/repository';
import { GetUserQuery } from '../impl';
/**
 * @implements {IQueryHandler<UpdateUserCommand>}
 * @classdesc CQRS command to update user entity
 * @class
 */
@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: GetUserQuery): Promise<UserEntity> {
    this.logger.log(`Async ${command.constructor.name}...`);
    const { payload } = command;
    try {
      return await this.userRepository.get(payload);
    } catch (error) {
      this.logger.log(error);
    }
  }
}
