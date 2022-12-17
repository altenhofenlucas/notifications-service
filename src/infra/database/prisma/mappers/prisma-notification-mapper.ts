import { Content } from '@core/entities/content';
import { Notification } from '@core/entities/notification';
import { Notification as PrismaNotificationData } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPersistence(notification: Notification): PrismaNotificationData {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
    };
  }

  static toDomain(
    prismaNotificationData: PrismaNotificationData,
  ): Notification {
    return new Notification(
      {
        content: new Content(prismaNotificationData.content),
        category: prismaNotificationData.category,
        recipientId: prismaNotificationData.recipientId,
        readAt: prismaNotificationData.readAt,
        createdAt: prismaNotificationData.createdAt,
        canceledAt: prismaNotificationData.canceledAt,
      },
      prismaNotificationData.id,
    );
  }
}
