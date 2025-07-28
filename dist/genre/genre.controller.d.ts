import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
export declare class GenreController {
    private readonly genreService;
    constructor(genreService: GenreService);
    create(createGenreDto: CreateGenreDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/genre.schema").Genre, {}> & import("./schema/genre.schema").Genre & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/genre.schema").Genre, {}> & import("./schema/genre.schema").Genre & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/genre.schema").Genre, {}> & import("./schema/genre.schema").Genre & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateGenreDto: UpdateGenreDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/genre.schema").Genre, {}> & import("./schema/genre.schema").Genre & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<string>;
}
