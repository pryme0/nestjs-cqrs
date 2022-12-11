import { CreateUserCommandHandler } from './create-user-command.handler';
import { UpdateUserCommandHandler } from './update-user-command.handler';
import { RemoveUserCommandHandler } from './remove-user-command.handler';
import { ValidateUserCommandHandler } from './validate-user-command.handler';
import { SendPasswordResetOtpCommandHandler } from './send-reset-password-otp';
import { ValidateOtpCommandHandler } from './validate-otp.handler';
import { SendOtpCommandHandler } from './send-registration-otp-command.handler';

export const UserCommandhandlers = [
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
  RemoveUserCommandHandler,
  ValidateUserCommandHandler,
  SendPasswordResetOtpCommandHandler,
  ValidateOtpCommandHandler,
  SendOtpCommandHandler,
];
