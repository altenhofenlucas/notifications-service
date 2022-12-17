import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@core/usecases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationResponseMapper } from '../mappers/notification-response-mapper';
import { CancelNotification } from '@core/usecases/cancel-notification';
import { ReadNotification } from '@core/usecases/read-notification';
import { UnreadNotification } from '@core/usecases/unread-notification';

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return {
      notification: NotificationResponseMapper.toResponse(notification),
    };
  }
}
