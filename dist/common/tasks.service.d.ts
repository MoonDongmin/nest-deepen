import { SchedulerRegistry } from '@nestjs/schedule';
import { Movie } from '../movie/entity/movie.entity';
import { Repository } from 'typeorm';
export declare class TasksService {
    private readonly movieRepository;
    private readonly schedulerRegistry;
    private readonly logger;
    constructor(movieRepository: Repository<Movie>, schedulerRegistry: SchedulerRegistry);
    logEverySecond(): void;
    eraseOrphanFiles(): Promise<void>;
    calculateMovieLikeCounts(): Promise<void>;
}
