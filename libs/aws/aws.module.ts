import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { S3Service } from './s3-service';

@Module({
  imports: [
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useFactory: (config: ConfigService) => ({
          accessKeyId: config.get('AWS_ACCESS_KEY_ID'),
          secretAccessKey: config.get('AWS_ACCESS_KEY_SECRET'),
          s3BucketEndpoint: false,
          region: 'eu-west-1',
        }),

        inject: [ConfigService],
      },
      services: [S3],
    }),
  ],
  providers: [S3Service],
  exports: [],
})
export class AwsModule {}
