import { BaseTable } from '../../common/entity/base-table.entity';
import { Movie } from '../../movie/entity/movie.entity';
export declare class Genre extends BaseTable {
    id: number;
    name: string;
    movies: Movie[];
}
