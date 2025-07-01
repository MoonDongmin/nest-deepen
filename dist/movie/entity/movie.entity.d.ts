import { BaseTable } from '../../common/entity/base-table.entity';
import { MovieDetail } from './movie-detail.entity';
import { Director } from '../../director/entity/director.entity';
import { Genre } from '../../genre/entity/genre.entity';
export declare class Movie extends BaseTable {
    id: number;
    title: string;
    genres: Genre[];
    likeCount: number;
    detail: MovieDetail;
    director: Director;
}
