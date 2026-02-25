import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
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
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
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
