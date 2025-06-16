import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
export declare class MovieService {
    private movies;
    private idCounter;
    constructor();
    getManyMovies(title?: string): Movie[];
    getMovieById(id: number): Movie;
    createMovie(createMovieDto: CreateMovieDto): Movie;
    updateMovie(id: number, updateMovieDto: UpdateMovieDto): Movie;
    deleteMovie(id: number): number;
}
