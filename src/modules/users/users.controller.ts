import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Role } from '@prisma/client';
import { queryDto } from './dto/query.dto';

@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  // @ApiConsumes('multipart/form-data')
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @ApiOperation({ summary: `${Role.SUPERADMIN}, ${Role.ADMIN}` })
  @ApiBody({ type: CreateUserDto })
  create(
    @Req() req: Request,
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      createUserDto.avatarUrl = `/uploads/${file.filename}`;
    }
    return this.usersService.create(createUserDto, req['user']);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}` })
  @ApiResponse({ status: 200, description: 'Barcha foydalanuvchilar' })
  findAll(@Req() req: Request, @Query() search?: queryDto) {
    return this.usersService.findAll(req['user'], search);
  }

  @Get(':id')
  @Roles(Role.SUPERADMIN)
  @ApiOperation({ summary: `${Role.SUPERADMIN}` })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi tafsiloti' })
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.usersService.findOne(id, req['user']);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  // @ApiConsumes('multipart/form-data')
  @Roles(Role.SUPERADMIN)
  @ApiOperation({ summary: `${Role.SUPERADMIN}` })
  @ApiBody({ type: UpdateUserDto })
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateUserDto.avatarUrl = `/uploads/${file.filename}`;
    }
    return this.usersService.update(id, updateUserDto, req['user']);
  }

  @Delete(':id')
  @Roles(Role.SUPERADMIN)
  @ApiOperation({ summary: `${Role.SUPERADMIN}` })
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.usersService.remove(id, req['user']);
  }
}
