import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Movie } from './entity/movie.entity';
import { MovieDetail } from './entity/movie-detail.entity';
import { User } from '../user/entities/user.entity';
import { Director } from '../director/entity/director.entity';
import { Genre } from '../genre/entity/genre.entity';
import { DataSource } from 'typeorm';
import { MovieUserLike } from './entity/movie-user-like.entity';

describe('MovieController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  let users: User[];
  let directors: Director[];
  let movies: Movie[];
  let genres: Genre[];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          // 클래스에 적혀있는 타입을 기반으로 바꿔라
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();

    dataSource = app.get<DataSource>(DataSource);

    const movieUserLikeRepository = dataSource.getRepository(MovieUserLike);
    const movieRepository = dataSource.getRepository(Movie);
    const movieDetailRepository = dataSource.getRepository(MovieDetail);
    const userRepository = dataSource.getRepository(User);
    const directorRepository = dataSource.getRepository(Director);
    const genreRepository = dataSource.getRepository(Genre);

    await movieUserLikeRepository.createQueryBuilder().delete().execute();
    await movieDetailRepository.createQueryBuilder().delete().execute();
    await movieRepository.createQueryBuilder().delete().execute();
    await genreRepository.createQueryBuilder().delete().execute();
    await directorRepository.createQueryBuilder().delete().execute();
    await userRepository.createQueryBuilder().delete().execute();

    users = [1, 2].map((x) =>
      userRepository.create({
        id: x,
        email: `${x}@test.com`,
        password: `123123`,
      }),
    );

    await userRepository.save(users);

    directors = [1, 2].map((x) =>
      directorRepository.create({
        id: x,
        dob: new Date('1992-11-23'),
        nationality: 'South Korea',
        name: `Director Name ${x}`,
      }),
    );

    await directorRepository.save(directors);

    genres = [1, 2].map((x) =>
      genreRepository.create({
        id: x,
        name: `Genre ${x}`,
      }),
    );

    await genreRepository.save(genres);

    movies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((x) =>
      movieRepository.create({
        id: x,
        title: `Movie ${x}`,
        creator: users[0],
        genres: genres,
        likeCount: 0,
        dislikeCount: 0,
        detail: movieDetailRepository.create({
          detail: `Movie Detail ${x}`,
        }),
        movieFilePath: 'movies/movie1.mp4',
        director: directors[0],
        createdAt: new Date(`2023-9-${x}`),
      }),
    );

    await movieRepository.save(movies);
  });

  describe('[GET /movie]', () => {
    it('should get all movies', async () => {
      const { body, statusCode, error } = await request(
        app.getHttpServer(),
      ).get('/movie');
      console.log(error);

      expect(statusCode).toBe(200);
    });
  });
});
