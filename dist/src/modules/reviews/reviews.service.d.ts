import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createReviewDto: CreateReviewDto): Promise<{
        success: boolean;
        data: {
            movies: {
                title: string;
                id: string;
            };
            users: {
                username: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            user_id: string;
            movie_id: string;
            rating: number;
            comment: string | null;
        };
    }>;
    findAll(movieId: string): Promise<{
        success: boolean;
        data: {
            reviews: ({
                users: {
                    username: string;
                    id: string;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                user_id: string;
                movie_id: string;
                rating: number;
                comment: string | null;
            })[];
            average_rating: number;
            count: number;
        };
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            movies: {
                title: string;
                id: string;
            };
            users: {
                username: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            user_id: string;
            movie_id: string;
            rating: number;
            comment: string | null;
        };
    }>;
    update(id: string, userId: string, updateReviewDto: UpdateReviewDto): Promise<{
        success: boolean;
        data: {
            movies: {
                title: string;
                id: string;
            };
            users: {
                username: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            user_id: string;
            movie_id: string;
            rating: number;
            comment: string | null;
        };
    }>;
    remove(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
