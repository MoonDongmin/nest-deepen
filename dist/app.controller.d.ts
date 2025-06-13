import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getMovies(): {
        id: number;
        name: string;
        character: string[];
    }[];
    getMovie(): {
        id: number;
        name: string;
        character: string[];
    };
    postMovie(): {
        id: number;
        name: string;
        character: string[];
    };
    patchMovie(): {
        id: number;
        name: string;
        character: string[];
    };
    deleteMovie(): number;
}
