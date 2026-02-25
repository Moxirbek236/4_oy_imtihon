import { Module } from '@nestjs/common';
import { WatchhistoryService } from './watchhistory.service';
import { WatchhistoryController } from './watchhistory.controller';

@Module({
  controllers: [WatchhistoryController],
  providers: [WatchhistoryService],
})
export class WatchhistoryModule {}
