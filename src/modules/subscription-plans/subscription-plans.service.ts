import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { CreateSubscriptionPlanDto } from "./dto/create-subscription-plan.dto";
import { UpdateSubscriptionPlanDto } from "./dto/update-subscription-plan.dto";

@Injectable()
export class SubscriptionPlansService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    if (createSubscriptionPlanDto.durationDays < 1) {
      throw new BadRequestException("Obuna davomiyligi 1 kundan kam bo'lishi mumkin emas");
    }

    if (createSubscriptionPlanDto.price < 0) {
      throw new BadRequestException("Narx manfiy bo'lishi mumkin emas");
    }

    const plan = await this.prisma.subscriptionPlan.create({
      data: {
        name: createSubscriptionPlanDto.name,
        price: createSubscriptionPlanDto.price,
        durationDays: createSubscriptionPlanDto.durationDays,
        features: createSubscriptionPlanDto.features || {},
        isActive: createSubscriptionPlanDto.isActive !== undefined ? createSubscriptionPlanDto.isActive : true,
      },
    });

    return { success: true, data: plan };
  }

  async findAll() {
    const plans = await this.prisma.subscriptionPlan.findMany({
      include: { userSubscriptions: { select: { id: true } } },
    });
    return { success: true, data: plans, total: plans.length };
  }

  async findOne(id: string) {
    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id },
      include: { userSubscriptions: true },
    });

    if (!plan) {
      throw new NotFoundException(`ID: ${id} bo'lgan obuna rejasi topilmadi`);
    }

    return { success: true, data: plan };
  }

  async update(id: string, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
    const plan = await this.prisma.subscriptionPlan.findUnique({ where: { id } });
    if (!plan) {
      throw new NotFoundException(`ID: ${id} bo'lgan obuna rejasi topilmadi`);
    }

    if (updateSubscriptionPlanDto.durationDays && updateSubscriptionPlanDto.durationDays < 1) {
      throw new BadRequestException("Obuna davomiyligi 1 kundan kam bo'lishi mumkin emas");
    }

    if (updateSubscriptionPlanDto.price !== undefined && updateSubscriptionPlanDto.price < 0) {
      throw new BadRequestException("Narx manfiy bo'lishi mumkin emas");
    }

    const updatedPlan = await this.prisma.subscriptionPlan.update({
      where: { id },
      data: {
        name: updateSubscriptionPlanDto.name || plan.name,
        price: updateSubscriptionPlanDto.price !== undefined ? updateSubscriptionPlanDto.price : plan.price,
        durationDays: updateSubscriptionPlanDto.durationDays || plan.durationDays,
        features: updateSubscriptionPlanDto.features !== undefined ? updateSubscriptionPlanDto.features : (plan.features || Prisma.JsonNull),
        isActive: updateSubscriptionPlanDto.isActive !== undefined ? updateSubscriptionPlanDto.isActive : plan.isActive,
      },
    });

    return { success: true, data: updatedPlan };
  }

  async remove(id: string) {
    const plan = await this.prisma.subscriptionPlan.findUnique({ where: { id } });
    if (!plan) {
      throw new NotFoundException(`ID: ${id} bo'lgan obuna rejasi topilmadi`);
    }

    const activeSubscriptions = await this.prisma.userSubscription.findFirst({
      where: { plan_id: id },
    });
    if (activeSubscriptions) {
      throw new BadRequestException("Bu rejadan foydalanadigan faol obunalar mavjud, o'chirish mumkin emas");
    }

    await this.prisma.subscriptionPlan.delete({ where: { id } });
    return { success: true, message: "Obuna rejasi muvaffaqiyatli o'chirildi" };
  }
}
