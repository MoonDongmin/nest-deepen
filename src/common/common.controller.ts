import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CommonService } from './common.service';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Controller('common')
@ApiBearerAuth()
export class CommonController {
  constructor(private readonly commonService: CommonService) {}
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
    await this.thumbnailQueue.add(
      'thumbnail',
      {
        videoId: movie.filename,
        videoPath: movie.path,
      },
      // {
      //   priority: 1, // 우선 순위
      //   delay: 100, // 지연 후 시작
      //   attempts: 3, // 실패시 몇 번까지 시도해라
      //   lifo: true, // last in first out -> 스택느낌이라 보면 됨.
      //   removeOnComplete: true, // t로 두면 성공해두면 삭제
      //   removeOnFail: true, // 실패했을 경우 자동으로 삭제
      // },
    );

    return {
      fileName: movie.filename,
    };
  }

  @Post('presigned-url')
  async createPresignedUrl() {
    return {
      url: await this.commonService.createPresignedUrl(),
    };
  }
}
