import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class Utils {
  constructor(private readonly prisma: PrismaService) {}

  async check_expired(user_id) {
    const sub = await this.prisma.userSubscription.findFirst({
      where: { user_id },
    });

    const pay = await this.prisma.payment.findFirst({
      where: { userSubscriptionId: sub!.id },
    });
    const start = sub?.startDate;
    const now = new Date();
    const end = sub?.endDate;
    if (end) {
      return now == end || now > end;
    } else {
      return false;
    }
  }
}
