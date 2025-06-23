import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { Repository } from 'typeorm';
import { MovieDetail } from './entity/movie-detail.entity';
export declare class MovieService {
    private readonly movieRepository;
    private readonly movieDetailRepository;
    constructor(movieRepository: Repository<Movie>, movieDetailRepository: Repository<MovieDetail>);
    getManyMovies(title?: string): Promise<Movie[] | (number | Movie[])[]>;
    getMovieById(id: number): Promise<Movie>;
    createMovie(createMovieDto: CreateMovieDto): Promise<{
        title: string;
        genre: string;
        detail: {
            detail: string;
        } & MovieDetail;
    } & Movie>;
    updateMovie(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie>;
    deleteMovie(id: number): Promise<number>;
}
