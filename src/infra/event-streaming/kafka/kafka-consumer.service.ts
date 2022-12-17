import { OnModuleDestroy } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications-consumer',
        brokers: [''],
        sasl: {
          mechanism: 'scram-sha-256',
          username: '***',
          password: '***',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.close();
  }
}
