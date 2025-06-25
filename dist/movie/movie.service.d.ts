import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { Repository } from 'typeorm';
import { MovieDetail } from './entity/movie-detail.entity';
import { Director } from '../director/entity/director.entity';
import { Genre } from '../genre/entity/genre.entity';
export declare class MovieService {
    private readonly movieRepository;
    private readonly movieDetailRepository;
    private readonly directorRepository;
    private readonly genreRepository;
    constructor(movieRepository: Repository<Movie>, movieDetailRepository: Repository<MovieDetail>, directorRepository: Repository<Director>, genreRepository: Repository<Genre>);
    findAll(title?: string): Promise<Movie[] | (number | Movie[])[]>;
    findOne(id: number): Promise<Movie>;
    create(createMovieDto: CreateMovieDto): Promise<{
        title: string;
        detail: {
            detail: string;
        };
        director: Director;
        genres: Genre[];
    } & Movie>;
    update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie>;
    remove(id: number): Promise<number>;
}
