import { PrismaService } from 'src/prisma/prisma.service';
export declare class Utils {
    private readonly prisma;
    constructor(prisma: PrismaService);
    check_expired(user_id: any): Promise<boolean>;
}
