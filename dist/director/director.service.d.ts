import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Director } from './schema/director.schema';
import { Model } from 'mongoose';
export declare class DirectorService {
    private readonly directorModel;
    constructor(directorModel: Model<Director>);
    create(createDirectorDto: CreateDirectorDto): Promise<import("mongoose").Document<unknown, {}, Director, {}> & Director & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Director, {}> & Director & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Director, {}> & Director & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, Director, "find", {}>;
    findOne(id: number): import("mongoose").Query<import("mongoose").Document<unknown, {}, Director, {}> & Director & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, Director, {}> & Director & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, Director, "findOne", {}>;
    update(id: number, updateDirectorDto: UpdateDirectorDto): Promise<import("mongoose").Document<unknown, {}, Director, {}> & Director & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: number): Promise<number>;
}
