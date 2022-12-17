import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { SendNotification } from './send-notification';

describe('SendNotification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const content = 'You have new notification!';
    const category = 'social';
    const recipientId = '123';

    const { notification } = await sendNotification.execute({
      content,
      category,
      recipientId,
    });

    expect(notification).toBeTruthy();
    expect(notification.content.value).toBe(content);
    expect(notification.category).toBe(category);
    expect(notification.recipientId).toBe(recipientId);

    const notifications = await notificationRepository.findAll();
    expect(notifications).toHaveLength(1);
  });
});
