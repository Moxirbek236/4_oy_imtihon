import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Foydalanuvchi nomi (username)',
  })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Foydalanuvchining elektron pochtasi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Parol (minimal 8 ta belgisi)',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'USER',
    description: 'Foydalanuvchining roli',
    enum: ['USER', 'ADMIN', 'SUPERADMIN'],
    default: 'USER',
  })
  @IsEnum(Role)
  role: Role = Role.USER;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.jpg',
    description: 'Avatar URL manzili',
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
