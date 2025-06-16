export interface Movie {
    id: number;
    title: string;
}
export declare class MovieService {
    private movies;
    private idCounter;
    getManyMovies(title?: string): Movie[];
    getMovieById(id: number): Movie;
    createMovie(title: string): Movie;
    updateMovie(id: number, title: string): Movie;
    deleteMovie(id: number): number;
}
