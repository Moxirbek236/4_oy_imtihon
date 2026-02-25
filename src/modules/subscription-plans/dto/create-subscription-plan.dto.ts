import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsDecimal, IsOptional, IsBoolean, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubscriptionPlanDto {
  @ApiProperty({
    example: 'Premium Plan',
    description: 'Obuna rejasining nomi',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 9.99,
    description: 'Oylik narxi',
  })
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 30,
    description: 'Obuna davomiyligi (kunlarda)',
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  durationDays: number;

  @ApiPropertyOptional({
    example: { hd: true, ads_free: true, downloads: true },
    description: 'Obuna xususiyatlari (JSON format)',
  })
  @IsOptional()
  features?: object;

  @ApiPropertyOptional({
    example: true,
    description: 'Rejani faolligini tekshirish',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
