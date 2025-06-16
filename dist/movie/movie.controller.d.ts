import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    create(createMovieDto: CreateMovieDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMovieDto: UpdateMovieDto): string;
    remove(id: string): string;
}
