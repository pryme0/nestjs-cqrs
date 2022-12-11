import { IQuery } from '@nestjs/cqrs';
import { FindUserInput } from 'src/users/dto';

export class GetUserQuery implements IQuery {
  constructor(public readonly payload: Partial<FindUserInput>) {}
}
