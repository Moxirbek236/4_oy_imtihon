import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserSubscriptionDto } from './dto/create-user-subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update-user-subscription.dto';
import { Subscription } from 'rxjs';
import { Role, SubscriptionStatus } from '@prisma/client';

@Injectable()
export class UserSubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserSubscriptionDto: CreateUserSubscriptionDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createUserSubscriptionDto.user_id },
    });
    if (!user) {
      throw new NotFoundException(
        `ID: ${createUserSubscriptionDto.user_id} bo'lgan foydalanuvchi topilmadi`,
      );
    }

    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id: createUserSubscriptionDto.plan_id },
    });
    if (!plan) {
      throw new NotFoundException(
        `ID: ${createUserSubscriptionDto.plan_id} bo'lgan obuna rejasi topilmadi`,
      );
    }

    if (!plan.isActive) {
      throw new BadRequestException(
        'Bu rejani hozir faolsiz, boshqa rejani tanlang',
      );
    }

    const subscription = await this.prisma.userSubscription.create({
      data: {
        user_id: createUserSubscriptionDto.user_id,
        plan_id: createUserSubscriptionDto.plan_id,
        status:
          (createUserSubscriptionDto.status as any) ||
          SubscriptionStatus.pending_payment,
        autoRenew: createUserSubscriptionDto.autoRenew || false,
      },
      include: {
        users: { select: { id: true, username: true } },
        subscriptionPlans: { select: { id: true, name: true } },
      },
    });

    return { success: true, data: subscription };
  }

  async findAll(current_user) {
    if (current_user.role == Role.USER) {
      return {
        data: await this.prisma.userSubscription.findMany({
          where: { user_id: current_user.id },
          select: {
            autoRenew: true,
            endDate: true,
            id: true,
            createdAt: true,
            status: true,
            startDate: true,
            updatedAt: true,
          },
        }),
      };
    }
    const subscriptions = await this.prisma.userSubscription.findMany({
      select: {
        id: true,
        autoRenew: true,
        createdAt: true,
        endDate: true,
        startDate: true,
        status: true,
        updatedAt: true,
        users: { select: { 
          id: true,
          avatarUrl:true,
          createdAt:true,
          email:true,
          username:true
         } },
      },
    });
    return { success: true, data: subscriptions, total: subscriptions.length };
  }

  async findOne(id: string) {
    const subscription = await this.prisma.userSubscription.findUnique({
      where: { id },
      include: {
        users: { select: { id: true, username: true } },
        subscriptionPlans: { select: { id: true, name: true } },
        payments: true,
      },
    });

    if (!subscription) {
      throw new NotFoundException(`ID: ${id} bo'lgan obuna topilmadi`);
    }

    return { success: true, data: subscription };
  }

  async update(
    id: string,
    updateUserSubscriptionDto: UpdateUserSubscriptionDto,
  ) {
    const subscription = await this.prisma.userSubscription.findUnique({
      where: { id },
    });
    if (!subscription) {
      throw new NotFoundException(`ID: ${id} bo'lgan obuna topilmadi`);
    }

    if (
      updateUserSubscriptionDto.plan_id &&
      updateUserSubscriptionDto.plan_id !== subscription.plan_id
    ) {
      const plan = await this.prisma.subscriptionPlan.findUnique({
        where: { id: updateUserSubscriptionDto.plan_id },
      });
      if (!plan) {
        throw new NotFoundException(
          `ID: ${updateUserSubscriptionDto.plan_id} bo'lgan obuna rejasi topilmadi`,
        );
      }
      if (!plan.isActive) {
        throw new BadRequestException('Bu rejani hozir faolsiz');
      }
    }


    const updatedSubscription = await this.prisma.userSubscription.update({
      where: { id },
      data: {
        plan_id: updateUserSubscriptionDto.plan_id || subscription.plan_id,
        status:
          (updateUserSubscriptionDto.status as any) || subscription.status,
        autoRenew:
          updateUserSubscriptionDto.autoRenew !== undefined
            ? updateUserSubscriptionDto.autoRenew
            : subscription.autoRenew,
      },
      include: {
        users: { select: { id: true, username: true } },
        subscriptionPlans: { select: { id: true, name: true } },
      },
    });

    return { success: true, data: updatedSubscription };
  }

  async remove(id: string) {
    const subscription = await this.prisma.userSubscription.findUnique({
      where: { id },
    });
    if (!subscription) {
      throw new NotFoundException(`ID: ${id} bo'lgan obuna topilmadi`);
    }

    await this.prisma.userSubscription.delete({ where: { id } });
    return { success: true, message: "Obuna muvaffaqiyatli o'chirildi" };
  }
}
