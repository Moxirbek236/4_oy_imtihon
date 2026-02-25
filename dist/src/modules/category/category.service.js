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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CategoryService = class CategoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCategoryDto) {
        const movie = await this.prisma.movie.findUnique({
            where: { slug: createCategoryDto.slug },
        });
        if (movie) {
            throw new common_1.BadRequestException(`Bu slug avval qo'shilgan`);
        }
        const category = await this.prisma.categories.create({
            data: {
                slug: createCategoryDto.slug,
                name: createCategoryDto.name,
                description: createCategoryDto.description,
            },
        });
        return { success: true, data: category };
    }
    async findAll() {
        const previews = await this.prisma.categories.findMany();
        return { success: true, data: previews, total: previews.length };
    }
    async findOne(id) {
        const preview = await this.prisma.categories.findUnique({
            where: { id },
        });
        if (!preview) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan category topilmadi`);
        }
        return { success: true, data: preview };
    }
    async update(id, updatePreviewDto) {
        const preview = await this.prisma.movieFile.findUnique({
            where: { id },
        });
        if (!preview) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan preview topilmadi`);
        }
        const updatedPreview = await this.prisma.categories.update({
            where: { id },
            data: {
                createdAt: new Date(),
                name: updatePreviewDto.name,
                slug: updatePreviewDto.slug,
                description: updatePreviewDto.description,
            },
        });
        return { success: true, data: updatedPreview };
    }
    async remove(id) {
        const preview = await this.prisma.movieFile.findUnique({
            where: { id },
        });
        if (!preview) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan preview topilmadi`);
        }
        const deletedPreview = await this.prisma.movieFile.delete({
            where: { id },
        });
        return { success: true, data: deletedPreview };
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map