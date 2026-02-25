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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let FavoritesService = class FavoritesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createFavoriteDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: createFavoriteDto.user_id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`ID: ${createFavoriteDto.user_id} bo'lgan foydalanuvchi topilmadi`);
        }
        const movie = await this.prisma.movie.findUnique({
            where: { id: createFavoriteDto.movie_id },
        });
        if (!movie) {
            throw new common_1.NotFoundException(`ID: ${createFavoriteDto.movie_id} bo'lgan film topilmadi`);
        }
        const existingFavorite = await this.prisma.favorites.findFirst({
            where: {
                user_id: createFavoriteDto.user_id,
                movie_id: createFavoriteDto.movie_id,
            },
        });
        if (existingFavorite) {
            throw new common_1.ConflictException("Bu film allaqachon sevimli ro'yxatda mavjud");
        }
        const favorite = await this.prisma.favorites.create({
            data: {
                user_id: createFavoriteDto.user_id,
                movie_id: createFavoriteDto.movie_id,
            },
            include: {
                users: { select: { id: true, username: true } },
                movies: { select: { id: true, title: true, slug: true } },
            },
        });
        return { success: true, data: favorite };
    }
    async findAll() {
        const favorites = await this.prisma.favorites.findMany({
            include: {
                users: { select: { id: true, username: true } },
                movies: { select: { id: true, title: true, slug: true } },
            },
        });
        return { success: true, data: favorites, total: favorites.length };
    }
    async findOne(id) {
        const favorite = await this.prisma.favorites.findUnique({
            where: { id },
            include: {
                users: { select: { id: true, username: true } },
                movies: { select: { id: true, title: true, slug: true } },
            },
        });
        if (!favorite) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan sevimli film topilmadi`);
        }
        return { success: true, data: favorite };
    }
    async remove(id) {
        const favorite = await this.prisma.favorites.findUnique({ where: { id } });
        if (!favorite) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan sevimli film topilmadi`);
        }
        await this.prisma.favorites.delete({ where: { id } });
        return { success: true, message: "Sevimli film muvaffaqiyatli o'chirildi" };
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map