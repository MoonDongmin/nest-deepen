import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Public } from '../auth/decorator/public.decorator';
import { RBAC } from 'src/auth/decorator/rbac.decorator';
import { GetMoviesDto } from './dto/get-movies.dto';
import { TransactionInterceptor } from '../common/interceptor/transaction.interceptor';
import { UserId } from '../user/decorator/user-id.decorator';
import { QueryRunner } from '../common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import {
  CacheInterceptor as CI,
  CacheKey,
  CacheTTL,
} from '@nestjs/cache-manager';
import { Throttle } from '../common/decorator/throttle.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from '@prisma/client';

@Controller('movie')
@ApiBearerAuth()
// @UseInterceptors(ClassSerializerInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @Public()
  @Throttle({
    count: 5,
    unit: 'minute',
  })
  @ApiOperation({
    description: '[Movie]를 Pagination하는 API',
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 Pagination API 실행',
  })
  // @Version('5')
  getMovies(@Query() dto: GetMoviesDto, @UserId() userId?: number) {
    return this.movieService.findAll(dto, userId);
  }

  @Get('recent')
  @UseInterceptors(CI)
  @CacheKey('getMoviesRecent')
  @CacheTTL(1000)
  getMoviesRecent() {
    return this.movieService.findRecent();
  }

  @Get(':id')
  @Public()
  getMovie(
    @Param(
      'id',
      // new ParseIntPipe({
      //   exceptionFactory(error) {
      //     throw new BadRequestException(`숫자를 입력해주세요!`);
      //   },
      // }),
    )
    id: string,
    @Req() request: any,
  ) {
    const session = request.session;

    const movieCount = session.movieCount ?? {};

    request.session.movieCount = {
      ...movieCount,
      [id]: movieCount[id] ? movieCount[id] + 1 : 1,
    };

    console.log(session);
    return this.movieService.findOne(id);
  }

  @Post()
  @RBAC(Role.admin)
  // @UseInterceptors(TransactionInterceptor)
  postMovie(
    @Body() body: CreateMovieDto,
    // @QueryRunner() queryRunner: QR,
    @UserId() userId: number,
  ) {
    return this.movieService.create(body, userId);
  }

  @Patch(':id')
  @RBAC(Role.admin)
  patchMovie(@Param('id') id: string, @Body() body: UpdateMovieDto) {
    return this.movieService.update(id, body);
  }

  @Delete(':id')
  @RBAC(Role.admin)
  deleteMovie(@Param('id') id: string) {
    return this.movieService.remove(id);
  }

  /**
   * [Like] [Dislike]
   *
   * 아무것도 누르지 않은 상태
   * Like & Dislike 모두 버튼 꺼져있음
   *
   * Like 버튼 누르면 불 켜짐
   * Like 버튼 다시 누르면 불 꺼짐
   *
   * Dislike 버튼 누르면 불 켜짐
   * Dislike 버튼 다시 누르면 불 꺼짐
   *
   * Like 버튼 누름 -> Like 버튼 불 켜짐 -> Dislike 버튼 누름 -> Like 버튼 불 꺼지고 Dislike 불 켜짐
   */
  @Post(':id/like')
  createMovieLike(@Param('id') movieId: string, @UserId() userId: string) {
    return this.movieService.toggleMovieLike(movieId, userId, true);
  }

  @Post(':id/dislike')
  createMovieDislike(@Param('id') movieId: string, @UserId() userId: string) {
    return this.movieService.toggleMovieLike(movieId, userId, false);
  }
}
