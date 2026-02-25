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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProfilesService = class ProfilesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findme(current_user) {
        const subscriptions = await this.prisma.userSubscription.findFirst({
            where: { user_id: current_user.id },
        });
        const userAbout = await this.prisma.profile.findFirst({
            where: { user_id: current_user.id },
            select: {
                id: true,
                fullName: true,
                country: true,
                createdAt: true,
                phone: true,
                updatedAt: true,
                user_id: true,
                users: {
                    select: {
                        id: true,
                        email: true,
                        avatarUrl: true,
                        createdAt: true,
                        role: true,
                        reviews: {
                            where: { user_id: current_user.id },
                            select: {
                                id: true,
                                movie_id: true,
                                comment: true,
                                createdAt: true,
                                rating: true,
                            },
                        },
                        watchHistorys: {
                            where: { user_id: current_user.id },
                            select: {
                                id: true,
                                lastWatched: true,
                                movie_id: true,
                                watchedDuration: true,
                                watchedPercentage: true,
                            },
                        },
                        userSubscriptions: {
                            where: { user_id: current_user.id },
                            select: {
                                id: true,
                                autoRenew: true,
                                createdAt: true,
                                endDate: true,
                                subscriptionPlans: {
                                    select: {
                                        id: true,
                                        name: true,
                                        price: true,
                                        isActive: true,
                                        features: true,
                                    },
                                },
                                payments: {
                                    where: { userSubscriptionId: subscriptions?.id },
                                    select: {
                                        amount: true,
                                        createdAt: true,
                                        id: true,
                                        externalTransactionId: true,
                                        paymentDetails: true,
                                        paymentMethod: true,
                                        status: true,
                                        updatedAt: true,
                                    },
                                },
                            },
                        },
                        favorites: {
                            where: { user_id: current_user.id },
                            select: {
                                id: true,
                                createdAt: true,
                                movie_id: true,
                                updatedAt: true,
                            },
                        },
                        movies: {
                            where: { created_by: current_user.id },
                            select: {
                                id: true,
                                title: true,
                                created_by: true,
                                createdAt: true,
                                creators: true,
                                description: true,
                                durationMinutes: true,
                                movieCategories: true,
                                movieFiles: true,
                                rating: true,
                                posterUrl: true,
                                releaseYear: true,
                                slug: true,
                                updatedAt: true,
                                subscriptionType: true,
                                reviews: {
                                    where: { user_id: current_user.id },
                                },
                            },
                        },
                    },
                },
            },
        });
        return {
            status: 200,
            success: true,
            data: userAbout,
        };
    }
    async update(id, updateProfileDto) {
        const profile = await this.prisma.profile.findUnique({ where: { id } });
        if (!profile) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan profil topilmadi`);
        }
        if (updateProfileDto.phone && updateProfileDto.phone !== profile.phone) {
            const existingPhone = await this.prisma.profile.findUnique({
                where: { phone: updateProfileDto.phone },
            });
            if (existingPhone) {
                throw new common_1.ConflictException('Bu telefon raqami bilan profil allaqachon mavjud');
            }
        }
        const updatedProfile = await this.prisma.profile.update({
            where: { id },
            data: {
                fullName: updateProfileDto.fullName || profile.fullName,
                phone: updateProfileDto.phone || profile.phone,
                country: updateProfileDto.country || profile.country,
            },
            include: { users: { select: { id: true, username: true, email: true } } },
        });
        return { success: true, data: updatedProfile };
    }
    async remove(id) {
        const profile = await this.prisma.profile.findUnique({ where: { id } });
        if (!profile) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan profil topilmadi`);
        }
        await this.prisma.profile.delete({ where: { id } });
        return { success: true, message: "Profil muvaffaqiyatli o'chirildi" };
    }
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfilesService);
//# sourceMappingURL=profiles.service.js.map