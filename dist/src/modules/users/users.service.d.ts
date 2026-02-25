import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto, current_user: any): Promise<{
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
    findAll(current_user: any, search: any): Promise<{
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
    findOne(id: string, current_user: any): Promise<boolean | {
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
    update(id: string, updateUserDto: UpdateUserDto, current_user: any): Promise<{
        success: boolean;
        data: any;
    }>;
    remove(id: string, current_user: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
