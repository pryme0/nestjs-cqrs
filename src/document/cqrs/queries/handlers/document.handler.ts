import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DocumentQuery } from '../impl/document.query';

@QueryHandler(DocumentQuery)
export class DocumentHandler implements IQueryHandler<DocumentQuery> {
  async execute(query: DocumentQuery) {
    console.log({ query });
  }
}
