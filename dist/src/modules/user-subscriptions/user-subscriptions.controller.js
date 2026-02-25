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
exports.UserSubscriptionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles/roles.decorator");
const client_1 = require("@prisma/client");
const user_subscriptions_service_1 = require("./user-subscriptions.service");
const create_user_subscription_dto_1 = require("./dto/create-user-subscription.dto");
const update_user_subscription_dto_1 = require("./dto/update-user-subscription.dto");
let UserSubscriptionsController = class UserSubscriptionsController {
    userSubscriptionsService;
    constructor(userSubscriptionsService) {
        this.userSubscriptionsService = userSubscriptionsService;
    }
    create(createUserSubscriptionDto) {
        return this.userSubscriptionsService.create(createUserSubscriptionDto);
    }
    findAll(req) {
        return this.userSubscriptionsService.findAll(req['user']);
    }
    findOne(id) {
        return this.userSubscriptionsService.findOne(id);
    }
    update(id, updateUserSubscriptionDto) {
        return this.userSubscriptionsService.update(id, updateUserSubscriptionDto);
    }
    remove(id) {
        return this.userSubscriptionsService.remove(id);
    }
};
exports.UserSubscriptionsController = UserSubscriptionsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}, ${client_1.Role.USER}` }),
    (0, swagger_1.ApiBody)({ type: create_user_subscription_dto_1.CreateUserSubscriptionDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Foydalanuvchi obunasi muvaffaqiyatli yaratildi" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_subscription_dto_1.CreateUserSubscriptionDto]),
    __metadata("design:returntype", void 0)
], UserSubscriptionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}, ${client_1.Role.USER}` }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Barcha foydalanuvchi obunalari" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", void 0)
], UserSubscriptionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}, ${client_1.Role.USER}` }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Foydalanuvchi obunasi tafsiloti" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserSubscriptionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}, ${client_1.Role.USER}` }),
    (0, swagger_1.ApiBody)({ type: update_user_subscription_dto_1.UpdateUserSubscriptionDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Foydalanuvchi obunasi muvaffaqiyatli yangilandi" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_subscription_dto_1.UpdateUserSubscriptionDto]),
    __metadata("design:returntype", void 0)
], UserSubscriptionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN, client_1.Role.USER),
    (0, swagger_1.ApiOperation)({ summary: `${client_1.Role.ADMIN}, ${client_1.Role.SUPERADMIN}, ${client_1.Role.USER}` }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Foydalanuvchi obunasi muvaffaqiyatli o'chirildi" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserSubscriptionsController.prototype, "remove", null);
exports.UserSubscriptionsController = UserSubscriptionsController = __decorate([
    (0, swagger_1.ApiTags)("User Subscriptions"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, common_1.Controller)("user-subscriptions"),
    __metadata("design:paramtypes", [user_subscriptions_service_1.UserSubscriptionsService])
], UserSubscriptionsController);
//# sourceMappingURL=user-subscriptions.controller.js.map