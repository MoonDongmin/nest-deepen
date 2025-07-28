import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
export declare class DirectorController {
    private readonly directorService;
    constructor(directorService: DirectorService);
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/director.schema").Director, {}> & import("./schema/director.schema").Director & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./schema/director.schema").Director, {}> & import("./schema/director.schema").Director & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./schema/director.schema").Director, "find", {}>;
    findOne(id: number): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("./schema/director.schema").Director, {}> & import("./schema/director.schema").Director & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, import("./schema/director.schema").Director, {}> & import("./schema/director.schema").Director & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./schema/director.schema").Director, "findOne", {}>;
    create(createDirectorDto: CreateDirectorDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/director.schema").Director, {}> & import("./schema/director.schema").Director & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: number, updateDirectorDto: UpdateDirectorDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/director.schema").Director, {}> & import("./schema/director.schema").Director & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: number): Promise<number>;
}
