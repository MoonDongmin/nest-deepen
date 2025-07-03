import { BaseTable } from '../../common/entity/base-table.entity';
import { MovieDetail } from './movie-detail.entity';
import { Director } from '../../director/entity/director.entity';
import { Genre } from '../../genre/entity/genre.entity';
import { User } from '../../user/entities/user.entity';
import { MovieUserLike } from './movie-user-like.entity';
export declare class Movie extends BaseTable {
    id: number;
    creator: User;
    title: string;
    genres: Genre[];
    likeCount: number;
    detail: MovieDetail;
    movieFilePath: string;
    director: Director;
    likedUsers: MovieUserLike[];
}
