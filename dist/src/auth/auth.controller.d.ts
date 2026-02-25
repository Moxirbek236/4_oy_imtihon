import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
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
    login(loginDto: LoginDto): Promise<{
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
    status(req: Request): Promise<{
        succes: boolean;
        message: string;
    } | undefined>;
}
