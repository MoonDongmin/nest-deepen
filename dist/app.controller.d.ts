import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getMovies(title?: string): import("./app.service").Movie[];
    getMovie(id: string): import("./app.service").Movie;
    postMovie(title: string): import("./app.service").Movie;
    patchMovie(id: string, title: string): import("./app.service").Movie;
    deleteMovie(id: string): number;
}
