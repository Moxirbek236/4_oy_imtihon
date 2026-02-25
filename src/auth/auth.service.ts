import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SubscriptionStatus } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, username: string, password: string) {
    const existingEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail != null) {
      throw new UnauthorizedException("Bu email allaqachon ro'yxatdan o'tgan");
    }

    const existingUsername = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername) {
      throw new UnauthorizedException('Bu username allaqachon band');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        username,
        passwordHash: hashedPassword,
        role: 'USER',
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });

    const subPlan = await this.prisma.subscriptionPlan.findFirst({
      where: {
        name: 'free',
      },
      select: {
        id: true,
        name: true,
      },
    });
    let free_plan_status = subPlan ? true : false;
    let subPlanId = subPlan?.id;
    if (!subPlan) {
      const { name, id } = await this.prisma.subscriptionPlan.create({
        data: {
          name: 'free',
          features: ['only free movies', '720p', 'limited movies', 'ads'],
          price: 0,
          durationDays: 0,
        },
        select: {
          name: true,
          id: true,
        },
      });
      free_plan_status = true;
      subPlanId = id;
    }

    const subscription = await this.prisma.userSubscription.create({
      data: {
        user_id: user.id,
        plan_id: String(subPlanId),
        status: SubscriptionStatus.active,
      },
    });

    const profile = await this.prisma.profile.create({
      data: {
        country: 'Uzbekistan',
        fullName: user.username,
        user_id: user.id,
      },
    });

    const payload = { id: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return {
      success: true,
      data: {
        access_token,
        user,
        subscrioption: {
          subscriptionId: subPlan?.name,
          expiredAt: 0,
        },
      },
    };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Bunday email bilan foydalanuvchi topilmadi');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Parol noto'g'ri");
    }

    const payload = { id: user.id, email: user.email, role: user.role};
    const access_token = this.jwtService.sign(payload);

    const userProfile = await this.prisma.profile.findFirst({
      where: { user_id: user.id },
    });

    if (!userProfile) {
      await this.prisma.profile.create({
        data: {
          country: 'Uzbekistan',
          fullName: user.username,
          user_id: user.id,
        },
      });
    }

    const userSubscriptionPlan = await this.prisma.userSubscription.findFirst({
      where: {
        user_id: user.id,
      },
      select: {
        id: true,
        endDate: true,
        startDate: true,
        status: true,
        autoRenew: true,
        createdAt: true,
        subscriptionPlans: {
          select: { name: true },
        },
      },
    });

    const subPlan = await this.prisma.subscriptionPlan.findFirst({
      where: {
        name: 'free',
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!userSubscriptionPlan) {
      await this.prisma.userSubscription.create({
        data: {
          user_id: user.id,
          plan_id: String(subPlan?.id),
          status: SubscriptionStatus.active,
        },
      });
    }

    return {
      success: true,
      data: {
        access_token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          subscription: userSubscriptionPlan,
        },
      },
    };
  }

  async status(user) {
    if (user) {
      return { succes: true, message: 'you are logged' };
    }
  }
}
