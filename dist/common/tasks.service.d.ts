import { Movie } from '../movie/entity/movie.entity';
import { Repository } from 'typeorm';
export declare class TasksService {
    private readonly movieRepository;
    constructor(movieRepository: Repository<Movie>);
    logEverySecond(): void;
    eraseOrphanFiles(): Promise<void>;
    calculateMovieLikeCounts(): Promise<void>;
}
