import { WatchhistoryService } from './watchhistory.service';
import { CreateWatchHistoryDto } from './dto/create-watchhistory.dto';
import { UpdateWatchhistoryDto } from './dto/update-watchhistory.dto';
export declare class WatchhistoryController {
    private readonly watchhistoryService;
    constructor(watchhistoryService: WatchhistoryService);
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
            rating: import("@prisma/client-runtime-utils").Decimal | null;
            subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
            viewCount: number;
            created_by: string;
        };
    } & {
        id: string;
        watchedDuration: number;
        watchedPercentage: import("@prisma/client-runtime-utils").Decimal;
        lastWatched: Date;
        user_id: string;
        movie_id: string;
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
            rating: import("@prisma/client-runtime-utils").Decimal | null;
            subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
            viewCount: number;
            created_by: string;
        };
    } & {
        id: string;
        watchedDuration: number;
        watchedPercentage: import("@prisma/client-runtime-utils").Decimal;
        lastWatched: Date;
        user_id: string;
        movie_id: string;
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
            rating: import("@prisma/client-runtime-utils").Decimal | null;
            subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
            viewCount: number;
            created_by: string;
        };
    } & {
        id: string;
        watchedDuration: number;
        watchedPercentage: import("@prisma/client-runtime-utils").Decimal;
        lastWatched: Date;
        user_id: string;
        movie_id: string;
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
            rating: import("@prisma/client-runtime-utils").Decimal | null;
            subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
            viewCount: number;
            created_by: string;
        };
    } & {
        id: string;
        watchedDuration: number;
        watchedPercentage: import("@prisma/client-runtime-utils").Decimal;
        lastWatched: Date;
        user_id: string;
        movie_id: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        watchedDuration: number;
        watchedPercentage: import("@prisma/client-runtime-utils").Decimal;
        lastWatched: Date;
        user_id: string;
        movie_id: string;
    }>;
}
