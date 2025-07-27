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
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
const create_movie_dto_1 = require("./dto/create-movie.dto");
const update_movie_dto_1 = require("./dto/update-movie.dto");
const public_decorator_1 = require("../auth/decorator/public.decorator");
const rbac_decorator_1 = require("../auth/decorator/rbac.decorator");
const get_movies_dto_1 = require("./dto/get-movies.dto");
const user_id_decorator_1 = require("../user/decorator/user-id.decorator");
const cache_manager_1 = require("@nestjs/cache-manager");
const throttle_decorator_1 = require("../common/decorator/throttle.decorator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
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
    getMovie(id, request) {
        const session = request.session;
        const movieCount = session.movieCount ?? {};
        request.session.movieCount = {
            ...movieCount,
            [id]: movieCount[id] ? movieCount[id] + 1 : 1,
        };
        console.log(session);
        return this.movieService.findOne(id);
    }
    postMovie(body, userId) {
        return this.movieService.create(body, userId);
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
    (0, throttle_decorator_1.Throttle)({
        count: 5,
        unit: 'minute',
    }),
    (0, swagger_1.ApiOperation)({
        description: '[Movie]를 Pagination하는 API',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '성공적으로 Pagination API 실행',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_movies_dto_1.GetMoviesDto, Number]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "getMovies", null);
__decorate([
    (0, common_1.Get)('recent'),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, cache_manager_1.CacheKey)('getMoviesRecent'),
    (0, cache_manager_1.CacheTTL)(1000),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "getMoviesRecent", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "getMovie", null);
__decorate([
    (0, common_1.Post)(),
    (0, rbac_decorator_1.RBAC)(client_1.Role.admin),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_movie_dto_1.CreateMovieDto, Number]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "postMovie", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, rbac_decorator_1.RBAC)(client_1.Role.admin),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_movie_dto_1.UpdateMovieDto]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "patchMovie", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, rbac_decorator_1.RBAC)(client_1.Role.admin),
    openapi.ApiResponse({ status: 200, type: Number }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "deleteMovie", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "createMovieLike", null);
__decorate([
    (0, common_1.Post)(':id/dislike'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "createMovieDislike", null);
exports.MovieController = MovieController = __decorate([
    (0, common_1.Controller)('movie'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
//# sourceMappingURL=movie.controller.js.map