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
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
const create_movie_dto_1 = require("./dto/create-movie.dto");
const update_movie_dto_1 = require("./dto/update-movie.dto");
const public_decorator_1 = require("../auth/decorator/public.decorator");
const rbac_decorator_1 = require("../auth/decorator/rbac.decorator");
const user_entity_1 = require("../user/entities/user.entity");
const get_movies_dto_1 = require("./dto/get-movies.dto");
const transaction_interceptor_1 = require("../common/interceptor/transaction.interceptor");
const user_id_decorator_1 = require("../user/decorator/user-id.decorator");
const query_runner_decorator_1 = require("../common/decorator/query-runner.decorator");
let MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    getMovies(dto, userId) {
        return this.movieService.findAll(dto, userId);
    }
    getMoviesRecent() {
        return this.movieService.findRecent();
    }
    getMovie(id) {
        return this.movieService.findOne(id);
    }
    postMovie(body, queryRunner, userId) {
        return this.movieService.create(body, userId, queryRunner);
    }
    patchMovie(id, body) {
        return this.movieService.update(id, body);
    }
    deleteMovie(id) {
        return this.movieService.remove(id);
    }
    createMovieLike(movieId, userId) {
        return this.movieService.toggleMovieLike(movieId, userId, true);
    }
    createMovieDislike(movieId, userId) {
        return this.movieService.toggleMovieLike(movieId, userId, false);
    }
};
exports.MovieController = MovieController;
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_movies_dto_1.GetMoviesDto, Number]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "getMovies", null);
__decorate([
    (0, common_1.Get)('recent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "getMoviesRecent", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "getMovie", null);
__decorate([
    (0, common_1.Post)(),
    (0, rbac_decorator_1.RBAC)(user_entity_1.Role.admin),
    (0, common_1.UseInterceptors)(transaction_interceptor_1.TransactionInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, query_runner_decorator_1.QueryRunner)()),
    __param(2, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_movie_dto_1.CreateMovieDto, Object, Number]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "postMovie", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, rbac_decorator_1.RBAC)(user_entity_1.Role.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_movie_dto_1.UpdateMovieDto]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "patchMovie", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, rbac_decorator_1.RBAC)(user_entity_1.Role.admin),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "deleteMovie", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "createMovieLike", null);
__decorate([
    (0, common_1.Post)(':id/dislike'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "createMovieDislike", null);
exports.MovieController = MovieController = __decorate([
    (0, common_1.Controller)('movie'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
//# sourceMappingURL=movie.controller.js.map