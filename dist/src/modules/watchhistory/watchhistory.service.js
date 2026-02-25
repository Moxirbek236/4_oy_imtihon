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
exports.WatchhistoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let WatchhistoryService = class WatchhistoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createWatchhistoryDto) {
        return await this.prisma.watchHistory.create({
            data: {
                user_id: createWatchhistoryDto.user_id,
                movie_id: createWatchhistoryDto.movie_id,
                watchedDuration: createWatchhistoryDto.watchedDuration,
                watchedPercentage: new client_1.Prisma.Decimal(createWatchhistoryDto.watchedPercentage),
                lastWatched: createWatchhistoryDto.lastWatched ?? new Date(),
            },
            include: {
                users: true,
                movies: true,
            },
        });
    }
    async findAll() {
        return await this.prisma.watchHistory.findMany({
            include: {
                users: true,
                movies: true,
            },
            orderBy: {
                lastWatched: 'desc',
            },
        });
    }
    async findOne(id) {
        const watchHistory = await this.prisma.watchHistory.findUnique({
            where: { id },
            include: {
                users: true,
                movies: true,
            },
        });
        if (!watchHistory) {
            throw new common_1.NotFoundException('WatchHistory topilmadi');
        }
        return watchHistory;
    }
    async update(id, updateWatchhistoryDto) {
        await this.findOne(id);
        return await this.prisma.watchHistory.update({
            where: { id },
            data: {
                ...updateWatchhistoryDto
            },
            include: {
                users: true,
                movies: true,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.watchHistory.delete({
            where: { id },
        });
    }
};
exports.WatchhistoryService = WatchhistoryService;
exports.WatchhistoryService = WatchhistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WatchhistoryService);
//# sourceMappingURL=watchhistory.service.js.map