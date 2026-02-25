import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createReviewDto: CreateReviewDto) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: createReviewDto.movie_id },
    });
    if (!movie) {
      throw new NotFoundException(`ID: ${createReviewDto.movie_id} bo'lgan film topilmadi`);
    }

    const existingReview = await this.prisma.review.findFirst({
      where: {
        user_id: userId,
        movie_id: createReviewDto.movie_id,
      },
    });

    if (existingReview) {
      throw new BadRequestException('Siz bu filmga allaqachon sharh qoldirgan');
    }

    const review = await this.prisma.review.create({
      data: {
        user_id: userId,
        movie_id: createReviewDto.movie_id,
        rating: createReviewDto.rating,
        comment: createReviewDto.comment || null,
      },
      include: {
        users: { select: { id: true, username: true } },
        movies: { select: { id: true, title: true } },
      },
    });

    return { success: true, data: review };
  }

  async findAll(movieId: string) {
    const reviews = await this.prisma.review.findMany({
      where: { movie_id: movieId },
      include: {
        users: { select: { id: true, username: true } },
      },
    });

    if (reviews.length === 0) {
      throw new NotFoundException('Bu filmga hech qanday sharh yo\'q');
    }

    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    return {
      success: true,
      data: {
        reviews,
        average_rating: Math.round(averageRating * 10) / 10,
        count: reviews.length,
      },
    };
  }

  async findOne(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        users: { select: { id: true, username: true } },
        movies: { select: { id: true, title: true } },
      },
    });

    if (!review) {
      throw new NotFoundException(`ID: ${id} bo'lgan sharh topilmadi`);
    }

    return { success: true, data: review };
  }

  async update(id: string, userId: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) {
      throw new NotFoundException(`ID: ${id} bo'lgan sharh topilmadi`);
    }

    if (review.user_id !== userId) {
      throw new BadRequestException('Siz faqatgina o\'z sharhingizni tahrirlashingiz mumkin');
    }

    const updatedReview = await this.prisma.review.update({
      where: { id },
      data: {
        rating: updateReviewDto.rating || review.rating,
        comment: updateReviewDto.comment !== undefined ? updateReviewDto.comment : review.comment,
      },
      include: {
        users: { select: { id: true, username: true } },
        movies: { select: { id: true, title: true } },
      },
    });

    return { success: true, data: updatedReview };
  }

  async remove(id: string, userId: string) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) {
      throw new NotFoundException(`ID: ${id} bo'lgan sharh topilmadi`);
    }

    if (review.user_id !== userId) {
      throw new BadRequestException('Siz faqatgina o\'z sharhingizni o\'chira olasiz');
    }

    await this.prisma.review.delete({ where: { id } });
    return { success: true, message: 'Sharh muvaffaqiyatli o\'chirildi' };
  }
}
