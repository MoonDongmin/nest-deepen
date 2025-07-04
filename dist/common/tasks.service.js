"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const process = require("node:process");
const typeorm_1 = require("@nestjs/typeorm");
const movie_entity_1 = require("../movie/entity/movie.entity");
const typeorm_2 = require("typeorm");
const nest_winston_1 = require("nest-winston");
let TasksService = class TasksService {
    constructor(movieRepository, schedulerRegistry, logger) {
        this.movieRepository = movieRepository;
        this.schedulerRegistry = schedulerRegistry;
        this.logger = logger;
    }
    async eraseOrphanFiles() {
        const files = await (0, promises_1.readdir)((0, path_1.join)(process.cwd(), 'public', 'temp'));
        const deleteFilesTargets = files.filter((file) => {
            const filename = (0, path_1.parse)(file).name;
            const split = filename.split('_');
            if (split.length !== 2) {
                return true;
            }
            try {
                const date = +new Date(parseInt(split[split.length - 1]));
                const aDayInMilSec = 24 * 60 * 60 * 1000;
                const now = +new Date();
                return now - date > aDayInMilSec;
            }
            catch (e) {
                return true;
            }
        });
        await Promise.all(deleteFilesTargets.map((x) => (0, promises_1.unlink)((0, path_1.join)(process.cwd(), 'public', 'temp', x))));
    }
    async calculateMovieLikeCounts() {
        console.log('run');
        await this.movieRepository.query(`
          UPDATE movie m
          SET "likeCount" = (SELECT count(*)
                             FROM movie_user_like mul
                             WHERE m.id = mul."movieId"
                               AND mul."isLike" = true)`);
        await this.movieRepository.query(`
          UPDATE movie m
          SET "dislikeCount" = (SELECT count(*)
                                FROM movie_user_like mul
                                WHERE m.id = mul."movieId"
                                  AND mul."isLike" = false)`);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        schedule_1.SchedulerRegistry, Object])
], TasksService);
//# sourceMappingURL=tasks.service.js.map