"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth/jwt-auth.guard");
const movies_service_1 = require("./movies.service");
const create_movie_dto_1 = require("./dto/create-movie.dto");
const update_movie_dto_1 = require("./dto/update-movie.dto");
const roles_guard_1 = require("../../common/guards/roles/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles/roles.decorator");
const client_1 = require("@prisma/client");
const path_1 = require("path");
const multer_1 = require("multer");
const fs = __importStar(require("fs"));
let MoviesController = class MoviesController {
    moviesService;
    constructor(moviesService) {
        this.moviesService = moviesService;
    }
    create(req, createMovieDto, files) {
        const posterFile = files.poster?.[0];
        const movieFile = files.movie[0];
        movieFile?.path;
        const posterUrl = posterFile ? `/uploads/${posterFile.filename}` : null;
        if (!movieFile) {
            throw new common_1.BadRequestException('Movie file majburiy');
        }
        return this.moviesService.create(createMovieDto, req['user'].id, movieFile?.path, posterFile?.path);
    }
    findAll(subscriptionType, search, categoryId, page = 1, limit = 20) {
        return this.moviesService.findAll(subscriptionType, search, categoryId, page, limit);
    }
    async watchMovie(id, req, res) {
        const movie = await this.moviesService.getMovieForAccess(id, req['user'].id);
        const filePath = movie.movieFiles[0].fileUrl;
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException('Fayl topilmadi');
        }
        const file = fs.createReadStream(filePath);
        res.set({
            'Content-Type': 'video/mp4',
            'Content-Disposition': 'inline',
        });
        return new common_1.StreamableFile(file);
    }
    async downloadMovie(id, req, res) {
        const movie = await this.moviesService.getMovieForAccess(id, req['user'].id);
        const filePath = movie.movieFiles[0].fileUrl;
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException('Fayl topilmadi');
        }
        return res.download(filePath);
    }
    findLimited(req, search, categoryId, page = 1, limit = 20) {
        return this.moviesService.findLimited(req['user'].id, search, categoryId, Number(page), Number(limit));
    }
    findOne(req, id) {
        return this.moviesService.findOne(id, req['user'].id);
    }
    update(req, updateMovieDto, files) {
        const posterFile = files.poster?.[0];
        const movieFile = files.movie[0];
        movieFile?.path;
        const posterUrl = posterFile ? `/uploads/${posterFile.filename}` : null;
        if (!movieFile) {
            throw new common_1.BadRequestException('Movie file majburiy');
        }
        return this.moviesService.update(req['user'].id, updateMovieDto, movieFile?.path, posterFile?.path);
    }
    remove(id) {
        return this.moviesService.remove(id);
    }
};
exports.MoviesController = MoviesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'poster', maxCount: 1 },
        { name: 'movie', maxCount: 1 },
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}` }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                slug: { type: 'string' },
                releaseYear: { type: 'number' },
                description: { type: 'string' },
                durationMinutes: { type: 'number' },
                subscriptionType: {
                    type: 'string',
                    enum: Object.values(client_1.SubscriptionType),
                },
                category_slug: { type: 'string' },
                quality: { type: 'string' },
                language: { type: 'string' },
                poster: { type: 'string', format: 'binary' },
                movie: { type: 'string', format: 'binary' },
            },
        },
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request,
        create_movie_dto_1.CreateMovieDto, Object]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('admin'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}` }),
    (0, swagger_1.ApiQuery)({
        name: 'subscriptionType',
        required: false,
        enum: ['free', 'premium'],
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: "Film nomi yoki tavsifi bo'yicha qidirish",
    }),
    (0, swagger_1.ApiQuery)({
        name: 'categoryId',
        required: false,
        description: "Kategoriya bo'yicha filtrlash",
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Barcha filmlar' }),
    __param(0, (0, common_1.Query)('subscriptionType')),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('categoryId')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/watch'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: 'Movie watch (stream)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stream movie' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request, Object]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "watchMovie", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: 'Movie download' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Download movie' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request, Object]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "downloadMovie", null);
__decorate([
    (0, common_1.Get)('user'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}, ${client_1.Role.USER}` }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: "Film nomi yoki tavsifi bo'yicha qidirish",
    }),
    (0, swagger_1.ApiQuery)({
        name: 'categoryId',
        required: false,
        description: "Kategoriya bo'yicha filtrlash",
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Barcha filmlar' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('categoryId')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String, String, Number, Number]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "findLimited", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}, ${client_1.Role.USER}` }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Film tafsiloti' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'poster', maxCount: 1 },
        { name: 'movie', maxCount: 1 },
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}` }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                slug: { type: 'string' },
                releaseYear: { type: 'number' },
                description: { type: 'string' },
                durationMinutes: { type: 'number' },
                subscriptionType: { type: 'string' },
                category_slug: { type: 'string' },
                quality: { type: 'string' },
                language: { type: 'string' },
                poster: { type: 'string', format: 'binary' },
                movie: { type: 'string', format: 'binary' },
            },
        },
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request,
        update_movie_dto_1.UpdateMovieDto, Object]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}` }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Film muvaffaqiyatli o'chirildi" }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "remove", null);
exports.MoviesController = MoviesController = __decorate([
    (0, swagger_1.ApiTags)('Movies'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('movies'),
    __metadata("design:paramtypes", [movies_service_1.MoviesService])
], MoviesController);
//# sourceMappingURL=movies.controller.js.map