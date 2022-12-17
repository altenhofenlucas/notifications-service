import { SendNotification } from '@core/usecases/send-notification';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationMessage } from '../dtos/notification-message';

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern('notifications.send')
  async handleSendNotification(
    @Payload() { content, category, recipientId }: NotificationMessage,
  ) {
    await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });
  }
}
