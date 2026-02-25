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
exports.UserSubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let UserSubscriptionsService = class UserSubscriptionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserSubscriptionDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: createUserSubscriptionDto.user_id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`ID: ${createUserSubscriptionDto.user_id} bo'lgan foydalanuvchi topilmadi`);
        }
        const plan = await this.prisma.subscriptionPlan.findUnique({
            where: { id: createUserSubscriptionDto.plan_id },
        });
        if (!plan) {
            throw new common_1.NotFoundException(`ID: ${createUserSubscriptionDto.plan_id} bo'lgan obuna rejasi topilmadi`);
        }
        if (!plan.isActive) {
            throw new common_1.BadRequestException('Bu rejani hozir faolsiz, boshqa rejani tanlang');
        }
        const subscription = await this.prisma.userSubscription.create({
            data: {
                user_id: createUserSubscriptionDto.user_id,
                plan_id: createUserSubscriptionDto.plan_id,
                status: createUserSubscriptionDto.status ||
                    client_1.SubscriptionStatus.pending_payment,
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
        if (current_user.role == client_1.Role.USER) {
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
                        avatarUrl: true,
                        createdAt: true,
                        email: true,
                        username: true
                    } },
            },
        });
        return { success: true, data: subscriptions, total: subscriptions.length };
    }
    async findOne(id) {
        const subscription = await this.prisma.userSubscription.findUnique({
            where: { id },
            include: {
                users: { select: { id: true, username: true } },
                subscriptionPlans: { select: { id: true, name: true } },
                payments: true,
            },
        });
        if (!subscription) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan obuna topilmadi`);
        }
        return { success: true, data: subscription };
    }
    async update(id, updateUserSubscriptionDto) {
        const subscription = await this.prisma.userSubscription.findUnique({
            where: { id },
        });
        if (!subscription) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan obuna topilmadi`);
        }
        if (updateUserSubscriptionDto.plan_id &&
            updateUserSubscriptionDto.plan_id !== subscription.plan_id) {
            const plan = await this.prisma.subscriptionPlan.findUnique({
                where: { id: updateUserSubscriptionDto.plan_id },
            });
            if (!plan) {
                throw new common_1.NotFoundException(`ID: ${updateUserSubscriptionDto.plan_id} bo'lgan obuna rejasi topilmadi`);
            }
            if (!plan.isActive) {
                throw new common_1.BadRequestException('Bu rejani hozir faolsiz');
            }
        }
        const updatedSubscription = await this.prisma.userSubscription.update({
            where: { id },
            data: {
                plan_id: updateUserSubscriptionDto.plan_id || subscription.plan_id,
                status: updateUserSubscriptionDto.status || subscription.status,
                autoRenew: updateUserSubscriptionDto.autoRenew !== undefined
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
    async remove(id) {
        const subscription = await this.prisma.userSubscription.findUnique({
            where: { id },
        });
        if (!subscription) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan obuna topilmadi`);
        }
        await this.prisma.userSubscription.delete({ where: { id } });
        return { success: true, message: "Obuna muvaffaqiyatli o'chirildi" };
    }
};
exports.UserSubscriptionsService = UserSubscriptionsService;
exports.UserSubscriptionsService = UserSubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserSubscriptionsService);
//# sourceMappingURL=user-subscriptions.service.js.map