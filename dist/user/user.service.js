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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entity/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const env_const_1 = require("../common/const/env.const");
const config_1 = require("@nestjs/config");
let UserService = class UserService {
    constructor(userRepository, configService) {
        this.userRepository = userRepository;
        this.configService = configService;
    }
    async create(createUserDto) {
        const { email, password } = createUserDto;
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });
        if (user) {
            throw new common_1.BadRequestException(`이미 가입한 이메일 입니다!`);
        }
        const hash = await bcrypt.hash(password, this.configService.get(env_const_1.envVariableKeys.hashRounds));
        await this.userRepository.save({
            email,
            password: hash,
        });
        return this.userRepository.findOne({
            where: {
                email,
            },
        });
    }
    findAll() {
        return this.userRepository.find();
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({
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
        const user = await this.userRepository.findOne({
            where: {
                id,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`존재하지 않는 사용자입니다!`);
        }
        const hash = await bcrypt.hash(password, this.configService.get(env_const_1.envVariableKeys.hashRounds));
        await this.userRepository.update({ id }, {
            ...updateUserDto,
            password: hash,
        });
        return this.userRepository.findOne({
            where: {
                id,
            },
        });
    }
    async remove(id) {
        const user = await this.userRepository.findOne({
            where: {
                id,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`존재하지 않는 사용자입니다!`);
        }
        await this.userRepository.delete(id);
        return id;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map