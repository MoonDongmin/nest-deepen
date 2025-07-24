import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { PrismaService } from '../common/prisma.service';
export declare class DirectorService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDirectorDto: CreateDirectorDto): import("@prisma/client").Prisma.Prisma__DirectorClient<{
        id: number;
        name: string;
        dob: Date;
        nationality: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        dob: Date;
        nationality: string;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__DirectorClient<{
        id: number;
        name: string;
        dob: Date;
        nationality: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateDirectorDto: UpdateDirectorDto): Promise<{
        id: number;
        name: string;
        dob: Date;
        nationality: string;
    }>;
    remove(id: number): Promise<number>;
}
