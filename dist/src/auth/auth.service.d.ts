import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(email: string, username: string, password: string): Promise<{
        success: boolean;
        data: {
            access_token: string;
            user: {
                username: string;
                email: string;
                role: import("@prisma/client").$Enums.Role;
                id: string;
            };
            subscrioption: {
                subscriptionId: string | undefined;
                expiredAt: number;
            };
        };
    }>;
    login(email: string, password: string): Promise<{
        success: boolean;
        data: {
            access_token: string;
            user: {
                id: string;
                email: string;
                username: string;
                role: import("@prisma/client").$Enums.Role;
                subscription: {
                    id: string;
                    createdAt: Date;
                    startDate: Date | null;
                    endDate: Date | null;
                    status: import("@prisma/client").$Enums.SubscriptionStatus;
                    autoRenew: boolean;
                    subscriptionPlans: {
                        name: string;
                    };
                } | null;
            };
        };
    }>;
    status(user: any): Promise<{
        succes: boolean;
        message: string;
    } | undefined>;
}
