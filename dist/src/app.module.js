"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const users_module_1 = require("./modules/users/users.module");
const profiles_module_1 = require("./modules/profiles/profiles.module");
const movies_module_1 = require("./modules/movies/movies.module");
const favorites_module_1 = require("./modules/favorites/favorites.module");
const payments_module_1 = require("./modules/payments/payments.module");
const subscription_plans_module_1 = require("./modules/subscription-plans/subscription-plans.module");
const user_subscriptions_module_1 = require("./modules/user-subscriptions/user-subscriptions.module");
const reviews_module_1 = require("./modules/reviews/reviews.module");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const category_module_1 = require("./modules/category/category.module");
const watchhistory_module_1 = require("./modules/watchhistory/watchhistory.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET || 'shaftoli',
                signOptions: { expiresIn: '7d' },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            profiles_module_1.ProfilesModule,
            movies_module_1.MoviesModule,
            favorites_module_1.FavoritesModule,
            payments_module_1.PaymentsModule,
            subscription_plans_module_1.SubscriptionPlansModule,
            user_subscriptions_module_1.UserSubscriptionsModule,
            reviews_module_1.ReviewsModule,
            category_module_1.CategoryModule,
            watchhistory_module_1.WatchhistoryModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map