import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER, CacheModule, Cache } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieDetail } from './entity/movie-detail.entity';
import { Director } from '../director/entity/director.entity';
import { Genre } from '../genre/entity/genre.entity';
import { MovieUserLike } from './entity/movie-user-like.entity';
import { Movie } from './entity/movie.entity';
import { User } from '../user/entities/user.entity';
import { MovieService } from './movie.service';
import { CommonService } from '../common/common.service';
import { DataSource } from 'typeorm';

describe('MovieService - Integration Test', () => {
  let service: MovieService;
  let cacheManager: Cache;
  let dataSource: DataSource;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register(),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [Movie, MovieDetail, Director, Genre, User, MovieUserLike],
          synchronize: true,
          logging: false,
        }),
        TypeOrmModule.forFeature([
          Movie,
          MovieDetail,
          Director,
          Genre,
          User,
          MovieUserLike,
        ]),
      ],
      providers: [MovieService, CommonService],
    }).compile();

    service = module.get<MovieService>(MovieService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
