import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { GetMoviesDto } from './dto/get-movies.dto';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    getMovies(dto: GetMoviesDto): Promise<{
        data: import("./entity/movie.entity").Movie[];
        nextCursor: string;
        count: number;
    }>;
    getMovie(id: number): Promise<import("./entity/movie.entity").Movie>;
    postMovie(body: CreateMovieDto, req: any, file: Express.Multer.File): Promise<import("./entity/movie.entity").Movie>;
    patchMovie(id: number, body: UpdateMovieDto): Promise<import("./entity/movie.entity").Movie>;
    deleteMovie(id: number): Promise<number>;
}
