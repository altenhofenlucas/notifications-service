import { Notification } from '@core/entities/notification';
import { NotificationRepository } from '@core/repositories/notification-repository';

export class InMemoryNotificationRepository implements NotificationRepository {
  private notifications: Notification[] = [];

  async create(notificationToCreate: Notification): Promise<Notification> {
    this.notifications.push(notificationToCreate);
    return notificationToCreate;
  }

  async save(notificationToSave: Notification): Promise<Notification> {
    const notificationIndex = this.notifications.findIndex(
      (notification) => notification.id === notificationToSave.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notificationToSave;
      return notificationToSave;
    }

    this.notifications.push(notificationToSave);
    return notificationToSave;
  }

  async findById(id: string): Promise<Notification> {
    return this.notifications.find((notification) => notification.id === id);
  }

  async findAll(): Promise<Notification[]> {
    return this.notifications;
  }

  async findAllByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }
}
