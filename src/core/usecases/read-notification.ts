import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@core/repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ReadNotificationInput {
  notificationId: string;
}

@Injectable()
export class ReadNotification {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({ notificationId }: ReadNotificationInput): Promise<void> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
