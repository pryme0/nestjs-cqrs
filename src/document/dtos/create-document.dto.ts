import { Field, ObjectType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';

@ObjectType()
export class CreateDocumentInput {
  @Field({ nullable: true })
  key?: string;

  @Field({ nullable: true })
  owner?: string;

  @Field({ nullable: true })
  documentType?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  document: FileUpload;
}
