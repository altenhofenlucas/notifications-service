export class Content {
  private readonly content: string;

  constructor(content: string) {
    if (!Content.isValid(content)) {
      throw new Error('Content must be between 5 and 240 characters');
    }

    this.content = content;
  }

  get value(): string {
    return this.content;
  }

  private static isValid(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
