import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfilesController {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    myProfile(req: Request): Promise<{
        status: number;
        success: boolean;
        data: {
            id: string;
            user_id: string;
            fullName: string;
            phone: string | null;
            country: string;
            createdAt: Date;
            updatedAt: Date;
            users: {
                id: string;
                createdAt: Date;
                email: string;
                role: import("@prisma/client").$Enums.Role;
                avatarUrl: string | null;
                userSubscriptions: {
                    id: string;
                    createdAt: Date;
                    endDate: Date | null;
                    autoRenew: boolean;
                    subscriptionPlans: {
                        id: string;
                        name: string;
                        price: import("@prisma/client-runtime-utils").Decimal;
                        features: import("@prisma/client/runtime/client").JsonValue;
                        isActive: boolean;
                    };
                    payments: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        status: import("@prisma/client").$Enums.PaymentStatus;
                        amount: import("@prisma/client-runtime-utils").Decimal;
                        paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
                        paymentDetails: import("@prisma/client/runtime/client").JsonValue;
                        externalTransactionId: string | null;
                    }[];
                }[];
                movies: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    reviews: {
                        id: string;
                        user_id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        movie_id: string;
                        rating: number;
                        comment: string | null;
                    }[];
                    rating: import("@prisma/client-runtime-utils").Decimal | null;
                    created_by: string;
                    title: string;
                    slug: string;
                    description: string | null;
                    releaseYear: number;
                    durationMinutes: number;
                    posterUrl: string | null;
                    subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
                    movieCategories: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        movie_id: string;
                        category_id: string;
                    }[];
                    movieFiles: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        movie_id: string;
                        fileUrl: string;
                        quality: string;
                        language: string;
                    }[];
                    creators: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        username: string;
                        email: string;
                        passwordHash: string;
                        role: import("@prisma/client").$Enums.Role;
                        avatarUrl: string | null;
                    };
                }[];
                favorites: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    movie_id: string;
                }[];
                reviews: {
                    id: string;
                    createdAt: Date;
                    movie_id: string;
                    rating: number;
                    comment: string | null;
                }[];
                watchHistorys: {
                    id: string;
                    movie_id: string;
                    watchedDuration: number;
                    watchedPercentage: import("@prisma/client-runtime-utils").Decimal;
                    lastWatched: Date;
                }[];
            };
        } | null;
    }>;
    update(req: Request, updateProfileDto: UpdateProfileDto, file?: Express.Multer.File): Promise<{
        success: boolean;
        data: {
            users: {
                id: string;
                username: string;
                email: string;
            };
        } & {
            id: string;
            user_id: string;
            fullName: string;
            phone: string | null;
            country: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    remove(req: Request): Promise<{
        success: boolean;
        message: string;
    }>;
}
