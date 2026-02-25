import { Injectable, NotFoundException, ConflictException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { UpdateFavoriteDto } from "./dto/update-favorite.dto";

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createFavoriteDto.user_id },
    });
    if (!user) {
      throw new NotFoundException(`ID: ${createFavoriteDto.user_id} bo'lgan foydalanuvchi topilmadi`);
    }

    const movie = await this.prisma.movie.findUnique({
      where: { id: createFavoriteDto.movie_id },
    });
    if (!movie) {
      throw new NotFoundException(`ID: ${createFavoriteDto.movie_id} bo'lgan film topilmadi`);
    }

    const existingFavorite = await this.prisma.favorites.findFirst({
      where: {
        user_id: createFavoriteDto.user_id,
        movie_id: createFavoriteDto.movie_id,
      },
    });
    if (existingFavorite) {
      throw new ConflictException("Bu film allaqachon sevimli ro'yxatda mavjud");
    }

    const favorite = await this.prisma.favorites.create({
      data: {
        user_id: createFavoriteDto.user_id,
        movie_id: createFavoriteDto.movie_id,
      },
      include: {
        users: { select: { id: true, username: true } },
        movies: { select: { id: true, title: true, slug: true } },
      },
    });

    return { success: true, data: favorite };
  }

  async findAll() {
    const favorites = await this.prisma.favorites.findMany({
      include: {
        users: { select: { id: true, username: true } },
        movies: { select: { id: true, title: true, slug: true } },
      },
    });
    return { success: true, data: favorites, total: favorites.length };
  }

  async findOne(id: string) {
    const favorite = await this.prisma.favorites.findUnique({
      where: { id },
      include: {
        users: { select: { id: true, username: true } },
        movies: { select: { id: true, title: true, slug: true } },
      },
    });

    if (!favorite) {
      throw new NotFoundException(`ID: ${id} bo'lgan sevimli film topilmadi`);
    }

    return { success: true, data: favorite };
  }

  async remove(id: string) {
    const favorite = await this.prisma.favorites.findUnique({ where: { id } });
    if (!favorite) {
      throw new NotFoundException(`ID: ${id} bo'lgan sevimli film topilmadi`);
    }

    await this.prisma.favorites.delete({ where: { id } });
    return { success: true, message: "Sevimli film muvaffaqiyatli o'chirildi" };
  }
}
