import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
  Req,
  UploadedFiles,
  BadRequestException,
  Put,
  NotFoundException,
  StreamableFile,
  Res,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Role, SubscriptionType } from '@prisma/client';
import { extname } from 'path';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import type { Response } from 'express';

@ApiTags('Movies')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'poster', maxCount: 1 },
        { name: 'movie', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      },
    ),
  )
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}` })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        slug: { type: 'string' },
        releaseYear: { type: 'number' },
        description: { type: 'string' },
        durationMinutes: { type: 'number' },
        subscriptionType: {
          type: 'string',
          enum: Object.values(SubscriptionType),
        },
        category_slug: { type: 'string' },
        quality: { type: 'string' },
        language: { type: 'string' },
        poster: { type: 'string', format: 'binary' },
        movie: { type: 'string', format: 'binary' },
      },
    },
  })
  create(
    @Req() req: Request,
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFiles()
    files: {
      poster?: Express.Multer.File[];
      movie: Express.Multer.File[];
    },
  ) {
    const posterFile = files.poster?.[0];
    const movieFile = files.movie[0];
    movieFile?.path;

    const posterUrl = posterFile ? `/uploads/${posterFile.filename}` : null;

    if (!movieFile) {
      throw new BadRequestException('Movie file majburiy');
    }

    return this.moviesService.create(
      createMovieDto,
      req['user'].id,
      movieFile?.path,
      posterFile?.path,
    );
  }

  @Get('admin')
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}, ${Role.USER}` })
  @ApiQuery({
    name: 'subscriptionType',
    required: false,
    enum: ['free', 'premium'],
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: "Film nomi yoki tavsifi bo'yicha qidirish",
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: "Kategoriya bo'yicha filtrlash",
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Barcha filmlar' })
  findAll(
    @Query('subscriptionType') subscriptionType?: string,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.moviesService.findAll(
      subscriptionType,
      search,
      categoryId,
      page,
      limit,
    );
  }

  @Get(':id/watch')
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  @ApiOperation({ summary: 'Movie watch (stream)' })
  @ApiResponse({ status: 200, description: 'Stream movie' })
  async watchMovie(
    @Param('id') id: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const movie = await this.moviesService.getMovieForAccess(
      id,
      req['user'].id,
    );

    const filePath = movie.movieFiles[0].fileUrl;
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Fayl topilmadi');
    }

    const file = fs.createReadStream(filePath);

    res.set({
      'Content-Type': 'video/mp4',
      'Content-Disposition': 'inline',
    });

    return new StreamableFile(file);
  }

  @Get(':id/download')
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  @ApiOperation({ summary: 'Movie download' })
  @ApiResponse({ status: 200, description: 'Download movie' })
  async downloadMovie(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const movie = await this.moviesService.getMovieForAccess(
      id,
      req['user'].id,
    );

    const filePath = movie.movieFiles[0].fileUrl;

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Fayl topilmadi');
    }

    return res.download(filePath);
  }
  @Get('user')
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}, ${Role.USER}` })
  @ApiQuery({
    name: 'search',
    required: false,
    description: "Film nomi yoki tavsifi bo'yicha qidirish",
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: "Kategoriya bo'yicha filtrlash",
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Barcha filmlar' })
  findLimited(
    @Req() req: Request,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.moviesService.findLimited(
      req['user'].id,
      search,
      categoryId,
      Number(page),
      Number(limit),
    );
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN, Role.USER)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}, ${Role.USER}` })
  @ApiResponse({ status: 200, description: 'Film tafsiloti' })
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.moviesService.findOne(id, req['user'].id);
  }

  @Put()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'poster', maxCount: 1 },
        { name: 'movie', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      },
    ),
  )
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}` })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        slug: { type: 'string' },
        releaseYear: { type: 'number' },
        description: { type: 'string' },
        durationMinutes: { type: 'number' },
        subscriptionType: { type: 'string' },
        category_slug: { type: 'string' },
        quality: { type: 'string' },
        language: { type: 'string' },
        poster: { type: 'string', format: 'binary' },
        movie: { type: 'string', format: 'binary' },
      },
    },
  })
  update(
    @Req() req: Request,
    @Body() updateMovieDto: UpdateMovieDto,
    @UploadedFiles()
    files: {
      poster?: Express.Multer.File[];
      movie: Express.Multer.File[];
    },
  ) {
    const posterFile = files.poster?.[0];
    const movieFile = files.movie[0];
    movieFile?.path;

    const posterUrl = posterFile ? `/uploads/${posterFile.filename}` : null;

    if (!movieFile) {
      throw new BadRequestException('Movie file majburiy');
    }

    return this.moviesService.update(
      req['user'].id,
      updateMovieDto,
      movieFile?.path,
      posterFile?.path,
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @ApiOperation({ summary: `${Role.ADMIN}, ${Role.SUPERADMIN}` })
  @ApiResponse({ status: 200, description: "Film muvaffaqiyatli o'chirildi" })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
