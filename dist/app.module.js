"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const movie_module_1 = require("./movie/movie.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const movie_entity_1 = require("./movie/entity/movie.entity");
const movie_detail_entity_1 = require("./movie/entity/movie-detail.entity");
const director_module_1 = require("./director/director.module");
const director_entity_1 = require("./director/entity/director.entity");
const genre_module_1 = require("./genre/genre.module");
const genre_entity_1 = require("./genre/entity/genre.entity");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const user_entity_1 = require("./user/entity/user.entity");
const env_const_1 = require("./common/const/env.const");
const bearer_token_middleware_1 = require("./auth/middleware/bearer-token.middleware");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./auth/guard/auth.guard");
const rbac_guard_1 = require("./auth/guard/rbac.guard");
const response_time_interceptor_1 = require("./common/interceptor/response-time.interceptor");
const query_failed_filter_1 = require("./common/filter/query-failed.filter");
const serve_static_1 = require("@nestjs/serve-static");
const process = require("node:process");
const path_1 = require("path");
const movie_user_like_entity_1 = require("./movie/entity/movie-user-like.entity");
const cache_manager_1 = require("@nestjs/cache-manager");
const throttle_interceptor_1 = require("./common/interceptor/throttle.interceptor");
const schedule_1 = require("@nestjs/schedule");
const nest_winston_1 = require("nest-winston");
const chat_module_1 = require("./chat/chat.module");
const winston = require("winston");
const chat_entity_1 = require("./chat/entity/chat.entity");
const chat_room_entity_1 = require("./chat/entity/chat-room.entity");
const worker_module_1 = require("./worker/worker.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(bearer_token_middleware_1.BearerTokenMiddleware)
            .exclude({
            path: 'auth/login',
            method: common_1.RequestMethod.POST,
        }, {
            path: 'auth/register',
            method: common_1.RequestMethod.POST,
        })
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: process.env.NODE_ENV === 'test' ? 'test.env' : '.env',
                validationSchema: Joi.object({
                    ENV: Joi.string().valid('test', 'dev', 'prod').required(),
                    DB_TYPE: Joi.string().valid('postgres').required(),
                    DB_HOST: Joi.string().required(),
                    DB_PORT: Joi.number().required(),
                    DB_USERNAME: Joi.string().required(),
                    DB_PASSWORD: Joi.string().required(),
                    DB_DATABASE: Joi.string().required(),
                    DB_URL: Joi.string().required(),
                    HASH_ROUNDS: Joi.number().required(),
                    ACCESS_TOKEN_SECRET: Joi.string().required(),
                    REFRESH_TOKEN_SECRET: Joi.string().required(),
                    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
                    AWS_ACCESS_KEY_ID: Joi.string().required(),
                    AWS_REGION: Joi.string().required(),
                    BUCKET_NAME: Joi.string().required(),
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => ({
                    type: configService.get(env_const_1.envVariableKeys.dbType),
                    url: configService.get(env_const_1.envVariableKeys.dbUrl),
                    host: configService.get(env_const_1.envVariableKeys.dbHost),
                    port: configService.get(env_const_1.envVariableKeys.dbPort),
                    username: configService.get(env_const_1.envVariableKeys.dbUsername),
                    password: configService.get(env_const_1.envVariableKeys.dbPassword),
                    database: configService.get(env_const_1.envVariableKeys.dbDatabase),
                    entities: [movie_entity_1.Movie, movie_detail_entity_1.MovieDetail, director_entity_1.Director, genre_entity_1.Genre, user_entity_1.User, movie_user_like_entity_1.MovieUserLike],
                    synchronize: configService.get(env_const_1.envVariableKeys.env) === 'prod'
                        ? false
                        : true,
                    entities: [
                        movie_entity_1.Movie,
                        movie_detail_entity_1.MovieDetail,
                        director_entity_1.Director,
                        genre_entity_1.Genre,
                        user_entity_1.User,
                        movie_user_like_entity_1.MovieUserLike,
                        chat_entity_1.Chat,
                        chat_room_entity_1.ChatRoom,
                    ],
                    synchronize: true,
                }),
                inject: [config_1.ConfigService],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'public'),
                serveRoot: '/public/',
            }),
            cache_manager_1.CacheModule.register({
                ttl: 0,
                isGlobal: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            nest_winston_1.WinstonModule.forRoot({
                level: 'debug',
                transports: [
                    new winston.transports.Console({
                        format: winston.format.combine(winston.format.colorize({
                            all: true,
                        }), winston.format.timestamp(), winston.format.printf((info) => `${info.timestamp} [${info.context}] ${info.level} ${info.message}`)),
                    }),
                    new winston.transports.File({
                        dirname: (0, path_1.join)(process.cwd(), 'logs'),
                        filename: 'logs.log',
                        format: winston.format.combine(winston.format.timestamp(), winston.format.printf((info) => `${info.timestamp} [${info.context}] ${info.level} ${info.message}`)),
                    }),
                ],
            }),
            movie_module_1.MovieModule,
            director_module_1.DirectorModule,
            genre_module_1.GenreModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            chat_module_1.ChatModule,
            config_1.ConditionalModule.registerWhen(worker_module_1.WorkerModule, (env) => env['TYPE'] === 'worker'),
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: rbac_guard_1.RbacGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_time_interceptor_1.ResponseTimeInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: query_failed_filter_1.QueryFailedExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: throttle_interceptor_1.ThrottleInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map