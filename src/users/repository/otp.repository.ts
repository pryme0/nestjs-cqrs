import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/database';
import { OtpEntity, OtpDocument } from '../entities';

export class OtpRepository extends BaseRepository<OtpDocument> {
  constructor(
    @InjectModel(OtpEntity.name)
    private readonly otpModel: Model<OtpDocument>,
  ) {
    super(otpModel);
  }
}
