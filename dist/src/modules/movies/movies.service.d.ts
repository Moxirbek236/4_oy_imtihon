import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
export declare class MoviesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createMovieDto: CreateMovieDto, created_by: string, movi_url?: any, poster_url?: any): Promise<{
        success: boolean;
        data: {
            id: string;
            title: string;
            slug: string;
            description: string | null;
            releaseYear: number;
            durationMinutes: number;
            rating: import("@prisma/client-runtime-utils").Decimal | null;
            viewCount: number;
            createdAt: Date;
            creators: {
                id: string;
                username: string;
            };
            created_by: string;
        };
    }>;
    findAll(subscriptionType?: string, search?: string, categoryId?: string, page?: number, limit?: number): Promise<{
        success: boolean;
        data: {
            movies: ({
                movieCategories: ({
                    categories: {
                        id: string;
                        slug: string;
                        description: string;
                        createdAt: Date;
                        updatedAt: Date;
                        name: string;
                    };
                } & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    movie_id: string;
                    category_id: string;
                })[];
                creators: {
                    id: string;
                    username: string;
                };
            } & {
                id: string;
                title: string;
                slug: string;
                description: string | null;
                releaseYear: number;
                durationMinutes: number;
                posterUrl: string | null;
                rating: import("@prisma/client-runtime-utils").Decimal | null;
                subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
                viewCount: number;
                createdAt: Date;
                updatedAt: Date;
                created_by: string;
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
                id: string;
                title: string;
                slug: string;
                description: string | null;
                releaseYear: number;
                durationMinutes: number;
                posterUrl: string | null;
                rating: import("@prisma/client-runtime-utils").Decimal | null;
                subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
                viewCount: number;
                createdAt: Date;
                updatedAt: Date;
                created_by: string;
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
    getMovieForAccess(movieId: string, userId: string): Promise<{
        movieFiles: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            movie_id: string;
            fileUrl: string;
            quality: string;
            language: string;
        }[];
    } & {
        id: string;
        title: string;
        slug: string;
        description: string | null;
        releaseYear: number;
        durationMinutes: number;
        posterUrl: string | null;
        rating: import("@prisma/client-runtime-utils").Decimal | null;
        subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
        viewCount: number;
        createdAt: Date;
        updatedAt: Date;
        created_by: string;
    }>;
    update(id: string, updateMovieDto: UpdateMovieDto, movie_url: any, post_url: any): Promise<{
        success: boolean;
        data: {
            creators: {
                id: string;
                username: string;
            };
        } & {
            id: string;
            title: string;
            slug: string;
            description: string | null;
            releaseYear: number;
            durationMinutes: number;
            posterUrl: string | null;
            rating: import("@prisma/client-runtime-utils").Decimal | null;
            subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
            viewCount: number;
            createdAt: Date;
            updatedAt: Date;
            created_by: string;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
