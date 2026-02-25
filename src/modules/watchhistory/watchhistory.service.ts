import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateWatchhistoryDto } from './dto/update-watchhistory.dto';
import { CreateWatchHistoryDto } from './dto/create-watchhistory.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class WatchhistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWatchhistoryDto: CreateWatchHistoryDto) {
    return await this.prisma.watchHistory.create({
      data: {
        user_id: createWatchhistoryDto.user_id,
        movie_id: createWatchhistoryDto.movie_id,
        watchedDuration: createWatchhistoryDto.watchedDuration,
        watchedPercentage: new Prisma.Decimal(
          createWatchhistoryDto.watchedPercentage,
        ),
        lastWatched: createWatchhistoryDto.lastWatched ?? new Date(),
      },
      include: {
        users: true,
        movies: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.watchHistory.findMany({
      include: {
        users: true,
        movies: true,
      },
      orderBy: {
        lastWatched: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const watchHistory = await this.prisma.watchHistory.findUnique({
      where: { id },
      include: {
        users: true,
        movies: true,
      },
    });

    if (!watchHistory) {
      throw new NotFoundException('WatchHistory topilmadi');
    }

    return watchHistory;
  }

  async update(id: string, updateWatchhistoryDto: UpdateWatchhistoryDto) {
    await this.findOne(id);

    return await this.prisma.watchHistory.update({
      where: { id },
      data: {
        ...updateWatchhistoryDto
      },
      include: {
        users: true,
        movies: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.prisma.watchHistory.delete({
      where: { id },
    });
  }
}