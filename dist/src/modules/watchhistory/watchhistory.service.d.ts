import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateWatchhistoryDto } from './dto/update-watchhistory.dto';
import { CreateWatchHistoryDto } from './dto/create-watchhistory.dto';
import { Prisma } from '@prisma/client';
export declare class WatchhistoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createWatchhistoryDto: CreateWatchHistoryDto): Promise<{
        users: {
            id: string;
            username: string;
            email: string;
            passwordHash: string;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        movies: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            description: string | null;
            releaseYear: number;
            durationMinutes: number;
            posterUrl: string | null;
            rating: Prisma.Decimal | null;
            subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
            viewCount: number;
            created_by: string;
        };
    } & {
        user_id: string;
        movie_id: string;
        watchedDuration: number;
        watchedPercentage: Prisma.Decimal;
        lastWatched: Date;
        id: string;
    }>;
    findAll(): Promise<({
        users: {
            id: string;
            username: string;
            email: string;
            passwordHash: string;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        movies: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            description: string | null;
            releaseYear: number;
            durationMinutes: number;
            posterUrl: string | null;
            rating: Prisma.Decimal | null;
            subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
            viewCount: number;
            created_by: string;
        };
    } & {
        user_id: string;
        movie_id: string;
        watchedDuration: number;
        watchedPercentage: Prisma.Decimal;
        lastWatched: Date;
        id: string;
    })[]>;
    findOne(id: string): Promise<{
        users: {
            id: string;
            username: string;
            email: string;
            passwordHash: string;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        movies: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            description: string | null;
            releaseYear: number;
            durationMinutes: number;
            posterUrl: string | null;
            rating: Prisma.Decimal | null;
            subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
            viewCount: number;
            created_by: string;
        };
    } & {
        user_id: string;
        movie_id: string;
        watchedDuration: number;
        watchedPercentage: Prisma.Decimal;
        lastWatched: Date;
        id: string;
    }>;
    update(id: string, updateWatchhistoryDto: UpdateWatchhistoryDto): Promise<{
        users: {
            id: string;
            username: string;
            email: string;
            passwordHash: string;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        movies: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            description: string | null;
            releaseYear: number;
            durationMinutes: number;
            posterUrl: string | null;
            rating: Prisma.Decimal | null;
            subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
            viewCount: number;
            created_by: string;
        };
    } & {
        user_id: string;
        movie_id: string;
        watchedDuration: number;
        watchedPercentage: Prisma.Decimal;
        lastWatched: Date;
        id: string;
    }>;
    remove(id: string): Promise<{
        user_id: string;
        movie_id: string;
        watchedDuration: number;
        watchedPercentage: Prisma.Decimal;
        lastWatched: Date;
        id: string;
    }>;
}
