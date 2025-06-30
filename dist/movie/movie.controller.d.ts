import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { GetMoviesDto } from './dto/get-movies.dto';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    getMovies(dto: GetMoviesDto): Promise<[import("./entity/movie.entity").Movie[], number]>;
    getMovie(id: number): Promise<import("./entity/movie.entity").Movie>;
    postMovie(body: CreateMovieDto): Promise<import("./entity/movie.entity").Movie>;
    patchMovie(id: number, body: UpdateMovieDto): Promise<import("./entity/movie.entity").Movie>;
    deleteMovie(id: number): Promise<number>;
}
