import { SelectQueryBuilder } from 'typeorm';
import { PagePaginationDto } from './dto/page-pagination.dto';
import { CursorPaginationDto } from './dto/cursor-pagination.dto';
import { ConfigService } from '@nestjs/config';
export declare class CommonService {
    private readonly configService;
    private s3;
    constructor(configService: ConfigService);
    saveMovieToPermanentStorage(fileName: string): Promise<void>;
    createPresignedUrl(expiresIn?: number): Promise<string>;
    applyPagePaginationParamsToQb<T>(qb: SelectQueryBuilder<T>, dto: PagePaginationDto): void;
    applyCursorPaginationParamsToQb<T>(qb: SelectQueryBuilder<T>, dto: CursorPaginationDto): Promise<{
        qb: SelectQueryBuilder<T>;
        nextCursor: string;
    }>;
    generateNextCursor<T>(results: T[], order: string[]): string | null;
}
