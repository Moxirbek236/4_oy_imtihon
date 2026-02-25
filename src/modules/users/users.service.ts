import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, current_user) {
    const existingUserWithEmail = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUserWithEmail) {
      throw new ConflictException(
        'Bu elektron pochta bilan foydalanuvchi allaqachon mavjud',
      );
    }

    const existingUserWithUsername = await this.prisma.user.findUnique({
      where: { username: createUserDto.username },
    });
    if (existingUserWithUsername) {
      throw new ConflictException('Bu foydalanuvchi nomi allaqachon band');
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
    const where: any = {};

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

    if (current_user.role == Role.ADMIN) {
      const users = usersAll.filter((user) => user.role == Role.USER);
      return users;
    }
    return { success: true, data: usersAll, total: usersAll.length };
  }

  async findOne(id: string, current_user) {
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
      throw new NotFoundException(`ID: ${id} bo'lgan foydalanuvchi topilmadi`);
    }

    if (current_user.role == Role.ADMIN) {
      const users = user?.role == Role.USER;
      return users;
    }

    return { success: true, data: user };
  }

  async update(id: string, updateUserDto: UpdateUserDto, current_user) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`ID: ${id} bo'lgan foydalanuvchi topilmadi`);
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });
      if (existingEmail) {
        throw new ConflictException(
          'Bu elektron pochta bilan foydalanuvchi allaqachon mavjud',
        );
      }
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUsername = await this.prisma.user.findUnique({
        where: { username: updateUserDto.username },
      });
      if (existingUsername) {
        throw new ConflictException('Bu foydalanuvchi nomi allaqachon band');
      }
    }

    let passwordHash = user.passwordHash;
    if (updateUserDto.password) {
      passwordHash = await bcrypt.hash(updateUserDto.password, 10);
    }

    let updatedUser;

    if (current_user.role == Role.ADMIN) {
      updatedUser = await this.prisma.user.update({
        where: { id, role: Role.USER },
        data: {
          email: updateUserDto.email || user.email,
          username: updateUserDto.username || user.username,
          passwordHash,
          avatarUrl:
            updateUserDto.avatarUrl !== undefined
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
    } else {
      updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          email: updateUserDto.email || user.email,
          username: updateUserDto.username || user.username,
          passwordHash,
          avatarUrl:
            updateUserDto.avatarUrl !== undefined
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

  async remove(id: string, current_user) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`ID: ${id} bo'lgan foydalanuvchi topilmadi`);
    }

    if (current_user.role == Role.ADMIN) {
      await this.prisma.user.delete({ where: { id, role: Role.USER } });

      return {
        success: true,
        message: "Foydalanuvchi muvaffaqiyatli o'chirildi",
      };
    } else {
      await this.prisma.user.delete({ where: { id } });

      return {
        success: true,
        message: "Foydalanuvchi muvaffaqiyatli o'chirildi",
      };
    }
  }
}
