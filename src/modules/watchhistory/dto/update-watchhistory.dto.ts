import { PartialType } from '@nestjs/swagger';
import { CreateWatchHistoryDto } from './create-watchhistory.dto';

export class UpdateWatchhistoryDto extends PartialType(CreateWatchHistoryDto) {}
