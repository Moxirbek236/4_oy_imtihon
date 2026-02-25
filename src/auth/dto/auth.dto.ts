import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty({
    example: "nasimjonnasimjon46@gmail.com",
    description: "Elektron pochta",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "sjtmsimram10",
    description: "Parol",
  })
  @IsString()
  @MinLength(8)
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    example: "alijon",
    description: "Foydalanuvchi nomi",
  })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    example: "alijon@example.com",
    description: "Elektron pochta",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "Password123!",
    description: "Parol",
  })
  @IsString()
  @MinLength(8)
  password: string;
}
