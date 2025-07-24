import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../common/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UserService {
    private readonly configService;
    private readonly prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
        id: number;
        role: import("@prisma/client").$Enums.Role;
    }>;
    findAll(): Prisma.PrismaPromise<{
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
