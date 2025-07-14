import { Movie } from './movie.entity';
import { User } from '../../user/entity/user.entity';
export declare class MovieUserLike {
    movie: Movie;
    user: User;
    isLike: boolean;
}
