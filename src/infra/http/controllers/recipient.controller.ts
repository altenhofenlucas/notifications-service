import { Controller, Get, Param } from '@nestjs/common';
import { NotificationResponseMapper } from '../mappers/notification-response-mapper';
import { CountRecipientNotification } from '@core/usecases/count-recipient-notification';
import { GetRecipientNotification } from '@core/usecases/get-recipient-notification';

@Controller('recipients')
export class RecipientController {
  constructor(
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotification,
  ) {}

  @Get(':recipientId/notifications/count')
  async countNotifications(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });
    return {
      count,
    };
  }

  @Get(':recipientId/notifications')
  async getNotifications(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });

    return {
      notifications: notifications.map((notification) =>
        NotificationResponseMapper.toResponse(notification),
      ),
    };
  }
}
