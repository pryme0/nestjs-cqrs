import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateDocumentCommand } from '@paymais/document/cqrs/commands/impl/index';
import { DocumentEntity } from '@paymais/document/entities';
import { DocumentRepository } from '@paymais/document/repositories';
import { S3Service } from '@paymais/libs/index';

@CommandHandler(CreateDocumentCommand)
export class CreateDocumentCommandhandler
  implements ICommandHandler<CreateDocumentCommand>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly s3Service: S3Service,
    private readonly documetRepository: DocumentRepository,
  ) {}

  async execute(command: CreateDocumentCommand): Promise<DocumentEntity> {
    const { payload } = command;

    const uploadedFile = await this.s3Service.fileUpload({
      file: payload.document,
      key: payload.key,
    });

    const document = await this.documetRepository.create({
      ...uploadedFile,
      owner: payload.owner,
      documentType: payload.documentType,
      document: uploadedFile.Location,
    });

    return document;
  }
}
