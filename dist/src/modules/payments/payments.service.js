"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPaymentDto) {
        const userSubscription = await this.prisma.userSubscription.findFirst({
            where: { id: createPaymentDto.userSubscriptionId },
        });
        const data = {
            userSubscriptionId: createPaymentDto.userSubscriptionId,
            amount: createPaymentDto.amount,
            paymentMethod: createPaymentDto.paymentMethod,
            paymentDetails: createPaymentDto.paymentDetails || {},
            externalTransactionId: createPaymentDto.externalTransactionId || null,
            status: 'pending',
        };
        if (!userSubscription) {
            data.status = client_1.PaymentStatus.failed;
            throw new common_1.NotFoundException(`ID: ${createPaymentDto.userSubscriptionId} bo'lgan obuna topilmadi`);
        }
        if (createPaymentDto.amount <= 0) {
            data.status = client_1.PaymentStatus.failed;
            throw new common_1.BadRequestException("To'lov summasi noldan katta bo'lishi kerak");
        }
        const payment = await this.prisma.payment.create({
            data: {
                userSubscriptionId: createPaymentDto.userSubscriptionId,
                amount: createPaymentDto.amount,
                paymentMethod: createPaymentDto.paymentMethod,
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
            data.status = client_1.PaymentStatus.refunded;
            throw new common_1.BadRequestException(`Siz bepul obunadasiz!`);
        }
        if (Number(payment.amount) !=
            Number(payment.userSubscriptions.subscriptionPlans.price)) {
            data.status = client_1.PaymentStatus.refunded;
            throw new common_1.BadRequestException(`Iltimos obuna to'lovini to'g'ri to'lang`);
        }
        let now = new Date();
        let date = String(new Date()).split(' ');
        const endDateDay = Number(String(new Date()).split(' ')[2]);
        date[2] = String(Number(endDateDay) +
            Number(payment.userSubscriptions.subscriptionPlans.durationDays));
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan to'lov topilmadi`);
        }
        return { success: true, data: payment };
    }
    async update(id, updatePaymentDto) {
        const payment = await this.prisma.payment.findUnique({ where: { id } });
        if (!payment) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan to'lov topilmadi`);
        }
        if (updatePaymentDto.amount !== undefined && updatePaymentDto.amount <= 0) {
            throw new common_1.BadRequestException("To'lov summasi noldan katta bo'lishi kerak");
        }
        if (updatePaymentDto.paymentMethod) {
            const validMethods = ['card', 'paypal', 'bank_transfer', 'crypto'];
            if (!validMethods.includes(updatePaymentDto.paymentMethod)) {
                throw new common_1.BadRequestException("Noto'g'ri to'lov usuli");
            }
        }
        const updatedPayment = await this.prisma.payment.update({
            where: { id },
            data: {
                amount: updatePaymentDto.amount !== undefined
                    ? updatePaymentDto.amount
                    : payment.amount,
                paymentMethod: updatePaymentDto.paymentMethod || payment.paymentMethod,
                paymentDetails: updatePaymentDto.paymentDetails !== undefined
                    ? updatePaymentDto.paymentDetails
                    : payment.paymentDetails || client_1.Prisma.JsonNull,
                externalTransactionId: updatePaymentDto.externalTransactionId !== undefined
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
    async remove(id) {
        const payment = await this.prisma.payment.findUnique({ where: { id } });
        if (!payment) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan to'lov topilmadi`);
        }
        await this.prisma.payment.delete({ where: { id } });
        return { success: true, message: "To'lov muvaffaqiyatli o'chirildi" };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map