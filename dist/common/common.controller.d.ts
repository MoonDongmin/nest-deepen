import { CommonService } from './common.service';
export declare class CommonController {
    private readonly commonService;
    constructor(commonService: CommonService);
    createVideo(movie: Express.Multer.File): {
        fileName: string;
    };
    createPresignedUrl(): Promise<{
        url: string;
    }>;
}
