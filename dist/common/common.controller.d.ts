import { Queue } from 'bullmq';
export declare class CommonController {
    private readonly thumbnailQueue;
    constructor(thumbnailQueue: Queue);
    createVideo(movie: Express.Multer.File): Promise<{
        fileName: string;
    }>;
}
