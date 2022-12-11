import { ICommand } from '@nestjs/cqrs';
import { CreateDocumentInput } from '@paymais/document/dtos';

export class CreateDocumentCommand implements ICommand {
  constructor(public readonly payload: CreateDocumentInput) {}
}
