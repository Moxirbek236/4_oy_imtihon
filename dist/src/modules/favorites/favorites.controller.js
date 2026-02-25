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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles/roles.decorator");
const client_1 = require("@prisma/client");
const favorites_service_1 = require("./favorites.service");
const create_favorite_dto_1 = require("./dto/create-favorite.dto");
let FavoritesController = class FavoritesController {
    favoritesService;
    constructor(favoritesService) {
        this.favoritesService = favoritesService;
    }
    create(createFavoriteDto) {
        return this.favoritesService.create(createFavoriteDto);
    }
    findAll() {
        return this.favoritesService.findAll();
    }
    findOne(id) {
        return this.favoritesService.findOne(id);
    }
    remove(id) {
        return this.favoritesService.remove(id);
    }
};
exports.FavoritesController = FavoritesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.Role.USER, client_1.Role.SUPERADMIN),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.USER}` }),
    (0, swagger_1.ApiBody)({ type: create_favorite_dto_1.CreateFavoriteDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Sevimli film muvaffaqiyatli qo'shildi" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_favorite_dto_1.CreateFavoriteDto]),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.SUPERADMIN}, ${client_1.Role.USER}` }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Barcha sevimli filmlar" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}, ${client_1.Role.USER}` }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Sevimli film tafsiloti" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_decorator_1.Roles)(client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.USER}` }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Sevimli film muvaffaqiyatli o'chirildi" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "remove", null);
exports.FavoritesController = FavoritesController = __decorate([
    (0, swagger_1.ApiTags)("Favorites"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, common_1.Controller)("favorites"),
    __metadata("design:paramtypes", [favorites_service_1.FavoritesService])
], FavoritesController);
//# sourceMappingURL=favorites.controller.js.map