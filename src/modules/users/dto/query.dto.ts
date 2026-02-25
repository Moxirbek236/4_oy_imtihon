import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsEnum, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class queryDto {
  @ApiPropertyOptional({
    example: 'john_doe',
    description: 'Foydalanuvchi nomi boyicha qidiruv',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  username?: string;

  @ApiPropertyOptional({
    description: 'Elektron pochta boyicha qidiruv',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Foydalanuvchining roli boyicha filtr',
    enum: ['USER', 'ADMIN', 'SUPERADMIN'],
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}