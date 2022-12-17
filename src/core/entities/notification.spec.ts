import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const message = 'You have new notification!';
    const content = new Content(message);
    const category = 'social';
    const recipientId = '123';
    const notification = new Notification({
      content,
      category,
      recipientId,
    });
    expect(notification).toBeTruthy();
    expect(notification.content.value).toBe(message);
    expect(notification.category).toBe(category);
    expect(notification.recipientId).toBe(recipientId);
  });
});
