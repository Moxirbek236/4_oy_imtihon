import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, Min, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { SubscriptionType } from '@prisma/client';

export class CreateMovieDto {
  @ApiProperty({
    example: 'The Matrix',
    description: 'Film nomi',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'the-matrix',
    description: 'Film slug (URL-friendly nomi)',
  })
  @IsString()
  slug: string;

  @ApiPropertyOptional({
    example: 'Hacks Tutorial',
    description: 'Film tavsifi',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 1999,
    description: 'Chiqarilgan yil',
  })
  @IsInt()
  @Min(1800)
  @Type(() => Number)
  releaseYear: number;

  @ApiProperty({
    example: 136,
    description: 'Film davomiyligi (minutlarda)',
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  durationMinutes: number;

  @ApiPropertyOptional({
    example: 8,
    description: 'Reyting (1 dan 10 gacha)',
    minimum: 1,
    maximum: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  rating?: number;

  @ApiProperty({
    example: 'free',
    enum: SubscriptionType,
  })
  @IsEnum(SubscriptionType)
  @IsString()
  subscriptionType: string;

  @ApiProperty({ example: 'action-movies' })
  @IsString()
  category_slug: string;

  @ApiProperty()
  @IsString()
  quality: string;

  @ApiProperty()
  @IsString()
  language: string;
}
