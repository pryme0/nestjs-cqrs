import { Logger } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserEntity } from 'src/users/entities';
import { UserRepository } from 'src/users/repository';
import { GetUsersQuery } from '../impl';
/**
 * @implements {IQueryHandler<UpdateUserCommand>}
 * @classdesc CQRS command to update user entity
 * @class
 */
@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: GetUsersQuery): Promise<UserEntity[]> {
    this.logger.log(`Async ${command.constructor.name}...`);
    const { payload } = command;
    try {
      return await this.userRepository.getAll(payload);
    } catch (error) {
      this.logger.log(error);
    }
  }
}
