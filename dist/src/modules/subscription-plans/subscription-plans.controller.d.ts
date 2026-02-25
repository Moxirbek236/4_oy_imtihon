import { SubscriptionPlansService } from "./subscription-plans.service";
import { CreateSubscriptionPlanDto } from "./dto/create-subscription-plan.dto";
import { UpdateSubscriptionPlanDto } from "./dto/update-subscription-plan.dto";
export declare class SubscriptionPlansController {
    private readonly subscriptionPlansService;
    constructor(subscriptionPlansService: SubscriptionPlansService);
    create(createSubscriptionPlanDto: CreateSubscriptionPlanDto): Promise<{
        success: boolean;
        data: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client-runtime-utils").Decimal;
            durationDays: number;
            features: import("@prisma/client/runtime/client").JsonValue;
            isActive: boolean;
        };
    }>;
    findAll(): Promise<{
        success: boolean;
        data: ({
            userSubscriptions: {
                id: string;
            }[];
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client-runtime-utils").Decimal;
            durationDays: number;
            features: import("@prisma/client/runtime/client").JsonValue;
            isActive: boolean;
        })[];
        total: number;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
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
        } & {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client-runtime-utils").Decimal;
            durationDays: number;
            features: import("@prisma/client/runtime/client").JsonValue;
            isActive: boolean;
        };
    }>;
    update(id: string, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto): Promise<{
        success: boolean;
        data: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client-runtime-utils").Decimal;
            durationDays: number;
            features: import("@prisma/client/runtime/client").JsonValue;
            isActive: boolean;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
