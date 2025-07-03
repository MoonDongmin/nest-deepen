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
const genre_entity_1 = require("../genre/entity/genre.entity");
const common_service_1 = require("../common/common.service");
const path_1 = require("path");
const promises_1 = require("fs/promises");
const user_entity_1 = require("../user/entities/user.entity");
const movie_user_like_entity_1 = require("./entity/movie-user-like.entity");
const cache_manager_1 = require("@nestjs/cache-manager");
let MovieService = class MovieService {
    constructor(movieRepository, movieDetailRepository, directorRepository, genreRepository, userRepository, movieUserLikeRepository, dataSource, commonService, cacheManager) {
        this.movieRepository = movieRepository;
        this.movieDetailRepository = movieDetailRepository;
        this.directorRepository = directorRepository;
        this.genreRepository = genreRepository;
        this.userRepository = userRepository;
        this.movieUserLikeRepository = movieUserLikeRepository;
        this.dataSource = dataSource;
        this.commonService = commonService;
        this.cacheManager = cacheManager;
    }
    async findRecent() {
        const cacheData = await this.cacheManager.get('MOVIE_RECENT');
        if (cacheData) {
            return cacheData;
        }
        const data = await this.movieRepository.find({
            order: {
                createdAt: 'DESC',
            },
            take: 10,
        });
        await this.cacheManager.set('MOVIE_RECENT', data);
        return data;
    }
    async findAll(dto, userId) {
        const { title } = dto;
        const qb = await this.movieRepository
            .createQueryBuilder('movie')
            .leftJoinAndSelect('movie.director', 'director')
            .leftJoinAndSelect('movie.genres', 'genres');
        if (title) {
            qb.where('movie.title LIKE :title', { title: `%${title}%` });
        }
        const { nextCursor } = await this.commonService.applyCursorPaginationParamsToQb(qb, dto);
        let [data, count] = await qb.getManyAndCount();
        if (userId) {
            const movieIds = data.map((movie) => movie.id);
            const likedMovies = movieIds.length < 1
                ? []
                : await this.movieUserLikeRepository
                    .createQueryBuilder('mul')
                    .leftJoinAndSelect('mul.user', 'user')
                    .leftJoinAndSelect('mul.movie', 'movie')
                    .where('movie.id IN(:...movieIds)', { movieIds })
                    .andWhere('user.id = :userId', { userId })
                    .getMany();
            const likedMovieMap = likedMovies.reduce((acc, next) => ({
                ...acc,
                [next.movie.id]: next.isLike,
            }), {});
            data = data.map((x) => ({
                ...x,
                likeStatus: x.id in likedMovieMap ? likedMovieMap[x.id] : null,
            }));
        }
        return {
            data,
            nextCursor,
            count,
        };
    }
    async findOne(id) {
        const movie = await this.movieRepository
            .createQueryBuilder('movie')
            .leftJoinAndSelect('movie.director', 'director')
            .leftJoinAndSelect('movie.genres', 'genres')
            .leftJoinAndSelect('movie.detail', 'detail')
            .leftJoinAndSelect('movie.creator', 'creator')
            .where('movie.id = :id', { id })
            .getOne();
        if (!movie) {
            throw new common_1.NotFoundException(`존재하지 않는 ID의 영화입니다!`);
        }
        return movie;
    }
    async create(createMovieDto, userId, qr) {
        const director = await qr.manager.findOne(director_entity_1.Director, {
            where: {
                id: createMovieDto.directorId,
            },
        });
        if (!director) {
            throw new common_1.NotFoundException(`존재하지 않는 ID의 감독입니다!`);
        }
        const genres = await qr.manager.find(genre_entity_1.Genre, {
            where: {
                id: (0, typeorm_2.In)(createMovieDto.genreIds),
            },
        });
        if (genres.length !== createMovieDto.genreIds.length) {
            throw new common_1.NotFoundException(`존재하지 않는 장르가 있습니다! 존재하는 ids -> ${genres
                .map((genre) => genre.id)
                .join(',')}`);
        }
        const movieDetail = await qr.manager
            .createQueryBuilder()
            .insert()
            .into(movie_detail_entity_1.MovieDetail)
            .values({
            detail: createMovieDto.detail,
        })
            .execute();
        const movieDetailId = movieDetail.identifiers[0].id;
        const movieFolder = (0, path_1.join)('public', 'movie');
        const tempFolder = (0, path_1.join)('public', 'temp');
        const movie = await qr.manager
            .createQueryBuilder()
            .insert()
            .into(movie_entity_1.Movie)
            .values({
            title: createMovieDto.title,
            detail: {
                id: movieDetailId,
            },
            director,
            creator: {
                id: userId,
            },
            movieFilePath: (0, path_1.join)(movieFolder, createMovieDto.movieFileName),
        })
            .execute();
        const movieId = movie.identifiers[0].id;
        await qr.manager
            .createQueryBuilder()
            .relation(movie_entity_1.Movie, 'genres')
            .of(movieId)
            .add(genres.map((genre) => genre.id));
        await (0, promises_1.rename)((0, path_1.join)(process.cwd(), tempFolder, createMovieDto.movieFileName), (0, path_1.join)(process.cwd(), movieFolder, createMovieDto.movieFileName));
        return await qr.manager.findOne(movie_entity_1.Movie, {
            where: {
                id: movieId,
            },
            relations: ['detail', 'director', 'genres'],
        });
    }
    async update(id, updateMovieDto) {
        const qr = this.dataSource.createQueryRunner();
        await qr.connect();
        await qr.startTransaction();
        try {
            const movie = await qr.manager.findOne(movie_entity_1.Movie, {
                where: {
                    id,
                },
                relations: ['detail', 'genres'],
            });
            if (!movie) {
                throw new common_1.NotFoundException(`존재하지 않는 ID의 영화입니다!`);
            }
            const { detail, directorId, genreIds, ...movieRest } = updateMovieDto;
            let newDirector;
            if (directorId) {
                const director = await qr.manager.findOne(director_entity_1.Director, {
                    where: {
                        id: directorId,
                    },
                });
                if (!director) {
                    throw new common_1.NotFoundException(`존재하지 않는 ID의 감독입니다!`);
                }
                newDirector = director;
            }
            let newGenres;
            if (genreIds) {
                const genres = await qr.manager.find(genre_entity_1.Genre, {
                    where: {
                        id: (0, typeorm_2.In)(genreIds),
                    },
                });
                if (genres.length !== updateMovieDto.genreIds.length) {
                    throw new common_1.NotFoundException(`존재하지 않는 장르가 있습니다! 존재하는 ids -> ${genres
                        .map((genre) => genre.id)
                        .join(',')}`);
                }
                newGenres = genres;
            }
            const movieUpdateFields = {
                ...movieRest,
                ...(newDirector && { director: newDirector }),
            };
            await qr.manager
                .createQueryBuilder()
                .update(movie_entity_1.Movie)
                .set(movieUpdateFields)
                .where('id = :id', { id })
                .execute();
            if (detail) {
                await qr.manager
                    .createQueryBuilder()
                    .update(movie_detail_entity_1.MovieDetail)
                    .set({
                    detail,
                })
                    .where('id = :id', { id: movie.detail.id })
                    .execute();
            }
            if (newGenres) {
                await qr.manager
                    .createQueryBuilder()
                    .relation(movie_entity_1.Movie, 'genres')
                    .of(id)
                    .addAndRemove(newGenres.map((genre) => genre.id), movie.genres.map((genre) => genre.id));
            }
            await qr.commitTransaction();
            return this.movieRepository.findOne({
                where: {
                    id,
                },
                relations: ['detail', 'director', 'genres'],
            });
        }
        catch (e) {
            await qr.rollbackTransaction();
        }
        finally {
            await qr.release();
        }
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
        await this.movieRepository
            .createQueryBuilder()
            .delete()
            .where('id = :id', { id })
            .execute();
        await this.movieDetailRepository.delete(movie.detail.id);
        return id;
    }
    async toggleMovieLike(movieId, userId, isLike) {
        const movie = await this.movieRepository.findOne({
            where: {
                id: movieId,
            },
        });
        if (!movie) {
            throw new common_1.BadRequestException(`존재하지 않는 영화입니다!`);
        }
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException(`사용자 정보가 없습니다!!!`);
        }
        const likeRecord = await this.movieUserLikeRepository
            .createQueryBuilder('mul')
            .leftJoinAndSelect('mul.movie', 'movie')
            .leftJoinAndSelect('mul.user', 'user')
            .where('movie.id = :movieId', { movieId })
            .andWhere('user.id = :userId', { userId })
            .getOne();
        if (likeRecord) {
            if (isLike === likeRecord.isLike) {
                await this.movieUserLikeRepository.delete({
                    movie,
                    user,
                });
            }
            else {
                await this.movieUserLikeRepository.update({
                    movie,
                    user,
                }, { isLike });
            }
        }
        else {
            await this.movieUserLikeRepository.save({
                movie,
                user,
                isLike,
            });
        }
        const result = await this.movieUserLikeRepository
            .createQueryBuilder('mul')
            .leftJoinAndSelect('mul.movie', 'movie')
            .leftJoinAndSelect('mul.user', 'user')
            .where('movie.id = :movieId', { movieId })
            .andWhere('user.id = :userId', { userId })
            .getOne();
        return {
            isLike: result && result.isLike,
        };
    }
};
exports.MovieService = MovieService;
exports.MovieService = MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __param(1, (0, typeorm_1.InjectRepository)(movie_detail_entity_1.MovieDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(director_entity_1.Director)),
    __param(3, (0, typeorm_1.InjectRepository)(genre_entity_1.Genre)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(5, (0, typeorm_1.InjectRepository)(movie_user_like_entity_1.MovieUserLike)),
    __param(8, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        common_service_1.CommonService,
        cache_manager_1.Cache])
], MovieService);
//# sourceMappingURL=movie.service.js.map