import { MovieService } from './movie.service';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    getMovies(title?: string): import("./movie.service").Movie[];
    getMovie(id: string): import("./movie.service").Movie;
    postMovie(title: string): import("./movie.service").Movie;
    patchMovie(id: string, title: string): import("./movie.service").Movie;
    deleteMovie(id: string): number;
}
