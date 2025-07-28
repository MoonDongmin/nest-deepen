import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { DataSource, QueryRunner } from 'typeorm';
import { GetMoviesDto } from './dto/get-movies.dto';
import { CommonService } from '../common/common.service';
import { Cache } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Movie } from './schema/movie.schema';
import { MovieDetail } from './schema/movie-detail.schema';
import { Model, Document } from 'mongoose';
import { Director } from '../director/schema/director.schema';
import { Genre } from '../genre/schema/genre.schema';
import { User } from '../user/schema/user.schema';
import { MovieUserLike } from './schema/movie-user-like.schema';
export declare class MovieService {
    private readonly movieModel;
    private readonly movieDetailModel;
    private readonly directorModel;
    private readonly genreModel;
    private readonly userModel;
    private readonly movieUserLikeModel;
    private readonly configService;
    private readonly dataSource;
    private readonly commonService;
    private readonly cacheManager;
    constructor(movieModel: Model<Movie>, movieDetailModel: Model<MovieDetail>, directorModel: Model<Director>, genreModel: Model<Genre>, userModel: Model<User>, movieUserLikeModel: Model<MovieUserLike>, configService: ConfigService, dataSource: DataSource, commonService: CommonService, cacheManager: Cache);
    findRecent(): Promise<unknown>;
    getMovies(): Promise<void>;
    getLikedMovies(movieIds: number[], userId: number): Promise<void>;
    findAll(dto: GetMoviesDto, userId?: number): Promise<{
        data: (Document<unknown, {}, Movie> & Movie & Required<{
            _id: unknown;
        }> & {
            __v?: number;
        } & {
            likeStatus: boolean;
        })[];
        nextCursor: string;
        hasNextPage: boolean;
    } | {
        data: (Document<unknown, {}, Movie, {}> & Movie & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        nextCursor: string;
        hasNextPage: boolean;
    }>;
    findMovieDetail(id: number): Promise<void>;
    findOne(id: string): Promise<Document<unknown, {}, Movie, {}> & Movie & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createMovieDetail(qr: QueryRunner, createMovieDto: CreateMovieDto): Promise<void>;
    createMovie(qr: QueryRunner, createMovieDto: CreateMovieDto, director: Director, movieDetailId: number, userId: number, movieFolder: string): Promise<void>;
    createMovieGenreRelation(qr: QueryRunner, movieId: number, genres: Genre[]): Promise<void>;
    renameMovieFile(tempFolder: string, movieFolder: string, createMovieDto: CreateMovieDto): Promise<void>;
    create(createMovieDto: CreateMovieDto, userId: number): Promise<Document<unknown, {}, Movie, {}> & Movie & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateMovie(qr: QueryRunner, movieUpdateFields: UpdateMovieDto, id: number): Promise<void>;
    updateMovieDetail(qr: QueryRunner, detail: string, movie: Movie): Promise<void>;
    updateMovieGenreRelation(qr: QueryRunner, id: number, newGenres: Genre[], movie: Movie): Promise<void>;
    update(id: string, updateMovieDto: UpdateMovieDto): Promise<Document<unknown, {}, Movie, {}> & Movie & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteMovie(id: number): Promise<void>;
    remove(id: string): Promise<string>;
    getLikeRecord(movieId: number, userId: number): Promise<void>;
    toggleMovieLike(movieId: string, userId: string, isLike: boolean): Promise<{
        isLike: boolean;
    }>;
}
