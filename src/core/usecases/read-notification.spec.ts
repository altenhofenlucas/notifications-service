import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('ReadNotification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.save(notification);

    await readNotification.execute({ notificationId: notification.id });

    const notifications = await notificationRepository.findAll();
    expect(notifications).toHaveLength(1);
    const [readedNotification] = notifications;
    expect(readedNotification.readAt).toEqual(expect.any(Date));
  });

  it('should not be able to read a notification that does not exist', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    await expect(
      readNotification.execute({ notificationId: 'fake-id' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
