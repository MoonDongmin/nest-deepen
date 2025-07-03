import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor() {}

  // 초 분 시 일 월 요일
  @Cron('* * * * * *')
  logEverySecond() {
    console.log('1초마다 실행!!');
  }
}
