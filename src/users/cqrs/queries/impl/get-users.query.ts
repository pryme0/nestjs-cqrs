import { IQuery } from '@nestjs/cqrs';
import { UserFilterArgs } from 'src/users/dto';

export class GetUsersQuery implements IQuery {
  constructor(public readonly payload: Partial<UserFilterArgs>) {}
}
