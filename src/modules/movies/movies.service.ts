import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { SubscriptionType } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createMovieDto: CreateMovieDto,
    created_by: string,
    movi_url?,
    poster_url?,
  ) {
    const creator = await this.prisma.user.findUnique({
      where: { id: created_by },
    });
    if (!creator) {
      throw new NotFoundException(
        `ID: ${created_by} bo'lgan yaratuvchi topilmadi`,
      );
    }

    const existingSlug = await this.prisma.movie.findUnique({
      where: { slug: createMovieDto.slug },
    });
    if (existingSlug) {
      throw new ConflictException('Bu slug allaqachon band');
    }

    const reqCategory = await this.prisma.categories.findFirst({
      where: { slug: createMovieDto.category_slug },
    });

    if (!reqCategory) {
      throw new NotFoundException('Bunday category toplimadi');
    }

    let movie = await this.prisma.movie.create({
      data: {
        title: createMovieDto.title,
        slug: createMovieDto.slug,
        description: createMovieDto.description || null,
        releaseYear: createMovieDto.releaseYear,
        durationMinutes: createMovieDto.durationMinutes,
        posterUrl: poster_url || null,
        rating: createMovieDto.rating || null,
        subscriptionType:
          (createMovieDto.subscriptionType as SubscriptionType) ||
          SubscriptionType.free,
        viewCount: 0,
        created_by: created_by,
      },
      select: {
        id: true,
        creators: { select: { id: true, username: true } },
        createdAt: true,
        description: true,
        durationMinutes: true,
        created_by: true,
        viewCount: true,
        releaseYear: true,
        rating: true,
        title: true,
        slug: true,
      },
    });

    if (movie) {
      const category = await this.prisma.movieCategories.create({
        data: {
          category_id: reqCategory.id,
          movie_id: movie.id,
          createdAt: new Date(),
        },
        select: { categories: true },
      });
      if (!category) {
        throw new BadRequestException(
          "Nimadir Xato ketdi, categoriya bilan bo'g'lanib bo'lmadi",
        );
      }

      const movieFile = await this.prisma.movieFile.create({
        data: {
          fileUrl: movi_url,
          quality: createMovieDto.quality,
          language: createMovieDto.language || 'uz',
          movie_id: movie.id,
        },
      });
      if (!movieFile) {
        throw new BadRequestException('Videoni yuklashda xatolik chiqdi.');
      }

      movie['movief_file'] = movieFile;
      return { success: true, data: movie };
    } else {
      throw new BadRequestException('Nimadir xat ketdi, Movie yaratilmadi');
    }
  }

  async findAll(
    subscriptionType?: string,
    search?: string,
    categoryId?: string,
    page: number = 1,
    limit: number = 20,
  ) {
    if (isNaN(limit)) {
      limit = 20;
      page = 1;
    }
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};

    if (subscriptionType) {
      where.subscriptionType = subscriptionType as SubscriptionType;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.movieCategories = {
        some: {
          category_id: categoryId,
        },
      };
    }

    const movies = await this.prisma.movie.findMany({
      include: {
        creators: { select: { id: true, username: true } },
        movieCategories: { include: { categories: true } },
      },
      skip,
      take: limit,
    });

    const total = await this.prisma.movie.count({ where });

    return {
      success: true,
      data: {
        movies,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    };
  }

  async findLimited(
    user_id: object,
    search?: string,
    categoryId?: string,
    page: number = 1,
    limit: number = 20,
  ) {
    if (isNaN(limit)) {
      limit = 20;
      page = 1;
    }
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.movieCategories = {
        some: {
          category_id: categoryId,
        },
      };
    }

    const movies = await this.prisma.movie.findMany({
      where,
      skip,
      take: limit,
    });

    const total = await this.prisma.movie.count({ where });
    return {
      success: true,
      data: {
        movies,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    };
  }

  async findOne(idOrSlug: string, user_id) {
    const subscriptionType = await this.prisma.userSubscription.findFirst({
      where: { user_id },
      select: { subscriptionPlans: { select: { name: true } } },
    });

    let plan = subscriptionType?.subscriptionPlans.name;

    let movie;

    if (plan) {
      if (plan == 'free') {
        movie = await this.prisma.movie.findFirst({
          where: { subscriptionType: 'free' },
          select: {
            created_by: true,
            createdAt: true,
            creators: true,
            description: true,
            durationMinutes: true,
            movieFiles: true,
            rating: true,
            releaseYear: true,
            slug: true,
            title: true,
            viewCount: true,
            id: true,
            posterUrl: true,
            reviews: true,
          },
        });
      } else {
        const sub = await this.prisma.userSubscription.findFirst({
          where: { user_id: user_id },
        });

        const pay = await this.prisma.payment.findFirst({
          where: { userSubscriptionId: sub!.id },
        });

        const now = new Date();
        const end = sub?.endDate;
        if (end) {
          if (now == end || now > end) {
            throw new BadRequestException("To'lov muddatingiz tugadi");
          }
        }

        movie = await this.prisma.movie.findFirst();
      }

      if (!movie) {
        throw new NotFoundException(
          `ID/Slug: ${idOrSlug} bo'lgan film topilmadi`,
        );
      }

      await this.prisma.movie.update({
        where: { id: movie.id },
        data: { viewCount: { increment: 1 } },
      });

      const existHistory = await this.prisma.watchHistory.findFirst({
        where: { movie_id: movie.id },
      });

      if (!existHistory) {
        await this.prisma.watchHistory.create({
          data: {
            watchedDuration: 99,
            watchedPercentage: 99,
            movie_id: movie.id,
            lastWatched: new Date(),
            user_id: user_id,
          },
        });
      } else {
        await this.prisma.watchHistory.update({
          where: {
            movie_id: movie.id,
            user_id: user_id,
            id: existHistory.id,
          },
          data: {
            lastWatched: new Date(),
          },
        });
      }
      const averageRating =
        movie.reviews.length > 0
          ? movie.reviews.reduce((sum, r) => sum + r.rating, 0) /
            movie.reviews.length
          : 0;

      return {
        success: true,
        data: {
          ...movie,
          reviews: {
            average_rating: Math.round(averageRating * 10) / 10,
            count: movie.reviews.length,
          },
        },
      };
    }
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
    movie_url,
    post_url,
  ) {
    const movie = await this.prisma.movie.findUnique({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`ID: ${id} bo'lgan film topilmadi`);
    }

    if (updateMovieDto.slug && updateMovieDto.slug !== movie.slug) {
      const existingSlug = await this.prisma.movie.findUnique({
        where: { slug: updateMovieDto.slug },
      });
      if (existingSlug) {
        throw new ConflictException('Bu slug allaqachon band');
      }
    }

    const updatedMovie = await this.prisma.movie.update({
      where: { id },
      data: {
        title: updateMovieDto.title || movie.title,
        slug: updateMovieDto.slug || movie.slug,
        description:
          updateMovieDto.description !== undefined
            ? updateMovieDto.description
            : movie.description,
        releaseYear: updateMovieDto.releaseYear || movie.releaseYear,
        durationMinutes:
          updateMovieDto.durationMinutes || movie.durationMinutes,
        posterUrl: post_url,
        rating:
          updateMovieDto.rating !== undefined
            ? updateMovieDto.rating
            : movie.rating,
        subscriptionType: updateMovieDto.subscriptionType
          ? (updateMovieDto.subscriptionType as SubscriptionType)
          : movie.subscriptionType,
      },
      include: { creators: { select: { id: true, username: true } } },
    });

    return { success: true, data: updatedMovie };
  }

  async remove(id: string) {
    const movie = await this.prisma.movie.findUnique({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`ID: ${id} bo'lgan film topilmadi`);
    }

    await this.prisma.movie.delete({ where: { id } });
    return { success: true, message: "Film muvaffaqiyatli o'chirildi" };
  }
}
