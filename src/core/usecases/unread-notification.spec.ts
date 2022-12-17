import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('UnreadNotification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationRepository.save(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    const notifications = await notificationRepository.findAll();
    expect(notifications).toHaveLength(1);
    const [unreadedNotification] = notifications;
    expect(unreadedNotification.readAt).toBeNull();
  });

  it('should not be able to read a notification that does not exist', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    await expect(
      unreadNotification.execute({ notificationId: 'fake-id' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
