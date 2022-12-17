export class PrismaNotification {
  id: string;
  content: string;
  category: string;
  recipientId: string;
  readAt: Date | null;
  createdAt: Date;
  canceledAt: Date | null;
}
