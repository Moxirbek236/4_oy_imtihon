"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const client_1 = require("@prisma/client");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto, current_user) {
        const existingUserWithEmail = await this.prisma.user.findUnique({
            where: { email: createUserDto.email },
        });
        if (existingUserWithEmail) {
            throw new common_1.ConflictException('Bu elektron pochta bilan foydalanuvchi allaqachon mavjud');
        }
        const existingUserWithUsername = await this.prisma.user.findUnique({
            where: { username: createUserDto.username },
        });
        if (existingUserWithUsername) {
            throw new common_1.ConflictException('Bu foydalanuvchi nomi allaqachon band');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                username: createUserDto.username,
                passwordHash: hashedPassword,
                avatarUrl: createUserDto.avatarUrl || null,
                role: createUserDto.role,
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                avatarUrl: true,
                createdAt: true,
            },
        });
        return { success: true, data: user };
    }
    async findAll(current_user, search) {
        const where = {};
        if (search.username) {
            where.username = { contains: search.username, mode: 'insensitive' };
        }
        if (search.email) {
            where.email = { contains: search.email, mode: 'insensitive' };
        }
        if (search.role) {
            where.role = search.role;
        }
        const users = await this.prisma.user.findMany({
            where,
        });
        const usersAll = await this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                avatarUrl: true,
                createdAt: true,
                updatedAt: true,
            },
            where,
        });
        if (current_user.role == client_1.Role.ADMIN) {
            const users = usersAll.filter((user) => user.role == client_1.Role.USER);
            return users;
        }
        return { success: true, data: usersAll, total: usersAll.length };
    }
    async findOne(id, current_user) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                avatarUrl: true,
                createdAt: true,
                updatedAt: true,
                profiles: true,
                userSubscriptions: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan foydalanuvchi topilmadi`);
        }
        if (current_user.role == client_1.Role.ADMIN) {
            const users = user?.role == client_1.Role.USER;
            return users;
        }
        return { success: true, data: user };
    }
    async update(id, updateUserDto, current_user) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan foydalanuvchi topilmadi`);
        }
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existingEmail = await this.prisma.user.findUnique({
                where: { email: updateUserDto.email },
            });
            if (existingEmail) {
                throw new common_1.ConflictException('Bu elektron pochta bilan foydalanuvchi allaqachon mavjud');
            }
        }
        if (updateUserDto.username && updateUserDto.username !== user.username) {
            const existingUsername = await this.prisma.user.findUnique({
                where: { username: updateUserDto.username },
            });
            if (existingUsername) {
                throw new common_1.ConflictException('Bu foydalanuvchi nomi allaqachon band');
            }
        }
        let passwordHash = user.passwordHash;
        if (updateUserDto.password) {
            passwordHash = await bcrypt.hash(updateUserDto.password, 10);
        }
        let updatedUser;
        if (current_user.role == client_1.Role.ADMIN) {
            updatedUser = await this.prisma.user.update({
                where: { id, role: client_1.Role.USER },
                data: {
                    email: updateUserDto.email || user.email,
                    username: updateUserDto.username || user.username,
                    passwordHash,
                    avatarUrl: updateUserDto.avatarUrl !== undefined
                        ? updateUserDto.avatarUrl
                        : user.avatarUrl,
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,
                    avatarUrl: true,
                    updatedAt: true,
                },
            });
            return { success: true, data: updatedUser };
        }
        else {
            updatedUser = await this.prisma.user.update({
                where: { id },
                data: {
                    email: updateUserDto.email || user.email,
                    username: updateUserDto.username || user.username,
                    passwordHash,
                    avatarUrl: updateUserDto.avatarUrl !== undefined
                        ? updateUserDto.avatarUrl
                        : user.avatarUrl,
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,
                    avatarUrl: true,
                    updatedAt: true,
                },
            });
            return { success: true, data: updatedUser };
        }
    }
    async remove(id, current_user) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`ID: ${id} bo'lgan foydalanuvchi topilmadi`);
        }
        if (current_user.role == client_1.Role.ADMIN) {
            await this.prisma.user.delete({ where: { id, role: client_1.Role.USER } });
            return {
                success: true,
                message: "Foydalanuvchi muvaffaqiyatli o'chirildi",
            };
        }
        else {
            await this.prisma.user.delete({ where: { id } });
            return {
                success: true,
                message: "Foydalanuvchi muvaffaqiyatli o'chirildi",
            };
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map