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
exports.Utils = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let Utils = class Utils {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async check_expired(user_id) {
        const sub = await this.prisma.userSubscription.findFirst({
            where: { user_id },
        });
        const pay = await this.prisma.payment.findFirst({
            where: { userSubscriptionId: sub.id },
        });
        const start = sub?.startDate;
        const now = new Date();
        const end = sub?.endDate;
        if (end) {
            return now == end || now > end;
        }
        else {
            return false;
        }
    }
};
exports.Utils = Utils;
exports.Utils = Utils = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], Utils);
//# sourceMappingURL=checkExpired.js.map