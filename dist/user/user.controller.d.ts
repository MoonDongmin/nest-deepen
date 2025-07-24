import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        email: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
    }[]>;
    findOne(id: number): Promise<{
        email: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
    }>;
    remove(id: number): Promise<number>;
}
