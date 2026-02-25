import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, MinLength } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Foydalanuvchining ID si',
  })
  @IsUUID()
  user_id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'To\'liq ism',
  })
  @IsString()
  @MinLength(2)
  fullName: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Telefon raqami',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'Uzbekistan',
    description: 'Davlat',
  })
  @IsString()
  country: string;

}

