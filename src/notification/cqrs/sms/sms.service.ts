import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class SmsService {
  constructor(private readonly httpService: HttpService) {}

  sendSms = async ({
    message,
    phoneNumber,
  }: {
    phoneNumber: string | [string];
    message: string;
  }) => {
    const headers = {
      Authorization: `Bearer ${process.env.BULK_SMS_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const { data } = await firstValueFrom(
      this.httpService
        .post(
          'https://www.bulksmsnigeria.com/api/v1/sms/create',
          {
            to: phoneNumber,
            from: 'Paymais',
            body: message,
            gateway: '0',
            append_sender: '0',
          },
          {
            headers,
          },
        )
        .pipe(
          catchError((error) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    console.log({ data });
    return data;
  };

  // const sendMessage = await firstValueFrom this.httpService.post(
  //   'https://www.bulksmsnigeria.com/api/v1/sms/create',
  //   {
  //     to: '09077913316',
  //     from: 'Paymais Cluster application',
  //     body: 'This is a test message.',
  //     gateway: '0',
  //     append_sender: '0',
  //   },
  //   {
  //     headers,
  //   },
  // )
}
