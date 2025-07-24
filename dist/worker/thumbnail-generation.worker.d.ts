import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
export declare class ThumbnailGenerationProcess extends WorkerHost {
    process(job: Job, token?: string): Promise<number>;
}
