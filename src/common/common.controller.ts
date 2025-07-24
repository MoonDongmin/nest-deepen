import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Controller('common')
@ApiBearerAuth()
export class CommonController {
  constructor(
    @InjectQueue('thumbnail-generation')
    private readonly thumbnailQueue: Queue,
  ) {}

  @Post('video')
  @UseInterceptors(
    FileInterceptor('video', {
      limits: {
        fileSize: 20000000,
      },
      fileFilter(req: any, file, callback) {
        if (file.mimetype !== 'video/mp4') {
          return callback(
            new BadRequestException(`MP4 타이만 업로드 가능합니다!`),
            false,
          );
        }
        return callback(null, true);
      },
    }),
  )
  async createVideo(@UploadedFile() movie: Express.Multer.File) {
    await this.thumbnailQueue.add('thumbnail', {
      videoId: movie.filename,
      videoPath: movie.path,
    });

    return {
      fileName: movie.filename,
    };
  }
}
