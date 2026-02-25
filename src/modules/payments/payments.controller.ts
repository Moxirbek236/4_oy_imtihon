import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth/jwt-auth.guard";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { RolesGuard } from "src/common/guards/roles/roles.guard";
import { Roles } from "src/common/decorators/roles/roles.decorator";
import { Role } from "@prisma/client";

@ApiTags("Payments")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth("access-token")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  // @ApiConsumes("multipart/form-data")
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}, ${Role.USER}` })
  @ApiBody({ type: CreatePaymentDto })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}` })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(":id")
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}` })
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(id);
  }

  @Patch(":id")
  // @ApiConsumes("multipart/form-data")
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}` })
  @ApiBody({ type: UpdatePaymentDto })
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}` })
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(id);
  }
}
