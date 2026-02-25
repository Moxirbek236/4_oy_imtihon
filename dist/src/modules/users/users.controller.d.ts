import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { queryDto } from './dto/query.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(req: Request, createUserDto: CreateUserDto, file?: Express.Multer.File): Promise<{
        success: boolean;
        data: {
            username: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            id: string;
            createdAt: Date;
        };
    }>;
    findAll(req: Request, search?: queryDto): Promise<{
        username: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        avatarUrl: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[] | {
        success: boolean;
        data: {
            username: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
    }>;
    findOne(id: string, req: Request): Promise<boolean | {
        success: boolean;
        data: {
            username: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            avatarUrl: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profiles: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                user_id: string;
                fullName: string;
                phone: string | null;
                country: string;
            }[];
            userSubscriptions: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                user_id: string;
                plan_id: string;
                startDate: Date | null;
                endDate: Date | null;
                status: import("@prisma/client").$Enums.SubscriptionStatus;
                autoRenew: boolean;
            }[];
        };
    }>;
    update(req: Request, id: string, updateUserDto: UpdateUserDto, file?: Express.Multer.File): Promise<{
        success: boolean;
        data: any;
    }>;
    remove(req: Request, id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
