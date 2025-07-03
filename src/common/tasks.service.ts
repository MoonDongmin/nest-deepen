import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { readdir, unlink } from 'fs/promises';
import { join, parse } from 'path';
import * as process from 'node:process';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from '../movie/entity/movie.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  // 초 분 시 일 월 요일
  @Cron('* * * * * *')
  logEverySecond() {
    // 밑으로 갈 수록 로그 레벨이 낮아짐
    this.logger.fatal('FATAL 레벨 로그'); // 지금 당장 해결해야 할 문제
    this.logger.error('ERROR 레벨 로그'); // 실제로 오류가 났을 때
    this.logger.warn('WARN 레벨 로그'); // 일어나면 안되는 상황이 맞긴한데 프로그램 실행이 문제에 되지는 않음
    this.logger.log('LOG 로그'); // 정보성 로그(INFO 레벨과 같음)
    this.logger.debug('DEBUG 레벨 로그'); // 프로덕션 환경아 아닌 개발 환경에서 중요한 내용
    this.logger.verbose('VERBOSE 레벨 로그'); // 진짜 중요하지 않은 내용들
  }

  // @Cron('* * * * * *')
  async eraseOrphanFiles() {
    const files = await readdir(join(process.cwd(), 'public', 'temp'));

    const deleteFilesTargets = files.filter((file) => {
      // 확장자를 제외한 이름을 가져오는 방법
      const filename = parse(file).name;

      const split = filename.split('_');
      if (split.length !== 2) {
        return true;
      }

      try {
        const date = +new Date(parseInt(split[split.length - 1]));
        const aDayInMilSec = 24 * 60 * 60 * 1000;
        const now = +new Date();

        return now - date > aDayInMilSec;
      } catch (e) {
        return true;
      }
    });

    await Promise.all(
      deleteFilesTargets.map((x) =>
        unlink(join(process.cwd(), 'public', 'temp', x)),
      ),
    );
  }

  // @Cron('0 * * * * *')
  async calculateMovieLikeCounts() {
    console.log('run');
    await this.movieRepository.query(
      `
          UPDATE movie m
          SET "likeCount" = (SELECT count(*)
                             FROM movie_user_like mul
                             WHERE m.id = mul."movieId"
                               AND mul."isLike" = true)`,
    );

    await this.movieRepository.query(
      `
          UPDATE movie m
          SET "dislikeCount" = (SELECT count(*)
                                FROM movie_user_like mul
                                WHERE m.id = mul."movieId"
                                  AND mul."isLike" = false)`,
    );
  }

  // 선언형 Cron 작업
  // @Cron('* * * * * *', {
  //   name: 'printer',
  // })
  // printer() {
  //   console.log('print every seconds');
  // }

  // @Cron('*/5 * * * * *')
  // stopper() {
  //   console.log('---stopper run---');
  //
  //   const job = this.schedulerRegistry.getCronJob('printer');
  //
  //   console.log('# Last Date');
  //   console.log(job.lastDate());
  //   console.log('# Next Date');
  //   console.log(job.nextDate());
  //   // console.log('# Next Dates');
  //   // console.log(job.nextDates(5));
  //
  //   if (job.running) {
  //     job.stop();
  //   } else {
  //     job.start();
  //   }
  // }
}
