import { Module } from '@nestjs/common';
import { HttpModule } from '@infra/http/http.module';
import { DatabaseModule } from '@infra/database/database.module';
import { EventStreamingModule } from '@infra/event-streaming/event-streaming.module';

@Module({
  imports: [HttpModule, DatabaseModule, EventStreamingModule],
})
export class AppModule {}
