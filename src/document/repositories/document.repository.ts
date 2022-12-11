import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/database';
import { DocumentEntity, documentDocument } from '@paymais/document/entities';

export class DocumentRepository extends BaseRepository<documentDocument> {
  constructor(
    @InjectModel(DocumentEntity.name)
    private readonly documentModel: Model<documentDocument>,
  ) {
    super(documentModel);
  }
}
