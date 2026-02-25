import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles/roles.guard";
import { Roles } from "../../common/decorators/roles/roles.decorator";
import { Role } from "@prisma/client";
import { FavoritesService } from "./favorites.service";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { UpdateFavoriteDto } from "./dto/update-favorite.dto";

@ApiTags("Favorites")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth("access-token")
@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @Roles(Role.USER, Role.SUPERADMIN, )
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: `${Role.USER}` })
  @ApiBody({ type: CreateFavoriteDto })
  @ApiResponse({ status: 201, description: "Sevimli film muvaffaqiyatli qo'shildi" })
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  @Roles(Role.SUPERADMIN, Role.USER)
  @ApiOperation({ summary: `${Role.SUPERADMIN}, ${Role.USER}` })
  @ApiResponse({ status: 200, description: "Barcha sevimli filmlar" })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get(":id")
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}, ${Role.USER}` })
  @ApiResponse({ status: 200, description: "Sevimli film tafsiloti" })
  findOne(@Param("id") id: string) {
    return this.favoritesService.findOne(id);
  }

  @Delete(":id")
  @Roles(Role.USER)
  @ApiOperation({ summary: `${Role.USER}` })
  @ApiResponse({ status: 200, description: "Sevimli film muvaffaqiyatli o'chirildi" })
  remove(@Param("id") id: string) {
    return this.favoritesService.remove(id);
  }
}
