import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@core/repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface UnreadNotificationInput {
  notificationId: string;
}

@Injectable()
export class UnreadNotification {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({ notificationId }: UnreadNotificationInput): Promise<void> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
