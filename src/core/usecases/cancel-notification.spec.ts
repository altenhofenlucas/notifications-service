import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('CancelNotification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.save(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    const notifications = await notificationRepository.findAll();
    expect(notifications).toHaveLength(1);
    const [canceledNotification] = notifications;
    expect(canceledNotification.canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a notification that does not exist', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    await expect(
      cancelNotification.execute({ notificationId: 'fake-id' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
