import { BaseTable } from '../../common/entity/base-table.entity';
import { MovieDetail } from './movie-detail.entity';
import { Director } from '../../director/entity/director.entity';
export declare class Movie extends BaseTable {
    id: number;
    title: string;
    genre: string;
    detail: MovieDetail;
    director: Director;
}
