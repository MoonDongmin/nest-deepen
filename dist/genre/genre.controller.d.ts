import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
export declare class GenreController {
    private readonly genreService;
    constructor(genreService: GenreService);
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
