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
const env_const_1 = require("../common/const/env.const");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const movie_schema_1 = require("./schema/movie.schema");
const movie_detail_schema_1 = require("./schema/movie-detail.schema");
const mongoose_2 = require("mongoose");
const director_schema_1 = require("../director/schema/director.schema");
const genre_schema_1 = require("../genre/schema/genre.schema");
const user_schema_1 = require("../user/schema/user.schema");
const movie_user_like_schema_1 = require("./schema/movie-user-like.schema");
let MovieService = class MovieService {
    constructor(movieModel, movieDetailModel, directorModel, genreModel, userModel, movieUserLikeModel, configService, dataSource, commonService, cacheManager) {
        this.movieModel = movieModel;
        this.movieDetailModel = movieDetailModel;
        this.directorModel = directorModel;
        this.genreModel = genreModel;
        this.userModel = userModel;
        this.movieUserLikeModel = movieUserLikeModel;
        this.configService = configService;
        this.dataSource = dataSource;
        this.commonService = commonService;
        this.cacheManager = cacheManager;
    }
    async findRecent() {
        const cacheData = await this.cacheManager.get('MOVIE_RECENT');
        if (cacheData) {
            return cacheData;
        }
        const data = await this.movieModel
            .find()
            .sort({ createdAt: -1 })
            .limit(10)
            .exec();
        await this.cacheManager.set('MOVIE_RECENT', data);
        return data;
    }
    async getMovies() {
    }
    async getLikedMovies(movieIds, userId) {
    }
    async findAll(dto, userId) {
        const { title, cursor, take, order } = dto;
        const orderBy = order.reduce((acc, field) => {
            const [column, direction] = field.split('_');
            acc[column] = direction.toLocaleLowerCase();
            return acc;
        }, {});
        const query = this.movieModel
            .find(title
            ? {
                title: {
                    $regex: title,
                },
                $option: 'i',
            }
            : {})
            .sort(orderBy)
            .limit(take + 1);
        if (cursor) {
            query.skip(1).gt('_id', new mongoose_2.Types.ObjectId(cursor));
        }
        const movies = await query.populate('genres director').exec();
        const hasNextPage = movies.length > take;
        if (hasNextPage)
            movies.pop();
        const nextCursor = hasNextPage
            ? movies[movies.length - 1]._id.toString()
            : null;
        if (userId) {
            const movieIds = movies.map((movie) => movie._id);
            const likedMovies = movieIds.length < 1
                ? []
                : await this.movieUserLikeModel
                    .find({
                    movie: { $in: movieIds },
                    user: userId,
                })
                    .populate('movie')
                    .exec();
            const likedMovieMap = likedMovies.reduce((acc, next) => ({
                ...acc,
                [next.movie._id.toString()]: next.isLike,
            }), {});
            return {
                data: movies.map((movie) => ({
                    ...movie.toObject(),
                    likeStatus: movie._id.toString() in likedMovieMap
                        ? likedMovieMap[movie._id.toString()]
                        : null,
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
        const movie = await this.movieModel.findById(id);
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
            return this.commonService.saveMovieToPermanentStorage(createMovieDto.movieFileName);
        }
    }
    async create(createMovieDto, userId) {
        const session = await this.movieModel.startSession();
        session.startTransaction();
        try {
            const director = await this.directorModel
                .findById(createMovieDto.directorId)
                .exec();
            if (!director) {
                throw new common_1.NotFoundException('존재하지 않는 ID의 감독입니다!');
            }
            const genres = await this.genreModel
                .find({ _id: { $in: createMovieDto.genreIds } })
                .exec();
            if (genres.length !== createMovieDto.genreIds.length) {
                throw new common_1.NotFoundException(`존재하지 않는 장르가 있습니다! 존재하는 ids -> ${genres
                    .map((genre) => genre.id)
                    .join(',')}`);
            }
            const movieDetail = await this.movieDetailModel.create([
                {
                    detail: createMovieDto.detail,
                },
            ], {
                session,
            });
            const movie = await this.movieModel.create([
                {
                    title: createMovieDto.title,
                    movieFilePath: createMovieDto.movieFileName,
                    creator: userId,
                    director: director._id,
                    genres: genres.map((genre) => genre._id),
                    detail: movieDetail[0]._id,
                },
            ], {
                session,
            });
            await session.commitTransaction();
            return this.movieModel
                .findById(movie[0]._id)
                .populate('detail')
                .populate('director')
                .populate({
                path: 'genres',
                model: 'Genre',
            })
                .exec();
        }
        catch (e) {
            await session.abortTransaction();
            console.log(e);
            throw new common_1.InternalServerErrorException('트랜잭션 실패');
        }
        finally {
            session.endSession();
        }
    }
    async updateMovie(qr, movieUpdateFields, id) {
    }
    async updateMovieDetail(qr, detail, movie) {
    }
    async updateMovieGenreRelation(qr, id, newGenres, movie) {
    }
    async update(id, updateMovieDto) {
        const session = await this.movieModel.startSession();
        session.startTransaction();
        try {
            const movie = await this.movieModel
                .findById(id)
                .populate('detail genres')
                .exec();
            if (!movie) {
                throw new common_1.NotFoundException('존재하지 않는 ID의 영화입니다!');
            }
            const { detail, directorId, genreIds, ...movieRest } = updateMovieDto;
            let movieUpdateParams = {
                ...movieRest,
            };
            if (directorId) {
                const director = await this.directorModel.findById(directorId).exec();
                if (!director) {
                    throw new common_1.NotFoundException('존재하지 않는 ID의 감독입니다!');
                }
                movieUpdateParams.director = director._id;
            }
            if (genreIds) {
                const genres = await this.genreModel
                    .find({
                    _id: { $in: genreIds },
                })
                    .exec();
                if (genres.length !== genreIds.length) {
                    throw new common_1.NotFoundException(`존재하지 않는 장르가 있습니다! 존재하는 ids -> ${genres
                        .map((genre) => genre.id)
                        .join(',')}`);
                }
                movieUpdateParams.genres = genres.map((genre) => genre._id);
            }
            if (detail) {
                await this.movieDetailModel
                    .findByIdAndUpdate(movie.detail._id, {
                    detail,
                })
                    .exec();
            }
            await this.movieModel.findByIdAndUpdate(id, movieUpdateParams);
            await session.commitTransaction();
            return this.movieModel
                .findById(id)
                .populate('detail director')
                .populate({
                path: 'genres',
                model: 'Genre',
            })
                .exec();
        }
        catch (e) {
            await session.abortTransaction();
        }
        finally {
            session.endSession();
        }
    }
    async deleteMovie(id) {
    }
    async remove(id) {
        const movie = await this.movieModel.findById(id).populate('detail').exec();
        if (!movie) {
            throw new common_1.NotFoundException(`존재하지 않는 ID의 영화입니다!`);
        }
        await this.movieModel.findByIdAndDelete(id).exec();
        await this.movieDetailModel.findByIdAndDelete(movie.detail._id).exec();
        return id;
    }
    async getLikeRecord(movieId, userId) {
    }
    async toggleMovieLike(movieId, userId, isLike) {
        const movie = await this.movieDetailModel.findById(movieId).exec();
        if (!movie) {
            throw new common_1.BadRequestException(`존재하지 않는 영화입니다!`);
        }
        const user = await this.movieModel.findById(userId).exec();
        if (!user) {
            throw new common_1.UnauthorizedException(`사용자 정보가 없습니다!!!`);
        }
        const likeRecord = await this.movieUserLikeModel.findOne({
            movie: movieId,
            user: userId,
        });
        if (likeRecord) {
            if (isLike === likeRecord.isLike) {
                await this.movieUserLikeModel.findByIdAndDelete(likeRecord._id);
            }
            else {
                likeRecord.isLike = isLike;
                likeRecord.save();
            }
        }
        else {
            await this.movieUserLikeModel.create({
                movie: movieId,
                user: userId,
                isLike,
            });
        }
        const result = await this.movieUserLikeModel.findOne({
            movie: movieId,
            user: userId,
        });
        return {
            isLike: result && result.isLike,
        };
    }
};
exports.MovieService = MovieService;
exports.MovieService = MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(movie_schema_1.Movie.name)),
    __param(1, (0, mongoose_1.InjectModel)(movie_detail_schema_1.MovieDetail.name)),
    __param(2, (0, mongoose_1.InjectModel)(director_schema_1.Director.name)),
    __param(3, (0, mongoose_1.InjectModel)(genre_schema_1.Genre.name)),
    __param(4, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(5, (0, mongoose_1.InjectModel)(movie_user_like_schema_1.MovieUserLike.name)),
    __param(9, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService,
        typeorm_1.DataSource,
        common_service_1.CommonService,
        cache_manager_1.Cache])
], MovieService);
//# sourceMappingURL=movie.service.js.map