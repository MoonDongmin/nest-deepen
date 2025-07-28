import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './schema/genre.schema';
import { Model } from 'mongoose';
export declare class GenreService {
    private readonly genreModel;
    constructor(genreModel: Model<Genre>);
    create(createGenreDto: CreateGenreDto): Promise<import("mongoose").Document<unknown, {}, Genre, {}> & Genre & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Genre, {}> & Genre & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: number): Promise<import("mongoose").Document<unknown, {}, Genre, {}> & Genre & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: number, updateGenreDto: UpdateGenreDto): Promise<import("mongoose").Document<unknown, {}, Genre, {}> & Genre & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: number): Promise<number>;
}
