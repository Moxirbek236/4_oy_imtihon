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
exports.SubscriptionPlansService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let SubscriptionPlansService = class SubscriptionPlansService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSubscriptionPlanDto) {
        if (createSubscriptionPlanDto.durationDays < 1) {
            throw new common_1.BadRequestException("Obuna davomiyligi 1 kundan kam bo'lishi mumkin emas");
        }
        if (createSubscriptionPlanDto.price < 0) {
            throw new common_1.BadRequestException("Narx manfiy bo'lishi mumkin emas");
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
    async findOne(id) {
        const plan = await this.prisma.subscriptionPlan.findUnique({
            where: { id },
            include: { userSubscriptions: true },
        });
        if (!plan) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan obuna rejasi topilmadi`);
        }
        return { success: true, data: plan };
    }
    async update(id, updateSubscriptionPlanDto) {
        const plan = await this.prisma.subscriptionPlan.findUnique({ where: { id } });
        if (!plan) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan obuna rejasi topilmadi`);
        }
        if (updateSubscriptionPlanDto.durationDays && updateSubscriptionPlanDto.durationDays < 1) {
            throw new common_1.BadRequestException("Obuna davomiyligi 1 kundan kam bo'lishi mumkin emas");
        }
        if (updateSubscriptionPlanDto.price !== undefined && updateSubscriptionPlanDto.price < 0) {
            throw new common_1.BadRequestException("Narx manfiy bo'lishi mumkin emas");
        }
        const updatedPlan = await this.prisma.subscriptionPlan.update({
            where: { id },
            data: {
                name: updateSubscriptionPlanDto.name || plan.name,
                price: updateSubscriptionPlanDto.price !== undefined ? updateSubscriptionPlanDto.price : plan.price,
                durationDays: updateSubscriptionPlanDto.durationDays || plan.durationDays,
                features: updateSubscriptionPlanDto.features !== undefined ? updateSubscriptionPlanDto.features : (plan.features || client_1.Prisma.JsonNull),
                isActive: updateSubscriptionPlanDto.isActive !== undefined ? updateSubscriptionPlanDto.isActive : plan.isActive,
            },
        });
        return { success: true, data: updatedPlan };
    }
    async remove(id) {
        const plan = await this.prisma.subscriptionPlan.findUnique({ where: { id } });
        if (!plan) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan obuna rejasi topilmadi`);
        }
        const activeSubscriptions = await this.prisma.userSubscription.findFirst({
            where: { plan_id: id },
        });
        if (activeSubscriptions) {
            throw new common_1.BadRequestException("Bu rejadan foydalanadigan faol obunalar mavjud, o'chirish mumkin emas");
        }
        await this.prisma.subscriptionPlan.delete({ where: { id } });
        return { success: true, message: "Obuna rejasi muvaffaqiyatli o'chirildi" };
    }
};
exports.SubscriptionPlansService = SubscriptionPlansService;
exports.SubscriptionPlansService = SubscriptionPlansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubscriptionPlansService);
//# sourceMappingURL=subscription-plans.service.js.map