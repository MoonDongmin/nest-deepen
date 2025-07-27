import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaService } from '../common/prisma.service';
export declare class GenreService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createGenreDto: CreateGenreDto): Promise<{
        id: number;
        name: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
    }>;
    update(id: number, updateGenreDto: UpdateGenreDto): Promise<{
        id: number;
        name: string;
    }>;
    remove(id: number): Promise<number>;
}
