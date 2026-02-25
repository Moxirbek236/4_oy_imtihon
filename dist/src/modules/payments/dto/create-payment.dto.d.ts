import { PaymentStatus, PaymentMethod } from "@prisma/client";
export declare class CreatePaymentDto {
    userSubscriptionId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
    paymentDetails?: object;
    externalTransactionId?: string;
}
