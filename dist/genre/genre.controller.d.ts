import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
export declare class GenreController {
    private readonly genreService;
    constructor(genreService: GenreService);
    create(createGenreDto: CreateGenreDto): Promise<CreateGenreDto & import("./entity/genre.entity").Genre>;
    findAll(): Promise<import("./entity/genre.entity").Genre[]>;
    findOne(id: number): Promise<import("./entity/genre.entity").Genre>;
    update(id: number, updateGenreDto: UpdateGenreDto): Promise<import("./entity/genre.entity").Genre>;
    remove(id: number): Promise<number>;
}
