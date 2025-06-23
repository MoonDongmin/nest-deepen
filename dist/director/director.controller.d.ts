import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
export declare class DirectorController {
    private readonly directorService;
    constructor(directorService: DirectorService);
    findAll(): Promise<import("./entity/director.entity").Director[]>;
    findOne(id: string): Promise<import("./entity/director.entity").Director>;
    create(createDirectorDto: CreateDirectorDto): Promise<CreateDirectorDto & import("./entity/director.entity").Director>;
    update(id: string, updateDirectorDto: UpdateDirectorDto): Promise<import("./entity/director.entity").Director>;
    remove(id: string): Promise<number>;
}
