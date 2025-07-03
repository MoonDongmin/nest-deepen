import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { GetMoviesDto } from './dto/get-movies.dto';
import { QueryRunner as QR } from 'typeorm';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    getMovies(dto: GetMoviesDto, userId?: number): Promise<{
        data: import("./entity/movie.entity").Movie[];
        nextCursor: string;
        count: number;
    }>;
    getMovie(id: number): Promise<import("./entity/movie.entity").Movie>;
    postMovie(body: CreateMovieDto, queryRunner: QR, userId: number): Promise<import("./entity/movie.entity").Movie>;
    patchMovie(id: number, body: UpdateMovieDto): Promise<import("./entity/movie.entity").Movie>;
    deleteMovie(id: number): Promise<number>;
    createMovieLike(movieId: number, userId: number): Promise<{
        isLike: boolean;
    }>;
    createMovieDislike(movieId: number, userId: number): Promise<{
        isLike: boolean;
    }>;
}
