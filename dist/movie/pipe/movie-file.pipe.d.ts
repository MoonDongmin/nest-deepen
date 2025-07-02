import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class MovieFilePipe implements PipeTransform<Express.Multer.File, Promise<Express.Multer.File>> {
    private readonly options;
    constructor(options: {
        maxSize: number;
        mimetype: string;
    });
    transform(value: Express.Multer.File, metadata: ArgumentMetadata): Promise<Express.Multer.File>;
}
