import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { MovieDetail } from './entity/movie-detail.entity';
import { Director } from '../director/entity/director.entity';
import { Genre } from '../genre/entity/genre.entity';
import { GetMoviesDto } from './dto/get-movies.dto';
import { CommonService } from '../common/common.service';
export declare class MovieService {
    private readonly movieRepository;
    private readonly movieDetailRepository;
    private readonly directorRepository;
    private readonly genreRepository;
    private readonly dataSource;
    private readonly commonService;
    constructor(movieRepository: Repository<Movie>, movieDetailRepository: Repository<MovieDetail>, directorRepository: Repository<Director>, genreRepository: Repository<Genre>, dataSource: DataSource, commonService: CommonService);
    findAll(dto: GetMoviesDto): Promise<{
        data: Movie[];
        nextCursor: string;
        count: number;
    }>;
    findOne(id: number): Promise<Movie>;
    create(createMovieDto: CreateMovieDto, qr: QueryRunner): Promise<Movie>;
    update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie>;
    remove(id: number): Promise<number>;
}
