import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    create(req: Request, createMovieDto: CreateMovieDto, files: {
        poster?: Express.Multer.File[];
        movie: Express.Multer.File[];
    }): Promise<{
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
    findLimited(req: Request, search?: string, categoryId?: string, page?: number, limit?: number): Promise<{
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
    findOne(req: Request, id: string): Promise<{
        success: boolean;
        data: any;
    } | undefined>;
    update(req: Request, updateMovieDto: UpdateMovieDto, files: {
        poster?: Express.Multer.File[];
        movie: Express.Multer.File[];
    }): Promise<{
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
