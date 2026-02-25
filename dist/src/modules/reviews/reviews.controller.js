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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const client_1 = require("@prisma/client");
const reviews_service_1 = require("./reviews.service");
const create_review_dto_1 = require("./dto/create-review.dto");
const update_review_dto_1 = require("./dto/update-review.dto");
let ReviewsController = class ReviewsController {
    reviewsService;
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    create(user, createReviewDto) {
        return this.reviewsService.create(user.id, createReviewDto);
    }
    findAll(movieId) {
        return this.reviewsService.findAll(movieId);
    }
    findOne(id) {
        return this.reviewsService.findOne(id);
    }
    update(id, user, updateReviewDto) {
        return this.reviewsService.update(id, user.id, updateReviewDto);
    }
    remove(id, user) {
        return this.reviewsService.remove(id, user.id);
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}, ${client_1.Role.USER}` }),
    (0, swagger_1.ApiBody)({ type: create_review_dto_1.CreateReviewDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Sharh muvaffaqiyatli qo\'shildi' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('movie/:movieId'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}, ${client_1.Role.USER}` }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Film sharhlari' }),
    __param(0, (0, common_1.Param)('movieId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}, ${client_1.Role.USER}` }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sharh tafsiloti' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}, ${client_1.Role.USER}` }),
    (0, swagger_1.ApiBody)({ type: update_review_dto_1.UpdateReviewDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sharh muvaffaqiyatli yangilandi' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}, ${client_1.Role.USER}` }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sharh muvaffaqiyatli o\'chirildi' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "remove", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)('Reviews'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map