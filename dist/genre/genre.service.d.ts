import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entity/genre.entity';
import { Repository } from 'typeorm';
export declare class GenreService {
    private readonly genreRepository;
    constructor(genreRepository: Repository<Genre>);
    create(createGenreDto: CreateGenreDto): Promise<CreateGenreDto & Genre>;
    findAll(): Promise<Genre[]>;
    findOne(id: number): Promise<Genre>;
    update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre>;
    remove(id: number): Promise<number>;
}
