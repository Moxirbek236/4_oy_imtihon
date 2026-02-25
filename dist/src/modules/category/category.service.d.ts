import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        success: boolean;
        data: {
            name: string;
            description: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        };
    }>;
    findAll(): Promise<{
        success: boolean;
        data: {
            name: string;
            description: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        }[];
        total: number;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            name: string;
            description: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        };
    }>;
    update(id: string, updatePreviewDto: UpdateCategoryDto): Promise<{
        success: boolean;
        data: {
            name: string;
            description: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            movie_id: string;
            quality: string;
            language: string;
            fileUrl: string;
        };
    }>;
}
