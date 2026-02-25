import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
export declare class MoviesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createMovieDto: CreateMovieDto, created_by: string, movi_url?: any, poster_url?: any): Promise<{
        success: boolean;
        data: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            rating: import("@prisma/client-runtime-utils").Decimal | null;
            created_by: string;
            slug: string;
            releaseYear: number;
            durationMinutes: number;
            viewCount: number;
            creators: {
                username: string;
                id: string;
            };
        };
    }>;
    findAll(subscriptionType?: string, search?: string, categoryId?: string, page?: number, limit?: number): Promise<{
        success: boolean;
        data: {
            movies: ({
                movieCategories: ({
                    categories: {
                        name: string;
                        description: string;
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        slug: string;
                    };
                } & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    movie_id: string;
                    category_id: string;
                })[];
                creators: {
                    username: string;
                    id: string;
                };
            } & {
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
            })[];
            pagination: {
                total: number;
                page: number;
                limit: number;
                pages: number;
            };
        };
    }>;
    findLimited(user_id: object, search?: string, categoryId?: string, page?: number, limit?: number): Promise<{
        success: boolean;
        data: {
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
            }[];
            pagination: {
                total: number;
                page: number;
                limit: number;
                pages: number;
            };
        };
    }>;
    findOne(idOrSlug: string, user_id: any): Promise<{
        success: boolean;
        data: any;
    } | undefined>;
    update(id: string, updateMovieDto: UpdateMovieDto, movie_url: any, post_url: any): Promise<{
        success: boolean;
        data: {
            creators: {
                username: string;
                id: string;
            };
        } & {
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
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
