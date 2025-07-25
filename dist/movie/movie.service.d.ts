import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { DataSource, QueryRunner } from 'typeorm';
import { Director } from '../director/entity/director.entity';
import { Genre } from '../genre/entity/genre.entity';
import { GetMoviesDto } from './dto/get-movies.dto';
import { CommonService } from '../common/common.service';
import { Cache } from '@nestjs/cache-manager';
import { PrismaService } from '../common/prisma.service';
import { ConfigService } from '@nestjs/config';
export declare class MovieService {
    private readonly configService;
    private readonly dataSource;
    private readonly commonService;
    private readonly cacheManager;
    private readonly prisma;
    constructor(configService: ConfigService, dataSource: DataSource, commonService: CommonService, cacheManager: Cache, prisma: PrismaService);
    findRecent(): Promise<unknown>;
    getMovies(): Promise<void>;
    getLikedMovies(movieIds: number[], userId: number): Promise<void>;
    findAll(dto: GetMoviesDto, userId?: number): Promise<{
        data: ({
            genres: {
                id: number;
                name: string;
            }[];
            director: {
                id: number;
                name: string;
                dob: Date;
                nationality: string;
            };
        } & {
            title: string;
            directorId: number;
            createdAt: Date;
            version: number;
            id: number;
            likeCount: number;
            dislikeCount: number;
            movieFilePath: string;
            creatorId: number;
            detailId: number;
            updateAt: Date;
        })[];
        nextCursor: string;
        hasNextPage: boolean;
    }>;
    findMovieDetail(id: number): Promise<void>;
    findOne(id: number): Promise<{
        title: string;
        directorId: number;
        createdAt: Date;
        version: number;
        id: number;
        likeCount: number;
        dislikeCount: number;
        movieFilePath: string;
        creatorId: number;
        detailId: number;
        updateAt: Date;
    }>;
    createMovieDetail(qr: QueryRunner, createMovieDto: CreateMovieDto): Promise<void>;
    createMovie(qr: QueryRunner, createMovieDto: CreateMovieDto, director: Director, movieDetailId: number, userId: number, movieFolder: string): Promise<void>;
    createMovieGenreRelation(qr: QueryRunner, movieId: number, genres: Genre[]): Promise<void>;
    renameMovieFile(tempFolder: string, movieFolder: string, createMovieDto: CreateMovieDto): Promise<void>;
    create(createMovieDto: CreateMovieDto, userId: number): Promise<{
        detail: {
            detail: string;
            id: number;
        };
        genres: {
            id: number;
            name: string;
        }[];
        director: {
            id: number;
            name: string;
            dob: Date;
            nationality: string;
        };
    } & {
        title: string;
        directorId: number;
        createdAt: Date;
        version: number;
        id: number;
        likeCount: number;
        dislikeCount: number;
        movieFilePath: string;
        creatorId: number;
        detailId: number;
        updateAt: Date;
    }>;
    updateMovie(qr: QueryRunner, movieUpdateFields: UpdateMovieDto, id: number): Promise<void>;
    updateMovieDetail(qr: QueryRunner, detail: string, movie: Movie): Promise<void>;
    updateMovieGenreRelation(qr: QueryRunner, id: number, newGenres: Genre[], movie: Movie): Promise<void>;
    update(id: number, updateMovieDto: UpdateMovieDto): Promise<{
        detail: {
            detail: string;
            id: number;
        };
        genres: {
            id: number;
            name: string;
        }[];
        director: {
            id: number;
            name: string;
            dob: Date;
            nationality: string;
        };
    } & {
        title: string;
        directorId: number;
        createdAt: Date;
        version: number;
        id: number;
        likeCount: number;
        dislikeCount: number;
        movieFilePath: string;
        creatorId: number;
        detailId: number;
        updateAt: Date;
    }>;
    deleteMovie(id: number): Promise<void>;
    remove(id: number): Promise<number>;
    getLikeRecord(movieId: number, userId: number): Promise<void>;
    toggleMovieLike(movieId: number, userId: number, isLike: boolean): Promise<{
        isLike: boolean;
    }>;
}
