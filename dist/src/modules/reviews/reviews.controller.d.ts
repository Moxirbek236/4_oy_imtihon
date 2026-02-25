import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(user: any, createReviewDto: CreateReviewDto): Promise<{
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
    update(id: string, user: any, updateReviewDto: UpdateReviewDto): Promise<{
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
    remove(id: string, user: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
