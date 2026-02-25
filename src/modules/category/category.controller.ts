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
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { CategoryService } from './category.service';

@ApiTags('Category')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @ApiOperation({ summary: `${Role.SUPERADMIN}, ${Role.ADMIN}` })
  @ApiBody({ type: CreateCategoryDto })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.USER)
  @ApiOperation({ summary: `${Role.SUPERADMIN}, ${Role.ADMIN}, ${Role.USER}` })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.USER)
  @ApiOperation({ summary: `${Role.SUPERADMIN}, ${Role.ADMIN}, ${Role.USER}` })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @ApiOperation({ summary: `${Role.SUPERADMIN}, ${Role.ADMIN}` })
  @ApiBody({ type: UpdateCategoryDto })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.USER)
  @ApiOperation({ summary: `${Role.SUPERADMIN}, ${Role.ADMIN}, ${Role.USER}` })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
