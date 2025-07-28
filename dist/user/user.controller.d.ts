import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}> & import("./schema/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}> & import("./schema/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: number): Promise<import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}> & import("./schema/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/user.schema").User, {}> & import("./schema/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: number): Promise<number>;
}
