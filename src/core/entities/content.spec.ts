import { Content } from './content';

describe('Notification.Content', () => {
  it('should be able to create a content', () => {
    const message = 'You have new notification!';
    const content = new Content(message);
    expect(content).toBeTruthy();
    expect(content.value).toBe(message);
  });

  it('should not be able to create a content with less than 5 characters', () => {
    const message = '1234';
    expect(() => new Content(message)).toThrow();
  });

  it('should not be able to create a content with more than 240 characters', () => {
    const message = 'a'.repeat(241);
    expect(() => new Content(message)).toThrow();
  });
});
