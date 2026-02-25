import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsString, IsOptional, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440020',
    description: 'Film ID si',
  })
  @IsUUID()
  movie_id: string;

  @ApiProperty({
    example: 5,
    description: 'Reyting (1 dan 5 gacha)',
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    example: 'Juda ajoyib film, ko\'rishni tavsiya etaman!',
    description: 'Sharh matn',
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
