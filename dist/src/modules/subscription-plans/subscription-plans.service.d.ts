import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { CreateSubscriptionPlanDto } from "./dto/create-subscription-plan.dto";
import { UpdateSubscriptionPlanDto } from "./dto/update-subscription-plan.dto";
export declare class SubscriptionPlansService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createSubscriptionPlanDto: CreateSubscriptionPlanDto): Promise<{
        success: boolean;
        data: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: Prisma.Decimal;
            durationDays: number;
            features: Prisma.JsonValue;
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
            price: Prisma.Decimal;
            durationDays: number;
            features: Prisma.JsonValue;
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
            price: Prisma.Decimal;
            durationDays: number;
            features: Prisma.JsonValue;
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
            price: Prisma.Decimal;
            durationDays: number;
            features: Prisma.JsonValue;
            isActive: boolean;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
