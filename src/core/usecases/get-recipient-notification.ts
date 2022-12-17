import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@core/repositories/notification-repository';
import { Notification } from '@core/entities/notification';

interface GetRecipientNotificationInput {
  recipientId: string;
}

interface GetRecipientNotificationOutput {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    recipientId,
  }: GetRecipientNotificationInput): Promise<GetRecipientNotificationOutput> {
    const notifications =
      await this.notificationRepository.findAllByRecipientId(recipientId);

    return { notifications };
  }
}
