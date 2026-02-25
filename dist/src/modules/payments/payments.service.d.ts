import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class PaymentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPaymentDto: CreatePaymentDto): Promise<{
        success: boolean;
        data: {
            userSubscriptions: {
                users: {
                    username: string;
                    id: string;
                };
                subscriptionPlans: {
                    name: string;
                    id: string;
                    price: Prisma.Decimal;
                    durationDays: number;
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
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.PaymentStatus;
            userSubscriptionId: string;
            amount: Prisma.Decimal;
            paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
            paymentDetails: Prisma.JsonValue;
            externalTransactionId: string | null;
        };
    }>;
    findAll(): Promise<{
        success: boolean;
        data: ({
            userSubscriptions: {
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
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.PaymentStatus;
            userSubscriptionId: string;
            amount: Prisma.Decimal;
            paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
            paymentDetails: Prisma.JsonValue;
            externalTransactionId: string | null;
        })[];
        total: number;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            userSubscriptions: {
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
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.PaymentStatus;
            userSubscriptionId: string;
            amount: Prisma.Decimal;
            paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
            paymentDetails: Prisma.JsonValue;
            externalTransactionId: string | null;
        };
    }>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<{
        success: boolean;
        data: {
            userSubscriptions: {
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
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.PaymentStatus;
            userSubscriptionId: string;
            amount: Prisma.Decimal;
            paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
            paymentDetails: Prisma.JsonValue;
            externalTransactionId: string | null;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
