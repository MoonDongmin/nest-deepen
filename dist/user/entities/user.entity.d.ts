import { BaseTable } from '../../common/entity/base-table.entity';
import { Movie } from '../../movie/entity/movie.entity';
import { MovieUserLike } from '../../movie/entity/movie-user-like.entity';
export declare enum Role {
    admin = 0,
    paidUser = 1,
    user = 2
}
export declare class User extends BaseTable {
    id: number;
    email: string;
    password: string;
    role: Role;
    createdMovies: Movie[];
    likedMovies: MovieUserLike[];
}
