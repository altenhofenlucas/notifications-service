import { Injectable } from '@nestjs/common';
import { Notification } from '@core/entities/notification';
import { NotificationRepository } from '@core/repositories/notification-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(notification: Notification): Promise<Notification> {
    const prismaNotificationData =
      PrismaNotificationMapper.toPersistence(notification);
    await this.prisma.notification.create({
      data: prismaNotificationData,
    });

    return notification;
  }

  async save(notification: Notification): Promise<Notification> {
    const prismaNotificationData =
      PrismaNotificationMapper.toPersistence(notification);

    await this.prisma.notification.update({
      where: {
        id: prismaNotificationData.id,
      },
      data: prismaNotificationData,
    });

    return notification;
  }

  async findAllByRecipientId(recipientId: string): Promise<Notification[]> {
    const prismaNotificationsData = await this.prisma.notification.findMany({
      where: { recipientId },
    });

    return prismaNotificationsData.map(PrismaNotificationMapper.toDomain);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const prismaNotificationData = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!prismaNotificationData) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(prismaNotificationData);
  }
}
