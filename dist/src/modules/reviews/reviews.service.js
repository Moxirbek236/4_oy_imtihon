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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ReviewsService = class ReviewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createReviewDto) {
        const movie = await this.prisma.movie.findUnique({
            where: { id: createReviewDto.movie_id },
        });
        if (!movie) {
            throw new common_1.NotFoundException(`ID: ${createReviewDto.movie_id} bo'lgan film topilmadi`);
        }
        const existingReview = await this.prisma.review.findFirst({
            where: {
                user_id: userId,
                movie_id: createReviewDto.movie_id,
            },
        });
        if (existingReview) {
            throw new common_1.BadRequestException('Siz bu filmga allaqachon sharh qoldirgan');
        }
        const review = await this.prisma.review.create({
            data: {
                user_id: userId,
                movie_id: createReviewDto.movie_id,
                rating: createReviewDto.rating,
                comment: createReviewDto.comment || null,
            },
            include: {
                users: { select: { id: true, username: true } },
                movies: { select: { id: true, title: true } },
            },
        });
        return { success: true, data: review };
    }
    async findAll(movieId) {
        const reviews = await this.prisma.review.findMany({
            where: { movie_id: movieId },
            include: {
                users: { select: { id: true, username: true } },
            },
        });
        if (reviews.length === 0) {
            throw new common_1.NotFoundException('Bu filmga hech qanday sharh yo\'q');
        }
        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        return {
            success: true,
            data: {
                reviews,
                average_rating: Math.round(averageRating * 10) / 10,
                count: reviews.length,
            },
        };
    }
    async findOne(id) {
        const review = await this.prisma.review.findUnique({
            where: { id },
            include: {
                users: { select: { id: true, username: true } },
                movies: { select: { id: true, title: true } },
            },
        });
        if (!review) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan sharh topilmadi`);
        }
        return { success: true, data: review };
    }
    async update(id, userId, updateReviewDto) {
        const review = await this.prisma.review.findUnique({ where: { id } });
        if (!review) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan sharh topilmadi`);
        }
        if (review.user_id !== userId) {
            throw new common_1.BadRequestException('Siz faqatgina o\'z sharhingizni tahrirlashingiz mumkin');
        }
        const updatedReview = await this.prisma.review.update({
            where: { id },
            data: {
                rating: updateReviewDto.rating || review.rating,
                comment: updateReviewDto.comment !== undefined ? updateReviewDto.comment : review.comment,
            },
            include: {
                users: { select: { id: true, username: true } },
                movies: { select: { id: true, title: true } },
            },
        });
        return { success: true, data: updatedReview };
    }
    async remove(id, userId) {
        const review = await this.prisma.review.findUnique({ where: { id } });
        if (!review) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan sharh topilmadi`);
        }
        if (review.user_id !== userId) {
            throw new common_1.BadRequestException('Siz faqatgina o\'z sharhingizni o\'chira olasiz');
        }
        await this.prisma.review.delete({ where: { id } });
        return { success: true, message: 'Sharh muvaffaqiyatli o\'chirildi' };
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map