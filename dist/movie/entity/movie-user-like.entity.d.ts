import { Movie } from './movie.entity';
import { User } from '../../user/entities/user.entity';
export declare class MovieUserLike {
    movie: Movie;
    user: User;
    isLike: boolean;
}
