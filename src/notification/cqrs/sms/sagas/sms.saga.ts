import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { SMS_QUEUE_PROCESS_IDS, ResetPasswordEvent } from '../../../../../libs';

@Injectable()
export class SmsSaga {
  logger = new Logger(this.constructor.name);

  constructor(@InjectQueue('notification_queue') readonly queue: Queue) {}

  @Saga()
  resetUserPassword = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ResetPasswordEvent),
      delay(1000),
      map((event) => {
        this.logger.log(JSON.stringify(event));
        this.logger.log('reset password event trigerred');

        if (event.payload.phoneNumber) {
          this.queue.add(
            SMS_QUEUE_PROCESS_IDS.RESETUSERPASSWORDOTP,
            event.payload,
            { removeOnComplete: true, attempts: 3 },
          );
        }
        return null;
      }),
    );
  };

  resetSendOtp = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ResetPasswordEvent),
      delay(1000),
      map((event) => {
        this.logger.log(JSON.stringify(event));
        this.logger.log('reset password event trigerred');

        if (event.payload.phoneNumber) {
          this.queue.add(
            SMS_QUEUE_PROCESS_IDS.RESETUSERPASSWORDOTP,
            event.payload,
            { removeOnComplete: true, attempts: 3 },
          );
        }
        return null;
      }),
    );
  };
}
