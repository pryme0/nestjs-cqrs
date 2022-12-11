import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentEntity, documentSchema } from '@paymais/document/entities';
import { AwsModule, S3Service } from '@paymais/libs';
import { DocumentCommandhandlers, documentQueryhandlers } from './cqrs/index';
import { DocumentRepository } from '@paymais/document/repositories';

@Module({
  imports: [
    CqrsModule,
    AwsModule,
    MongooseModule.forFeature([
      { name: DocumentEntity.name, schema: documentSchema },
    ]),
  ],
  providers: [
    S3Service,
    ...DocumentCommandhandlers,
    ...documentQueryhandlers,
    DocumentRepository,
  ],
})
export class DocumentModule {}
