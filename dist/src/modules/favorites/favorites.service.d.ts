import { PrismaService } from "src/prisma/prisma.service";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
export declare class FavoritesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createFavoriteDto: CreateFavoriteDto): Promise<{
        success: boolean;
        data: {
            movies: {
                title: string;
                id: string;
                slug: string;
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
        };
    }>;
    findAll(): Promise<{
        success: boolean;
        data: ({
            movies: {
                title: string;
                id: string;
                slug: string;
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
        })[];
        total: number;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            movies: {
                title: string;
                id: string;
                slug: string;
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
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
