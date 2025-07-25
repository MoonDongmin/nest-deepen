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
const typeorm_1 = require("typeorm");
const common_service_1 = require("../common/common.service");
const path_1 = require("path");
const promises_1 = require("fs/promises");
const cache_manager_1 = require("@nestjs/cache-manager");
const prisma_service_1 = require("../common/prisma.service");
const env_const_1 = require("../common/const/env.const");
const config_1 = require("@nestjs/config");
let MovieService = class MovieService {
    constructor(configService, dataSource, commonService, cacheManager, prisma) {
        this.configService = configService;
        this.dataSource = dataSource;
        this.commonService = commonService;
        this.cacheManager = cacheManager;
        this.prisma = prisma;
    }
    async findRecent() {
        const cacheData = await this.cacheManager.get('MOVIE_RECENT');
        if (cacheData) {
            return cacheData;
        }
        const data = await this.prisma.movie.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 10,
        });
        await this.cacheManager.set('MOVIE_RECENT', data);
        return data;
    }
    async getMovies() {
    }
    async getLikedMovies(movieIds, userId) {
    }
    async findAll(dto, userId) {
        const { title, cursor, take, order } = dto;
        const orderBy = order.map((field) => {
            const [column, direction] = field.split('_');
            return { [column]: direction.toLocaleLowerCase() };
        });
        const movies = await this.prisma.movie.findMany({
            where: title
                ? {
                    title: { contains: title },
                }
                : {},
            take: take + 1,
            skip: cursor ? 1 : 0,
            orderBy,
            cursor: cursor ? { id: parseInt(cursor) } : undefined,
            include: {
                genres: true,
                director: true,
            },
        });
        const hasNextPage = movies.length > take;
        if (hasNextPage)
            movies.pop();
        const nextCursor = hasNextPage
            ? movies[movies.length - 1].id.toString()
            : null;
        if (userId) {
            const movieIds = movies.map((movie) => movie.id);
            const likedMovies = movieIds.length < 1
                ? []
                : await this.prisma.movieUserLike.findMany({
                    where: {
                        movieId: { in: movieIds },
                        userId: userId,
                    },
                    include: {
                        movie: true,
                    },
                });
            const likedMovieMap = likedMovies.reduce((acc, next) => ({
                ...acc,
                [next.movie.id]: next.isLike,
            }), {});
            return {
                data: movies.map((movie) => ({
                    ...movie,
                    likeStatus: movie.id in likedMovieMap ? likedMovieMap[movie.id] : null,
                })),
                nextCursor,
                hasNextPage,
            };
        }
        return {
            data: movies,
            nextCursor,
            hasNextPage,
        };
    }
    async findMovieDetail(id) {
    }
    async findOne(id) {
        const movie = await this.prisma.movie.findUnique({
            where: {
                id,
            },
        });
        if (!movie) {
            throw new common_1.NotFoundException(`존재하지 않는 ID의 영화입니다!`);
        }
        return movie;
    }
    async createMovieDetail(qr, createMovieDto) {
    }
    async createMovie(qr, createMovieDto, director, movieDetailId, userId, movieFolder) {
    }
    async createMovieGenreRelation(qr, movieId, genres) {
    }
    async renameMovieFile(tempFolder, movieFolder, createMovieDto) {
        if (this.configService.get(env_const_1.envVariableKeys.env) !== 'prod') {
            return (0, promises_1.rename)((0, path_1.join)(process.cwd(), tempFolder, createMovieDto.movieFileName), (0, path_1.join)(process.cwd(), movieFolder, createMovieDto.movieFileName));
        }
        else {
            return;
        }
    }
    async create(createMovieDto, userId) {
        return this.prisma.$transaction(async (prisma) => {
            const director = await prisma.director.findUnique({
                where: {
                    id: createMovieDto.directorId,
                },
            });
            if (!director) {
                throw new common_1.NotFoundException(`존재하지 않는 ID의 감독입니다!`);
            }
            const genres = await prisma.genre.findMany({
                where: {
                    id: {
                        in: createMovieDto.genreIds,
                    },
                },
            });
            if (genres.length !== createMovieDto.genreIds.length) {
                throw new common_1.NotFoundException(`존재하지 않는 장르가 있습니다! 존재하는 ids -> ${genres
                    .map((genre) => genre.id)
                    .join(',')}`);
            }
            const movieDetail = await prisma.movieDetail.create({
                data: { detail: createMovieDto.detail },
            });
            const movie = await prisma.movie.create({
                data: {
                    title: createMovieDto.title,
                    movieFilePath: createMovieDto.movieFileName,
                    creator: { connect: { id: userId } },
                    director: { connect: { id: director.id } },
                    genres: { connect: genres.map((genre) => ({ id: genre.id })) },
                    detail: { connect: { id: movieDetail.id } },
                },
            });
            return this.prisma.movie.findUnique({
                where: {
                    id: movie.id,
                },
                include: {
                    detail: true,
                    director: true,
                    genres: true,
                },
            });
        });
    }
    async updateMovie(qr, movieUpdateFields, id) {
    }
    async updateMovieDetail(qr, detail, movie) {
    }
    async updateMovieGenreRelation(qr, id, newGenres, movie) {
    }
    async update(id, updateMovieDto) {
        return this.prisma.$transaction(async (prisma) => {
            const movie = await prisma.movie.findUnique({
                where: { id },
                include: {
                    detail: true,
                    genres: true,
                },
            });
            if (!movie) {
                throw new common_1.NotFoundException('존재하지 않는 ID의 영화입니다!');
            }
            const { detail, directorId, genreIds, ...movieRest } = updateMovieDto;
            let movieUpdateParams = {
                ...movieRest,
            };
            if (directorId) {
                const director = await prisma.director.findUnique({
                    where: { id: directorId },
                });
                if (!director) {
                    throw new common_1.NotFoundException('존재하지 않는 ID의 감독입니다!');
                }
                movieUpdateParams.director = { connect: { id: directorId } };
            }
            if (genreIds) {
                const genres = await prisma.genre.findMany({
                    where: { id: { in: genreIds } },
                });
                if (genres.length !== genreIds.length) {
                    throw new common_1.NotFoundException(`존재하지 않는 장르가 있습니다! 존재하는 ids -> ${genres
                        .map((genre) => genre.id)
                        .join(',')}`);
                }
                movieUpdateParams.genres = {
                    set: genres.map((genre) => ({ id: genre.id })),
                };
            }
            await prisma.movie.update({
                where: { id },
                data: movieUpdateParams,
            });
            if (detail) {
                await prisma.movieDetail.update({
                    where: { id: movie.detail.id },
                    data: { detail },
                });
            }
            return prisma.movie.findUnique({
                where: { id },
                include: {
                    detail: true,
                    director: true,
                    genres: true,
                },
            });
        });
    }
    async deleteMovie(id) {
    }
    async remove(id) {
        const movie = await this.prisma.movie.findUnique({
            where: {
                id,
            },
            include: {
                detail: true,
            },
        });
        if (!movie) {
            throw new common_1.NotFoundException(`존재하지 않는 ID의 영화입니다!`);
        }
        await this.prisma.movie.delete({
            where: { id },
        });
        await this.prisma.movieDetail.delete({
            where: {
                id: movie.detail.id,
            },
        });
        return id;
    }
    async getLikeRecord(movieId, userId) {
    }
    async toggleMovieLike(movieId, userId, isLike) {
        const movie = await this.prisma.movie.findUnique({
            where: {
                id: movieId,
            },
        });
        if (!movie) {
            throw new common_1.BadRequestException(`존재하지 않는 영화입니다!`);
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException(`사용자 정보가 없습니다!!!`);
        }
        const likeRecord = await this.prisma.movieUserLike.findUnique({
            where: {
                movieId_userId: {
                    movieId,
                    userId,
                },
            },
        });
        if (likeRecord) {
            if (isLike === likeRecord.isLike) {
                await this.prisma.movieUserLike.delete({
                    where: {
                        movieId_userId: {
                            movieId,
                            userId,
                        },
                    },
                });
            }
            else {
                await this.prisma.movieUserLike.update({
                    where: {
                        movieId_userId: {
                            movieId,
                            userId,
                        },
                    },
                    data: {
                        isLike,
                    },
                });
            }
        }
        else {
            await this.prisma.movieUserLike.create({
                data: {
                    movie: { connect: { id: movieId } },
                    user: { connect: { id: userId } },
                    isLike,
                },
            });
        }
        const result = await this.prisma.movieUserLike.findUnique({
            where: {
                movieId_userId: {
                    movieId,
                    userId,
                },
            },
        });
        return {
            isLike: result && result.isLike,
        };
    }
};
exports.MovieService = MovieService;
exports.MovieService = MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_1.DataSource,
        common_service_1.CommonService,
        cache_manager_1.Cache,
        prisma_service_1.PrismaService])
], MovieService);
//# sourceMappingURL=movie.service.js.map