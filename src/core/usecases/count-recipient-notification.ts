import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@core/repositories/notification-repository';

interface CountRecipientNotificationInput {
  recipientId: string;
}

interface CountRecipientNotificationOutput {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    recipientId,
  }: CountRecipientNotificationInput): Promise<CountRecipientNotificationOutput> {
    const notifications =
      await this.notificationRepository.findAllByRecipientId(recipientId);

    return { count: notifications.length };
  }
}
