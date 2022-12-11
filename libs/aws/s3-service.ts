import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { fileReader, FileUploadedInterface } from '@paymais/libs';
@Injectable()
export class S3Service {
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}
  async fileUpload({ file, key }): Promise<FileUploadedInterface> {
    try {
      const fileBuffer = await fileReader(file);

      const upladDataToS3 = await this.s3
        .upload({
          Bucket: 'paymais-s3-bucket',
          Key: key,
          Body: fileBuffer,
        })
        .promise();
      return upladDataToS3;
    } catch (error) {
      console.log('file upload failed');
      console.log(error);
      throw error;
    }
  }
}
