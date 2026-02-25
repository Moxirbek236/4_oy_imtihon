import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class CreateUserSubscriptionDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Foydalanuvchining ID si',
  })
  @IsUUID()
  user_id: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Obuna rejasining ID si',
  })
  @IsUUID()
  plan_id: string;
  
  @ApiPropertyOptional({
    example: 'active',
    description: 'Obuna holati',
    enum: ['active', 'expired', 'canceled', 'pending_payment'],
    default: 'pending_payment',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Avtomatik qayta yangillashni yoqish',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  autoRenew?: boolean;
}
