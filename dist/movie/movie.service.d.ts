import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { Repository } from 'typeorm';
import { MovieDetail } from './entity/movie-detail.entity';
export declare class MovieService {
    private readonly movieRepository;
    private readonly movieDetailRepository;
    constructor(movieRepository: Repository<Movie>, movieDetailRepository: Repository<MovieDetail>);
    findAll(title?: string): Promise<Movie[] | (number | Movie[])[]>;
    findOne(id: number): Promise<Movie>;
    create(createMovieDto: CreateMovieDto): Promise<{
        title: string;
        genre: string;
        detail: {
            detail: string;
        } & MovieDetail;
    } & Movie>;
    update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie>;
    remove(id: number): Promise<number>;
}
