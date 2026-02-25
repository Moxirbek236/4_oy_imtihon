import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Req } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles/roles.guard";
import { Roles } from "../../common/decorators/roles/roles.decorator";
import { Role } from "@prisma/client";
import { UserSubscriptionsService } from "./user-subscriptions.service";
import { CreateUserSubscriptionDto } from "./dto/create-user-subscription.dto";
import { UpdateUserSubscriptionDto } from "./dto/update-user-subscription.dto";

@ApiTags("User Subscriptions")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth("access-token")
@Controller("user-subscriptions")
export class UserSubscriptionsController {
  constructor(private readonly userSubscriptionsService: UserSubscriptionsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}, ${Role.USER}` })
  @ApiBody({ type: CreateUserSubscriptionDto })
  @ApiResponse({ status: 201, description: "Foydalanuvchi obunasi muvaffaqiyatli yaratildi" })
  create(@Body() createUserSubscriptionDto: CreateUserSubscriptionDto) {
    return this.userSubscriptionsService.create(createUserSubscriptionDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}, ${Role.USER}` })
  @ApiResponse({ status: 200, description: "Barcha foydalanuvchi obunalari" })
  findAll(

    @Req() req : Request
  ) {
    return this.userSubscriptionsService.findAll(req['user']);
  }

  @Get(":id")
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}, ${Role.USER}` })
  @ApiResponse({ status: 200, description: "Foydalanuvchi obunasi tafsiloti" })
  findOne(@Param("id") id: string) {
    return this.userSubscriptionsService.findOne(id);
  }

  @Patch(":id")
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  // @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}, ${Role.USER}` })
  @ApiBody({ type: UpdateUserSubscriptionDto })
  @ApiResponse({ status: 200, description: "Foydalanuvchi obunasi muvaffaqiyatli yangilandi" })
  update(@Param("id") id: string, @Body() updateUserSubscriptionDto: UpdateUserSubscriptionDto) {
    return this.userSubscriptionsService.update(id, updateUserSubscriptionDto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}, ${Role.USER}` })
  @ApiResponse({ status: 200, description: "Foydalanuvchi obunasi muvaffaqiyatli o'chirildi" })
  remove(@Param("id") id: string) {
    return this.userSubscriptionsService.remove(id);
  }
}
