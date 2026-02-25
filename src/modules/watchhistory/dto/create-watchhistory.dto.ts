import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsNumber, Min, Max } from 'class-validator';

export class CreateWatchHistoryDto {
  @ApiProperty({
    example: 'c79f7c23-c8b4-465a-8fba-06ccc10ee18a',
    description: 'User ID (UUID)',
  })
  @IsUUID()
  user_id: string;

  @ApiProperty({
    example: 'a12f7c23-c8b4-465a-8fba-06ccc10ee1111',
    description: 'Movie ID (UUID)',
  })
  @IsUUID()
  movie_id: string;

  @ApiProperty({
    example: 1200,
    description: 'Korilgan vaqt (sekundlarda)',
  })
  @IsInt()
  @Min(0)
  watchedDuration: number;

  @ApiProperty({
    example: 75.5,
    description: 'Korilgan foiz (0 dan 100 gacha)',
    type: Number,
    format: 'float',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  watchedPercentage: number;

  @ApiProperty({
    example: '2026-02-25T15:30:00.000Z',
    description: 'Oxirgi korilgan vaqt',
    required: false,
  })
  lastWatched?: Date;
}