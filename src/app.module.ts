import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './modules/users/users.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { MoviesModule } from './modules/movies/movies.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { SubscriptionPlansModule } from './modules/subscription-plans/subscription-plans.module';
import { UserSubscriptionsModule } from './modules/user-subscriptions/user-subscriptions.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './modules/category/category.module';
import { WatchhistoryModule } from './modules/watchhistory/watchhistory.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'shaftoli',
      signOptions: { expiresIn: '7d' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', 'uploads'),
      serveRoot: '/uploads', 
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProfilesModule,
    MoviesModule,
    FavoritesModule,
    PaymentsModule,
    SubscriptionPlansModule,
    UserSubscriptionsModule,
    ReviewsModule,
    CategoryModule,
    WatchhistoryModule,
  ],
})
export class AppModule {}
