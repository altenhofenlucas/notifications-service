import { randomUUID } from 'crypto';
import { Replace } from '@shared/Replace';
import { Content } from './content';

interface NotificationData {
  content: Content;
  category: string;
  recipientId: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private data: NotificationData;

  constructor(
    data: Replace<NotificationData, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.data = {
      ...data,
      createdAt: data.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set content(content: Content) {
    this.data.content = content;
  }

  public get content(): Content {
    return this.data.content;
  }

  public set category(category: string) {
    this.data.category = category;
  }

  public get category(): string {
    return this.data.category;
  }

  public set recipientId(recipientId: string) {
    this.data.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this.data.recipientId;
  }

  public read() {
    this.data.readAt = new Date();
  }

  public unread() {
    this.data.readAt = null;
  }

  public get readAt(): Date | null {
    return this.data.readAt;
  }

  public cancel() {
    this.data.canceledAt = new Date();
  }

  public get canceledAt(): Date | null {
    return this.data.canceledAt;
  }

  public get createdAt(): Date {
    return this.data.createdAt;
  }
}
