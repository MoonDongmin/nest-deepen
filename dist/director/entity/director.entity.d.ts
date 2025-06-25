import { BaseTable } from '../../common/entity/base-table.entity';
import { Movie } from '../../movie/entity/movie.entity';
export declare class Director extends BaseTable {
    id: number;
    name: string;
    dob: Date;
    nationality: string;
    movies: Movie[];
}
