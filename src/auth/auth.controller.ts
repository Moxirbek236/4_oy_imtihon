import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: "Ro'yxatdan o'tish",
    description: 'Yangi foydalanuvchi yaratish uchun',
  })
  @ApiBody({ type: RegisterDto })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.email,
      registerDto.username,
      registerDto.password,
    );
  }

  @Post('login')
  @ApiOperation({
    summary: 'Tizimga kirish',
    description: 'Elektron pochta va parol orqali tizimga kirish',
  })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Tizimga kirish',
    description: 'Elektron pochta va parol orqali tizimga kirish',
  })
  @ApiBearerAuth('access-token')
  status(@Req() req: Request) {
    return this.authService.status(req['user']);
  }
}
