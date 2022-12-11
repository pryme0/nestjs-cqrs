import { SendResetPasswordSmsEventHandler } from './reset-password.event.handler';
import { SendOtpEventHandler } from './send-otp.handler';

export const UserEventHandlers = [
  SendOtpEventHandler,
  SendResetPasswordSmsEventHandler,
];
