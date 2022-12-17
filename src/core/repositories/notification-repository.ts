import { Notification } from '@core/entities/notification';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<Notification>;
  abstract save(notification: Notification): Promise<Notification>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract findAllByRecipientId(recipientId: string): Promise<Notification[]>;
}
