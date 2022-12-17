import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CountRecipientNotification } from './count-recipient-notification';

describe('CountRecipientNotification', () => {
  it('should be able to count notifications from recipient', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    const recipientId = 'recipient-id';

    await notificationRepository.save(makeNotification({ recipientId }));
    await notificationRepository.save(makeNotification({ recipientId }));
    await notificationRepository.save(
      makeNotification({ recipientId: 'other-recipient-id' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId,
    });

    const notifications = await notificationRepository.findAll();
    expect(notifications).toHaveLength(3);
    expect(count).toEqual(2);
  });
});
