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
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const movie_entity_1 = require("./entity/movie.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const movie_detail_entity_1 = require("./entity/movie-detail.entity");
const director_entity_1 = require("../director/entity/director.entity");
let MovieService = class MovieService {
    constructor(movieRepository, movieDetailRepository, directorRepository) {
        this.movieRepository = movieRepository;
        this.movieDetailRepository = movieDetailRepository;
        this.directorRepository = directorRepository;
    }
    async findAll(title) {
        if (!title) {
            return [
                await this.movieRepository.find({ relations: ['director'] }),
                await this.movieRepository.count(),
            ];
        }
        return this.movieRepository.find({
            where: {
                title: (0, typeorm_2.Like)(`%${title}%`),
            },
            relations: ['director'],
        });
    }
    async findOne(id) {
        const movie = await this.movieRepository.findOne({
            where: {
                id,
            },
            relations: ['detail', 'director'],
        });
        if (!movie) {
            throw new common_1.NotFoundException(`존재하지 않는 ID의 영화입니다!`);
        }
        return movie;
    }
    async create(createMovieDto) {
        const director = await this.directorRepository.findOne({
            where: {
                id: createMovieDto.directorId,
            },
        });
        if (!director) {
            throw new common_1.NotFoundException(`존재하지 않는 ID의 감독입니다!`);
        }
        const movieDetail = await this.movieDetailRepository.save({
            detail: createMovieDto.detail,
        });
        const movie = await this.movieRepository.save({
            title: createMovieDto.title,
            genre: createMovieDto.genre,
            detail: movieDetail,
            director: director,
        });
        return movie;
    }
    async update(id, updateMovieDto) {
        const movie = await this.movieRepository.findOne({
            where: {
                id,
            },
            relations: ['detail'],
        });
        if (!movie) {
            throw new common_1.NotFoundException(`존재하지 않는 ID의 영화입니다!`);
        }
        const { detail, directorId, ...movieRest } = updateMovieDto;
        let newDirector;
        if (directorId) {
            const director = await this.directorRepository.findOne({
                where: {
                    id: directorId,
                },
            });
            if (!director) {
                throw new common_1.NotFoundException(`존재하지 않는 ID의 감독입니다!`);
            }
            newDirector = director;
        }
        const movieUpdateFields = {
            ...movieRest,
            ...(newDirector && { director: newDirector }),
        };
        await this.movieRepository.update({
            id,
        }, movieUpdateFields);
        if (detail) {
            await this.movieDetailRepository.update({
                id: movie.detail.id,
            }, { detail });
        }
        const newMovie = await this.movieRepository.findOne({
            where: {
                id,
            },
            relations: ['detail', 'director'],
        });
        return newMovie;
    }
    async remove(id) {
        const movie = await this.movieRepository.findOne({
            where: {
                id,
            },
            relations: ['detail'],
        });
        if (!movie) {
            throw new common_1.NotFoundException(`존재하지 않는 ID의 영화입니다!`);
        }
        await this.movieRepository.delete(id);
        await this.movieDetailRepository.delete(movie.detail.id);
        return id;
    }
};
exports.MovieService = MovieService;
exports.MovieService = MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __param(1, (0, typeorm_1.InjectRepository)(movie_detail_entity_1.MovieDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(director_entity_1.Director)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MovieService);
//# sourceMappingURL=movie.service.js.map