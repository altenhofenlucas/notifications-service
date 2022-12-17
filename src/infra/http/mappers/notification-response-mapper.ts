import { Notification } from '@core/entities/notification';
import { NotificationResponse } from './notification-response';

export class NotificationResponseMapper {
  static toResponse(notification: Notification): NotificationResponse {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
    };
  }
}
