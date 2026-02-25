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
                    username: string;
                    id: string;
                };
                subscriptionPlans: {
                    name: string;
                    id: string;
                    price: import("@prisma/client-runtime-utils").Decimal;
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
            amount: import("@prisma/client-runtime-utils").Decimal;
            paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
            paymentDetails: import("@prisma/client/runtime/client").JsonValue;
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
            amount: import("@prisma/client-runtime-utils").Decimal;
            paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
            paymentDetails: import("@prisma/client/runtime/client").JsonValue;
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
            amount: import("@prisma/client-runtime-utils").Decimal;
            paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
            paymentDetails: import("@prisma/client/runtime/client").JsonValue;
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
            amount: import("@prisma/client-runtime-utils").Decimal;
            paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
            paymentDetails: import("@prisma/client/runtime/client").JsonValue;
            externalTransactionId: string | null;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
