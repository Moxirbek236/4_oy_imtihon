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
            createdAt: Date;
            updatedAt: Date;
            users: {
                favorites: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    movie_id: string;
                }[];
                email: string;
                role: import("@prisma/client").$Enums.Role;
                avatarUrl: string | null;
                id: string;
                createdAt: Date;
                userSubscriptions: {
                    id: string;
                    createdAt: Date;
                    endDate: Date | null;
                    autoRenew: boolean;
                    subscriptionPlans: {
                        name: string;
                        id: string;
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
                    movieCategories: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        movie_id: string;
                        category_id: string;
                    }[];
                    description: string | null;
                    title: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    reviews: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        user_id: string;
                        movie_id: string;
                        rating: number;
                        comment: string | null;
                    }[];
                    rating: import("@prisma/client-runtime-utils").Decimal | null;
                    created_by: string;
                    slug: string;
                    releaseYear: number;
                    durationMinutes: number;
                    posterUrl: string | null;
                    subscriptionType: import("@prisma/client").$Enums.SubscriptionType;
                    movieFiles: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        movie_id: string;
                        quality: string;
                        language: string;
                        fileUrl: string;
                    }[];
                    creators: {
                        username: string;
                        email: string;
                        role: import("@prisma/client").$Enums.Role;
                        avatarUrl: string | null;
                        id: string;
                        passwordHash: string;
                        createdAt: Date;
                        updatedAt: Date;
                    };
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
            user_id: string;
            fullName: string;
            phone: string | null;
            country: string;
        } | null;
    }>;
    update(req: Request, updateProfileDto: UpdateProfileDto, file?: Express.Multer.File): Promise<{
        success: boolean;
        data: {
            users: {
                username: string;
                email: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            user_id: string;
            fullName: string;
            phone: string | null;
            country: string;
        };
    }>;
    remove(req: Request): Promise<{
        success: boolean;
        message: string;
    }>;
}
