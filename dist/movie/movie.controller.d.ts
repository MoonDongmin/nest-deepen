import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    getMovies(title?: string): Promise<import("./entity/movie.entity").Movie[] | (number | import("./entity/movie.entity").Movie[])[]>;
    getMovie(id: string): Promise<import("./entity/movie.entity").Movie>;
    postMovie(body: CreateMovieDto): Promise<{
        title: string;
        genre: string;
        detail: {
            detail: string;
        } & import("./entity/movie-detail.entity").MovieDetail;
    } & import("./entity/movie.entity").Movie>;
    patchMovie(id: string, body: UpdateMovieDto): Promise<import("./entity/movie.entity").Movie>;
    deleteMovie(id: string): Promise<number>;
}
