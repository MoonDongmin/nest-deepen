import { CommonService } from './common.service';
import { Queue } from 'bullmq';
export declare class CommonController {
    private readonly thumbnailQueue;
    private readonly commonService;
    constructor(thumbnailQueue: Queue, commonService: CommonService);
    createVideo(movie: Express.Multer.File): Promise<{
        fileName: string;
    }>;
    createPresignedUrl(): Promise<{
        url: string;
    }>;
}
