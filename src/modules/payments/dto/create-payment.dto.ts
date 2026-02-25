import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsUUID, IsDecimal, IsString, IsOptional, Min, IsEnum, IsNumber } from "class-validator";
import { PaymentStatus, PaymentMethod } from "@prisma/client";

export class CreatePaymentDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "Foydalanuvchining obunasining ID si",
  })
  @IsUUID()
  userSubscriptionId: string;

  @ApiProperty({
    example: 9.99,
    description: "To'lov summas",
  })
  @IsNumber()
  @Min(10000)
  amount: number;

  @ApiProperty({
    example: "card",
    description: "To'lov usuli",
    enum: ["card", "paypal", "bank_transfer", "crypto"],
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({
    example: "completed",
    description: "To'lov holati",
    enum: ["pending", "completed", "failed", "refunded"],
  })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiPropertyOptional({
    example: { cardLast4: "4242" },
    description: "To'lov tafsilotlari (JSON format)",
  })
  @IsOptional()
  paymentDetails?: object;

  @ApiPropertyOptional({
    example: "TXN123456789",
    description: "Tashqi tranzaktsiya ID si",
  })
  @IsOptional()
  @IsString()
  externalTransactionId?: string
}
