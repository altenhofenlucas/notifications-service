import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@core/repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { Notification } from '@core/entities/notification';

interface CancelNotificationInput {
  notificationId: string;
}

interface CancelNotificationOutput {
  notification: Notification;
}

@Injectable()
export class CancelNotification {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    notificationId,
  }: CancelNotificationInput): Promise<CancelNotificationOutput> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    const canceledNotification = await this.notificationRepository.save(
      notification,
    );

    return {
      notification: canceledNotification,
    };
  }
}
