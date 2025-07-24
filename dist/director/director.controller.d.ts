import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
export declare class DirectorController {
    private readonly directorService;
    constructor(directorService: DirectorService);
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
    create(createDirectorDto: CreateDirectorDto): import("@prisma/client").Prisma.Prisma__DirectorClient<{
        id: number;
        name: string;
        dob: Date;
        nationality: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateDirectorDto: UpdateDirectorDto): Promise<{
        id: number;
        name: string;
        dob: Date;
        nationality: string;
    }>;
    remove(id: number): Promise<number>;
}
