import { SelectQueryBuilder } from 'typeorm';
import { PagePaginationDto } from './dto/page-pagination.dto';
import { CursorPaginationDto } from './dto/cursor-pagination.dto';
export declare class CommonService {
    constructor();
    applyPagePaginationParamsToQb<T>(qb: SelectQueryBuilder<T>, dto: PagePaginationDto): void;
    applyCursorPaginationParamsToQb<T>(qb: SelectQueryBuilder<T>, dto: CursorPaginationDto): Promise<{
        qb: SelectQueryBuilder<T>;
        nextCursor: string;
    }>;
    generateNextCursor<T>(results: T[], order: string[]): string | null;
}
