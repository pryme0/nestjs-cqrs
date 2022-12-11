import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/database';
import { UserEntity, UserDocument } from '../entities';

export class UserRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
