import { WatchhistoryService } from './watchhistory.service';
import { CreateWatchHistoryDto } from './dto/create-watchhistory.dto';
import { UpdateWatchhistoryDto } from './dto/update-watchhistory.dto';
export declare class WatchhistoryController {
    private readonly watchhistoryService;
    constructor(watchhistoryService: WatchhistoryService);
    create(createWatchhistoryDto: CreateWatchHistoryDto): Promise<{
        movies: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: import("@prisma/client-runtime-utils").Decimal | null;
            created_by: string;
            slug: string;
            releaseYear: number;
            durationMinutes: number;
            posterUrl: string | null;
            subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
            viewCount: number;
        };
        users: {
            username: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            id: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        user_id: string;
        movie_id: string;
        watchedDuration: number;
        watchedPercentage: import("@prisma/client-runtime-utils").Decimal;
        lastWatched: Date;
    }>;
    findAll(): Promise<({
        movies: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: import("@prisma/client-runtime-utils").Decimal | null;
            created_by: string;
            slug: string;
            releaseYear: number;
            durationMinutes: number;
            posterUrl: string | null;
            subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
            viewCount: number;
        };
        users: {
            username: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            id: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        user_id: string;
        movie_id: string;
        watchedDuration: number;
        watchedPercentage: import("@prisma/client-runtime-utils").Decimal;
        lastWatched: Date;
    })[]>;
    findOne(id: string): Promise<{
        movies: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: import("@prisma/client-runtime-utils").Decimal | null;
            created_by: string;
            slug: string;
            releaseYear: number;
            durationMinutes: number;
            posterUrl: string | null;
            subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
            viewCount: number;
        };
        users: {
            username: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            id: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        user_id: string;
        movie_id: string;
        watchedDuration: number;
        watchedPercentage: import("@prisma/client-runtime-utils").Decimal;
        lastWatched: Date;
    }>;
    update(id: string, updateWatchhistoryDto: UpdateWatchhistoryDto): Promise<{
        movies: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: import("@prisma/client-runtime-utils").Decimal | null;
            created_by: string;
            slug: string;
            releaseYear: number;
            durationMinutes: number;
            posterUrl: string | null;
            subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
            viewCount: number;
        };
        users: {
            username: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            id: string;
            passwordHash: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        user_id: string;
        movie_id: string;
        watchedDuration: number;
        watchedPercentage: import("@prisma/client-runtime-utils").Decimal;
        lastWatched: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        user_id: string;
        movie_id: string;
        watchedDuration: number;
        watchedPercentage: import("@prisma/client-runtime-utils").Decimal;
        lastWatched: Date;
    }>;
}
