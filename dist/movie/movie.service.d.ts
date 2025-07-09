import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { MovieDetail } from './entity/movie-detail.entity';
import { Director } from '../director/entity/director.entity';
import { Genre } from '../genre/entity/genre.entity';
import { GetMoviesDto } from './dto/get-movies.dto';
import { CommonService } from '../common/common.service';
import { User } from '../user/entities/user.entity';
import { MovieUserLike } from './entity/movie-user-like.entity';
import { Cache } from '@nestjs/cache-manager';
export declare class MovieService {
    private readonly movieRepository;
    private readonly movieDetailRepository;
    private readonly directorRepository;
    private readonly genreRepository;
    private readonly userRepository;
    private readonly movieUserLikeRepository;
    private readonly dataSource;
    private readonly commonService;
    private readonly cacheManager;
    constructor(movieRepository: Repository<Movie>, movieDetailRepository: Repository<MovieDetail>, directorRepository: Repository<Director>, genreRepository: Repository<Genre>, userRepository: Repository<User>, movieUserLikeRepository: Repository<MovieUserLike>, dataSource: DataSource, commonService: CommonService, cacheManager: Cache);
    findRecent(): Promise<unknown>;
    getMovies(): Promise<import("typeorm").SelectQueryBuilder<Movie>>;
    getLikedMovies(movieIds: number[], userId: number): Promise<MovieUserLike[]>;
    findAll(dto: GetMoviesDto, userId?: number): Promise<{
        data: Movie[];
        nextCursor: string;
        count: number;
    }>;
    findMovieDetail(id: number): Promise<Movie>;
    findOne(id: number): Promise<Movie>;
    createMovieDetail(qr: QueryRunner, createMovieDto: CreateMovieDto): Promise<import("typeorm").InsertResult>;
    createMovie(qr: QueryRunner, createMovieDto: CreateMovieDto, director: Director, movieDetailId: number, userId: number, movieFolder: string): Promise<import("typeorm").InsertResult>;
    createMovieGenreRelation(qr: QueryRunner, movieId: number, genres: Genre[]): Promise<void>;
    renameMovieFile(tempFolder: string, movieFolder: string, createMovieDto: CreateMovieDto): Promise<void>;
    create(createMovieDto: CreateMovieDto, userId: number, qr: QueryRunner): Promise<Movie>;
    updateMovie(qr: QueryRunner, movieUpdateFields: UpdateMovieDto, id: number): Promise<import("typeorm").UpdateResult>;
    updateMovieDetail(qr: QueryRunner, detail: string, movie: Movie): Promise<import("typeorm").UpdateResult>;
    updateMovieGenreRelation(qr: QueryRunner, id: number, newGenres: Genre[], movie: Movie): Promise<void>;
    update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie>;
    deleteMovie(id: number): Promise<import("typeorm").DeleteResult>;
    remove(id: number): Promise<number>;
    getLikeRecord(movieId: number, userId: number): Promise<MovieUserLike>;
    toggleMovieLike(movieId: number, userId: number, isLike: boolean): Promise<{
        isLike: boolean;
    }>;
}
