import { Injectable } from '@nestjs/common';
import { Content } from '@core/entities/content';
import { Notification } from '@core/entities/notification';
import { NotificationRepository } from '@core/repositories/notification-repository';

interface SendNotificationInput {
  content: string;
  category: string;
  recipientId: string;
}

interface SendNotificationOutput {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    content,
    category,
    recipientId,
  }: SendNotificationInput): Promise<SendNotificationOutput> {
    const notification = new Notification({
      content: new Content(content),
      category,
      recipientId,
    });

    await this.notificationRepository.create(notification);

    return { notification };
  }
}
