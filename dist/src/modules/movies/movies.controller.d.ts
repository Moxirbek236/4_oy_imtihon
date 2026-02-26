import { StreamableFile } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import type { Response } from 'express';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    create(req: Request, createMovieDto: CreateMovieDto, files: {
        poster?: Express.Multer.File[];
        movie: Express.Multer.File[];
    }): Promise<{
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
    watchMovie(id: string, req: Request, res: Response): Promise<StreamableFile>;
    downloadMovie(id: string, req: Request, res: Response): Promise<void>;
    findLimited(req: Request, search?: string, categoryId?: string, page?: number, limit?: number): Promise<{
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
