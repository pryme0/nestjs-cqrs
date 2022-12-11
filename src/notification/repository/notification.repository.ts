import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/database';
import { NotificationEntity, NotificationDocument } from '../entities';

export class NotificationRepository extends BaseRepository<NotificationDocument> {
  constructor(
    @InjectModel(NotificationEntity.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {
    super(notificationModel);
  }
}
