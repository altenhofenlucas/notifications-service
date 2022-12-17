import { Module } from '@nestjs/common';
import { SendNotification } from '@core/usecases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controllers/notification.controller';
import { RecipientController } from './controllers/recipient.controller';
import { CancelNotification } from '@core/usecases/cancel-notification';
import { ReadNotification } from '@core/usecases/read-notification';
import { UnreadNotification } from '@core/usecases/unread-notification';
import { CountRecipientNotification } from '@core/usecases/count-recipient-notification';
import { GetRecipientNotification } from '@core/usecases/get-recipient-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController, RecipientController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotification,
    GetRecipientNotification,
  ],
})
export class HttpModule {}
