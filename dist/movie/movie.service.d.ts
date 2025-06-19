import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { Repository } from 'typeorm';
export declare class MovieService {
    private readonly movieRepository;
    constructor(movieRepository: Repository<Movie>);
    getManyMovies(title?: string): Promise<Movie[]>;
    getMovieById(id: number): Promise<Movie>;
    createMovie(createMovieDto: CreateMovieDto): Promise<CreateMovieDto & Movie>;
    updateMovie(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie>;
    deleteMovie(id: number): Promise<number>;
}
