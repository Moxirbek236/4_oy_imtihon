import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const movie = await this.prisma.movie.findUnique({
      where: { slug: createCategoryDto.slug },
    });
    if (movie) {
      throw new BadRequestException(`Bu slug avval qo'shilgan`);
    }

    const category = await this.prisma.categories.create({
      data: {
        slug: createCategoryDto.slug,
        name: createCategoryDto.name,
        description: createCategoryDto.description,
      },
    });

    return { success: true, data: category };
  }

  async findAll() {
    const previews = await this.prisma.categories.findMany();

    return { success: true, data: previews, total: previews.length };
  }

  async findOne(id: string) {
    const preview = await this.prisma.categories.findUnique({
      where: { id },
    });

    if (!preview) {
      throw new NotFoundException(`ID: ${id} bo'lgan category topilmadi`);
    }

    return { success: true, data: preview };
  }

  async update(id: string, updatePreviewDto: UpdateCategoryDto) {
    const preview = await this.prisma.movieFile.findUnique({
      where: { id },
    });
    if (!preview) {
      throw new NotFoundException(`ID: ${id} bo'lgan preview topilmadi`);
    }

    const updatedPreview = await this.prisma.categories.update({
      where: { id },
      data: {
        createdAt: new Date(),
        name: updatePreviewDto.name,
        slug: updatePreviewDto.slug,
        description: updatePreviewDto.description,
      },
    });

    return { success: true, data: updatedPreview };
  }

  async remove(id: string) {
    // Check preview exists
    const preview = await this.prisma.movieFile.findUnique({
      where: { id },
    });
    if (!preview) {
      throw new NotFoundException(`ID: ${id} bo'lgan preview topilmadi`);
    }

    const deletedPreview = await this.prisma.movieFile.delete({
      where: { id },
    });

    return { success: true, data: deletedPreview };
  }
}
