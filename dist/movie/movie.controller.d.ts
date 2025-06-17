import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    getMovies(title?: string): import("./entity/movie.entity").Movie[];
    getMovie(id: string): import("./entity/movie.entity").Movie;
    postMovie(body: CreateMovieDto): import("./entity/movie.entity").Movie;
    patchMovie(id: string, body: UpdateMovieDto): import("./entity/movie.entity").Movie;
    deleteMovie(id: string): number;
}
