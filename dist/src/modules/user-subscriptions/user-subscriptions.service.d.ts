import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserSubscriptionDto } from './dto/create-user-subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update-user-subscription.dto';
export declare class UserSubscriptionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserSubscriptionDto: CreateUserSubscriptionDto): Promise<{
        success: boolean;
        data: {
            users: {
                username: string;
                id: string;
            };
            subscriptionPlans: {
                name: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            user_id: string;
            plan_id: string;
            startDate: Date | null;
            endDate: Date | null;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
            autoRenew: boolean;
        };
    }>;
    findAll(current_user: any): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date | null;
            endDate: Date | null;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
            autoRenew: boolean;
        }[];
        success?: undefined;
        total?: undefined;
    } | {
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            users: {
                username: string;
                email: string;
                avatarUrl: string | null;
                id: string;
                createdAt: Date;
            };
            startDate: Date | null;
            endDate: Date | null;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
            autoRenew: boolean;
        }[];
        total: number;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            users: {
                username: string;
                id: string;
            };
            subscriptionPlans: {
                name: string;
                id: string;
            };
            payments: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import("@prisma/client").$Enums.PaymentStatus;
                userSubscriptionId: string;
                amount: import("@prisma/client-runtime-utils").Decimal;
                paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
                paymentDetails: import("@prisma/client/runtime/client").JsonValue;
                externalTransactionId: string | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            user_id: string;
            plan_id: string;
            startDate: Date | null;
            endDate: Date | null;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
            autoRenew: boolean;
        };
    }>;
    update(id: string, updateUserSubscriptionDto: UpdateUserSubscriptionDto): Promise<{
        success: boolean;
        data: {
            users: {
                username: string;
                id: string;
            };
            subscriptionPlans: {
                name: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            user_id: string;
            plan_id: string;
            startDate: Date | null;
            endDate: Date | null;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
            autoRenew: boolean;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
