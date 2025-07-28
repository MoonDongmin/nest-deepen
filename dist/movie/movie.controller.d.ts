import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { GetMoviesDto } from './dto/get-movies.dto';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    getMovies(dto: GetMoviesDto, userId?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schema/movie.schema").Movie, Record<string, any>> & import("./schema/movie.schema").Movie & Required<{
            _id: unknown;
        }> & {
            __v?: number;
        } & {
            likeStatus: boolean;
        })[];
        nextCursor: string;
        hasNextPage: boolean;
    } | {
        data: (import("mongoose").Document<unknown, {}, import("./schema/movie.schema").Movie, {}> & import("./schema/movie.schema").Movie & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        nextCursor: string;
        hasNextPage: boolean;
    }>;
    getMoviesRecent(): Promise<unknown>;
    getMovie(id: number, request: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/movie.schema").Movie, {}> & import("./schema/movie.schema").Movie & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    postMovie(body: CreateMovieDto, userId: number): Promise<import("mongoose").Document<unknown, {}, import("./schema/movie.schema").Movie, {}> & import("./schema/movie.schema").Movie & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    patchMovie(id: number, body: UpdateMovieDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/movie.schema").Movie, {}> & import("./schema/movie.schema").Movie & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteMovie(id: number): Promise<number>;
    createMovieLike(movieId: number, userId: number): Promise<{
        isLike: boolean;
    }>;
    createMovieDislike(movieId: number, userId: number): Promise<{
        isLike: boolean;
    }>;
}
