import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { GetMoviesDto } from './dto/get-movies.dto';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    getMovies(dto: GetMoviesDto, userId?: number): Promise<{
        data: ({
            genres: {
                id: number;
                name: string;
            }[];
            director: {
                id: number;
                name: string;
                dob: Date;
                nationality: string;
            };
        } & {
            title: string;
            directorId: number;
            createdAt: Date;
            version: number;
            id: number;
            likeCount: number;
            dislikeCount: number;
            movieFilePath: string;
            creatorId: number;
            detailId: number;
            updateAt: Date;
        })[];
        nextCursor: string;
        hasNextPage: boolean;
    }>;
    getMoviesRecent(): Promise<unknown>;
    getMovie(id: number, request: any): Promise<{
        title: string;
        directorId: number;
        createdAt: Date;
        version: number;
        id: number;
        likeCount: number;
        dislikeCount: number;
        movieFilePath: string;
        creatorId: number;
        detailId: number;
        updateAt: Date;
    }>;
    postMovie(body: CreateMovieDto, userId: number): Promise<{
        detail: {
            detail: string;
            id: number;
        };
        genres: {
            id: number;
            name: string;
        }[];
        director: {
            id: number;
            name: string;
            dob: Date;
            nationality: string;
        };
    } & {
        title: string;
        directorId: number;
        createdAt: Date;
        version: number;
        id: number;
        likeCount: number;
        dislikeCount: number;
        movieFilePath: string;
        creatorId: number;
        detailId: number;
        updateAt: Date;
    }>;
    patchMovie(id: number, body: UpdateMovieDto): Promise<{
        detail: {
            detail: string;
            id: number;
        };
        genres: {
            id: number;
            name: string;
        }[];
        director: {
            id: number;
            name: string;
            dob: Date;
            nationality: string;
        };
    } & {
        title: string;
        directorId: number;
        createdAt: Date;
        version: number;
        id: number;
        likeCount: number;
        dislikeCount: number;
        movieFilePath: string;
        creatorId: number;
        detailId: number;
        updateAt: Date;
    }>;
    deleteMovie(id: number): Promise<number>;
    createMovieLike(movieId: number, userId: number): Promise<{
        isLike: boolean;
    }>;
    createMovieDislike(movieId: number, userId: number): Promise<{
        isLike: boolean;
    }>;
}
