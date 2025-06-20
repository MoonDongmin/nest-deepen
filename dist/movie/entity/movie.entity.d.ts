import { BaseTable } from './base-table.entity';
import { MovieDetail } from './movie-detail.entity';
export declare class Movie extends BaseTable {
    id: number;
    title: string;
    genre: string;
    detail: MovieDetail;
}
