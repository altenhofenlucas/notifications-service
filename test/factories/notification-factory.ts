import { Content } from '@core/entities/content';
import { Notification } from '@core/entities/notification';

type NotificationOverrides = Partial<Notification>;

export function makeNotification(overrides?: NotificationOverrides) {
  return new Notification({
    content: new Content('You have new notification!'),
    category: 'social',
    recipientId: 'recipient-id',
    ...overrides,
  });
}
