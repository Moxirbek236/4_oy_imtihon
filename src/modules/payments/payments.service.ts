import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentStatus, Prisma } from '@prisma/client';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const userSubscription = await this.prisma.userSubscription.findFirst({
      where: { id: createPaymentDto.userSubscriptionId },
    });

    const data = {
      userSubscriptionId: createPaymentDto.userSubscriptionId,
      amount: createPaymentDto.amount,
      paymentMethod: createPaymentDto.paymentMethod as any,
      paymentDetails: createPaymentDto.paymentDetails || {},
      externalTransactionId: createPaymentDto.externalTransactionId || null,
      status: 'pending',
    };

    if (!userSubscription) {
      data.status = PaymentStatus.failed;
      throw new NotFoundException(
        `ID: ${createPaymentDto.userSubscriptionId} bo'lgan obuna topilmadi`,
      );
    }

    if (createPaymentDto.amount <= 0) {
      data.status = PaymentStatus.failed;
      throw new BadRequestException(
        "To'lov summasi noldan katta bo'lishi kerak",
      );
    }

    const payment = await this.prisma.payment.create({
      data: {
        userSubscriptionId: createPaymentDto.userSubscriptionId,
        amount: createPaymentDto.amount,
        paymentMethod: createPaymentDto.paymentMethod as any,
        paymentDetails: createPaymentDto.paymentDetails || {},
        externalTransactionId: createPaymentDto.externalTransactionId || null,
        status: 'pending',
      },
      include: {
        userSubscriptions: {
          include: {
            users: { select: { id: true, username: true } },
            subscriptionPlans: {
              select: { id: true, name: true, price: true, durationDays: true },
            },
          },
        },
      },
    });

    if (payment.userSubscriptions.subscriptionPlans.name == 'free') {
      data.status = PaymentStatus.refunded;
      throw new BadRequestException(`Siz bepul obunadasiz!`);
    }

    if (
      Number(payment.amount) !=
      Number(payment.userSubscriptions.subscriptionPlans.price)
    ) {
      data.status = PaymentStatus.refunded;
      throw new BadRequestException(`Iltimos obuna to'lovini to'g'ri to'lang`);
    }
    let now = new Date();
    let date = String(new Date()).split(' ');
    const endDateDay = Number(String(new Date()).split(' ')[2]);
    date[2] = String(
      Number(endDateDay) +
        Number(payment.userSubscriptions.subscriptionPlans.durationDays),
    );
    now.setDate(now.getDate() + Number(date[2]));

    let where = { user_id: payment.userSubscriptions.user_id };

    await this.prisma.userSubscription.update({
      where: {
        user_id: payment.userSubscriptions.user_id,
        id: payment.userSubscriptionId,
      },
      data: {
        status: 'active',
        startDate: new Date(),
        endDate: now,
      },
    });

    return { success: true, data: payment };
  }

  async findAll() {
    const payments = await this.prisma.payment.findMany({
      include: {
        userSubscriptions: {
          include: {
            users: { select: { id: true, username: true } },
            subscriptionPlans: { select: { id: true, name: true } },
          },
        },
      },
    });
    return { success: true, data: payments, total: payments.length };
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        userSubscriptions: {
          include: {
            users: { select: { id: true, username: true } },
            subscriptionPlans: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException(`ID: ${id} bo'lgan to'lov topilmadi`);
    }

    return { success: true, data: payment };
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`ID: ${id} bo'lgan to'lov topilmadi`);
    }

    if (updatePaymentDto.amount !== undefined && updatePaymentDto.amount <= 0) {
      throw new BadRequestException(
        "To'lov summasi noldan katta bo'lishi kerak",
      );
    }

    if (updatePaymentDto.paymentMethod) {
      const validMethods = ['card', 'paypal', 'bank_transfer', 'crypto'];
      if (!validMethods.includes(updatePaymentDto.paymentMethod)) {
        throw new BadRequestException("Noto'g'ri to'lov usuli");
      }
    }

    const updatedPayment = await this.prisma.payment.update({
      where: { id },
      data: {
        amount:
          updatePaymentDto.amount !== undefined
            ? updatePaymentDto.amount
            : payment.amount,
        paymentMethod:
          (updatePaymentDto.paymentMethod as any) || payment.paymentMethod,
        paymentDetails:
          updatePaymentDto.paymentDetails !== undefined
            ? updatePaymentDto.paymentDetails
            : payment.paymentDetails || Prisma.JsonNull,
        externalTransactionId:
          updatePaymentDto.externalTransactionId !== undefined
            ? updatePaymentDto.externalTransactionId
            : payment.externalTransactionId,
      },
      include: {
        userSubscriptions: {
          include: {
            users: { select: { id: true, username: true } },
            subscriptionPlans: { select: { id: true, name: true } },
          },
        },
      },
    });

    return { success: true, data: updatedPayment };
  }

  async remove(id: string) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`ID: ${id} bo'lgan to'lov topilmadi`);
    }

    await this.prisma.payment.delete({ where: { id } });
    return { success: true, message: "To'lov muvaffaqiyatli o'chirildi" };
  }
}
