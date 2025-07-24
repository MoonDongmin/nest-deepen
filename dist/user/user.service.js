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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const env_const_1 = require("../common/const/env.const");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../common/prisma.service");
let UserService = class UserService {
    constructor(configService, prisma) {
        this.configService = configService;
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const { email, password } = createUserDto;
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (user) {
            throw new common_1.BadRequestException(`이미 가입한 이메일 입니다!`);
        }
        const hash = await bcrypt.hash(password, this.configService.get(env_const_1.envVariableKeys.hashRounds));
        await this.prisma.user.create({
            data: {
                email,
                password: hash,
            },
        });
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
    findAll() {
        return this.prisma.user.findMany();
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`존재하지 않는 사용자입니다!`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const { password } = updateUserDto;
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`존재하지 않는 사용자입니다!`);
        }
        const hash = await bcrypt.hash(password, this.configService.get(env_const_1.envVariableKeys.hashRounds));
        await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                ...updateUserDto,
                password: hash,
            },
        });
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
    async remove(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`존재하지 않는 사용자입니다!`);
        }
        await this.prisma.user.delete({
            where: {
                id,
            },
        });
        return id;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map