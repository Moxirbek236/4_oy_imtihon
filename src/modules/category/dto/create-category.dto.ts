import { IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Action Movies',
    description: 'Category nomi',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name bosh bolishi mumkin emas' })
  name: string;

  @ApiProperty({
    example: 'action-movies',
    description: 'Category slug (unikal bolishi kerak)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Slug bosh bolishi mumkin emas' })
  @Transform(({ value }) =>
    value
      ?.toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
  )
  slug: string;

  @ApiProperty({
    example: 'Bu kategoriya action janrdagi filmlar uchun',
    description: 'Category haqida qisqacha tavsif',
  })
  @IsString()
  @IsNotEmpty({ message: 'Description bosh bolishi mumkin emas' })
  description: string;
}