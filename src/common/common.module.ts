import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { v4 } from 'uuid';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../movie/entity/movie.entity';
import { DefaultLogger } from './logger/default.logger';
import { BullModule } from '@nestjs/bullmq';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    MulterModule.register({
      // 어디다가 파일을 저장할지
      storage: diskStorage({
        destination: join(process.cwd(), 'public', 'temp'),
        filename: (req, file, cb) => {
          const split = file.originalname.split('.');

          let extension = 'mp4';

          if (split.length > 1) {
            extension = split[split.length - 1];
          }
          cb(null, `${v4()}_${Date.now()}.${extension}`);
        },
      }),
    }),
    TypeOrmModule.forFeature([Movie]),

    // Queue 세팅
    BullModule.forRoot({
      connection: {
        host: 'redis-17530.c340.ap-northeast-2-1.ec2.redns.redis-cloud.com',
        port: 17530,
        username: 'default',
        password: 'VDdnJrhuRWpPEM25q2pfTmjZItN4NFU3',
      },
    }),
    BullModule.registerQueue({
      name: 'thumbnail-generation',
    }),
  ],
  controllers: [CommonController],
  providers: [CommonService, TasksService, DefaultLogger, PrismaService],
  exports: [CommonService, DefaultLogger, PrismaService],
})
export class CommonModule {}
