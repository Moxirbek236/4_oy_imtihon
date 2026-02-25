import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles/roles.guard";
import { Roles } from "../../common/decorators/roles/roles.decorator";
import { Role } from "@prisma/client";
import { SubscriptionPlansService } from "./subscription-plans.service";
import { CreateSubscriptionPlanDto } from "./dto/create-subscription-plan.dto";
import { UpdateSubscriptionPlanDto } from "./dto/update-subscription-plan.dto";

@ApiTags("Subscription Plans")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth("access-token")
@Controller("subscription-plans")
export class SubscriptionPlansController {
  constructor(
    private readonly subscriptionPlansService: SubscriptionPlansService,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}` })
  @ApiBody({ type: CreateSubscriptionPlanDto })
  create(@Body() createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    return this.subscriptionPlansService.create(createSubscriptionPlanDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}, ${Role.USER}` })
  findAll() {
    return this.subscriptionPlansService.findAll();
  }

  @Get(":id")
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}, ${Role.USER}` })
  findOne(@Param("id") id: string) {
    return this.subscriptionPlansService.findOne(id);
  }

  @Patch(":id")
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  // @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}` })
  @ApiBody({ type: UpdateSubscriptionPlanDto })
  update(
    @Param("id") id: string,
    @Body() updateSubscriptionPlanDto: UpdateSubscriptionPlanDto,
  ) {
    return this.subscriptionPlansService.update(id, updateSubscriptionPlanDto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}` })
  remove(@Param("id") id: string) {
    return this.subscriptionPlansService.remove(id);
  }
}
