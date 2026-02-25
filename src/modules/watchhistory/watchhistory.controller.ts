import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { WatchhistoryService } from './watchhistory.service';
import { CreateWatchHistoryDto } from './dto/create-watchhistory.dto';
import { UpdateWatchhistoryDto } from './dto/update-watchhistory.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('WatchHistory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('watchhistory')
export class WatchhistoryController {
  constructor(private readonly watchhistoryService: WatchhistoryService) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: `${Role.USER}, ${Role.ADMIN}` })
  create(@Body() createWatchhistoryDto: CreateWatchHistoryDto) {
    return this.watchhistoryService.create(createWatchhistoryDto);
  }
  
  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: `${Role.ADMIN}` })
  findAll() {
    return this.watchhistoryService.findAll();
  }
  
  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: `${Role.USER}, ${Role.ADMIN}` })
  findOne(@Param('id') id: string) {
    return this.watchhistoryService.findOne(id);
  }
  
  @Patch(':id')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: `${Role.USER}, ${Role.ADMIN}` })
  update(
    @Param('id') id: string,
    @Body() updateWatchhistoryDto: UpdateWatchhistoryDto,
  ) {
    return this.watchhistoryService.update(id, updateWatchhistoryDto);
  }
  
  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: `${Role.ADMIN}` })
  remove(@Param('id') id: string) {
    return this.watchhistoryService.remove(id);
  }
}