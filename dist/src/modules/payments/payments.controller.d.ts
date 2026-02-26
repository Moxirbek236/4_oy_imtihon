import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(createPaymentDto: CreatePaymentDto): Promise<{
        success: boolean;
        data: {
            userSubscriptions: {
                users: {
                    id: string;
                    username: string;
                };
                subscriptionPlans: {
                    id: string;
                    name: string;
                    price: import("@prisma/client-runtime-utils").Decimal;
                    durationDays: number;
                };
            } & {
                id: string;
                status: import("@prisma/client").$Enums.SubscriptionStatus;
                createdAt: Date;
                updatedAt: Date;
                user_id: string;
                plan_id: string;
                startDate: Date | null;
                endDate: Date | null;
                autoRenew: boolean;
            };
        } & {
            id: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
            paymentDetails: import("@prisma/client/runtime/client").JsonValue;
            status: import("@prisma/client").$Enums.PaymentStatus;
            externalTransactionId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userSubscriptionId: string;
        };
    }>;
    findAll(): Promise<{
        success: boolean;
        data: ({
            userSubscriptions: {
                users: {
                    id: string;
                    username: string;
                };
                subscriptionPlans: {
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                status: import("@prisma/client").$Enums.SubscriptionStatus;
                createdAt: Date;
                updatedAt: Date;
                user_id: string;
                plan_id: string;
                startDate: Date | null;
                endDate: Date | null;
                autoRenew: boolean;
            };
        } & {
            id: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
            paymentDetails: import("@prisma/client/runtime/client").JsonValue;
            status: import("@prisma/client").$Enums.PaymentStatus;
            externalTransactionId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userSubscriptionId: string;
        })[];
        total: number;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            userSubscriptions: {
                users: {
                    id: string;
                    username: string;
                };
                subscriptionPlans: {
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                status: import("@prisma/client").$Enums.SubscriptionStatus;
                createdAt: Date;
                updatedAt: Date;
                user_id: string;
                plan_id: string;
                startDate: Date | null;
                endDate: Date | null;
                autoRenew: boolean;
            };
        } & {
            id: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
            paymentDetails: import("@prisma/client/runtime/client").JsonValue;
            status: import("@prisma/client").$Enums.PaymentStatus;
            externalTransactionId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userSubscriptionId: string;
        };
    }>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<{
        success: boolean;
        data: {
            userSubscriptions: {
                users: {
                    id: string;
                    username: string;
                };
                subscriptionPlans: {
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                status: import("@prisma/client").$Enums.SubscriptionStatus;
                createdAt: Date;
                updatedAt: Date;
                user_id: string;
                plan_id: string;
                startDate: Date | null;
                endDate: Date | null;
                autoRenew: boolean;
            };
        } & {
            id: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
            paymentDetails: import("@prisma/client/runtime/client").JsonValue;
            status: import("@prisma/client").$Enums.PaymentStatus;
            externalTransactionId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userSubscriptionId: string;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
