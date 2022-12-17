import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { GetRecipientNotification } from './get-recipient-notification';

describe('GetRecipientNotification', () => {
  it('should be able to get notifications from recipient', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientNotification = new GetRecipientNotification(
      notificationRepository,
    );

    const recipientId = 'recipient-id';

    await notificationRepository.save(makeNotification({ recipientId }));
    await notificationRepository.save(makeNotification({ recipientId }));
    await notificationRepository.save(
      makeNotification({ recipientId: 'other-recipient-id' }),
    );

    const { notifications } = await getRecipientNotification.execute({
      recipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId }),
        expect.objectContaining({ recipientId }),
      ]),
    );
  });
});
