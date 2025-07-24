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
exports.CommonService = void 0;
const common_1 = require("@nestjs/common");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
const config_1 = require("@nestjs/config");
const env_const_1 = require("./const/env.const");
let CommonService = class CommonService {
    constructor(configService) {
        this.configService = configService;
        this.s3 = new client_s3_1.S3({
            credentials: {
                accessKeyId: configService.get(env_const_1.envVariableKeys.awsAccessKeyId),
                secretAccessKey: configService.get(env_const_1.envVariableKeys.awsSecretAccessKey),
            },
            region: configService.get(env_const_1.envVariableKeys.awsRegion),
        });
    }
    async saveMovieToPermanentStorage(fileName) {
        try {
            const bucketName = this.configService.get(env_const_1.envVariableKeys.bucketName);
            await this.s3.copyObject({
                Bucket: bucketName,
                CopySource: `${bucketName}/public/temp/${fileName}`,
                Key: `public/movie/${fileName}`,
                ACL: 'public-read',
            });
            await this.s3.deleteObject({
                Bucket: bucketName,
                Key: `public/temp/${fileName}`,
            });
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(`S3 에러!`);
        }
    }
    async createPresignedUrl(expiresIn = 300) {
        const params = {
            Bucket: this.configService.get(env_const_1.envVariableKeys.bucketName),
            Key: `public/temp/${(0, uuid_1.v4)()}.mp4`,
            ACL: client_s3_1.ObjectCannedACL.public_read,
        };
        try {
            const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, new client_s3_1.PutObjectCommand(params), {
                expiresIn,
            });
            return url;
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(`S3 Presigned URL 생성 실패`);
        }
    }
    applyPagePaginationParamsToQb(qb, dto) {
        const { page, take } = dto;
        const skip = (page - 1) * take;
        qb.take(take);
        qb.skip(skip);
    }
    async applyCursorPaginationParamsToQb(qb, dto) {
        let { cursor, take, order } = dto;
        if (cursor) {
            const decodedCursor = Buffer.from(cursor, 'base64').toString('utf-8');
            const cursorObjc = JSON.parse(decodedCursor);
            order = cursorObjc.order;
            const { values } = cursorObjc;
            const columns = Object.keys(values);
            const comparisonOperator = order.some((o) => o.endsWith('DESC'))
                ? '<'
                : '>';
            const whereConditions = columns.map((c) => `${qb.alias}.${c}`).join(',');
            const whereParams = columns.map((c) => `:${c}`).join(',');
            qb.where(`(${whereConditions}) ${comparisonOperator} (${whereParams})`, values);
        }
        for (let i = 0; i < order.length; i++) {
            const [column, direction] = order[i].split('_');
            if (direction !== 'ASC' && direction !== 'DESC') {
                throw new common_1.BadRequestException(`Order는 ASC 또는 DESC으로 입력해주세요!`);
            }
            if (i === 0) {
                qb.orderBy(`${qb.alias}.${column}`, direction);
            }
            else {
                qb.addOrderBy(`${qb.alias}.${column}`, direction);
            }
        }
        qb.take(take);
        const results = await qb.getMany();
        const nextCursor = this.generateNextCursor(results, order);
        return {
            qb,
            nextCursor,
        };
    }
    generateNextCursor(results, order) {
        if (results.length === 0)
            return null;
        const lastItem = results[results.length - 1];
        const values = {};
        order.forEach((columnOrder) => {
            const [column] = columnOrder.split('_');
            values[column] = lastItem[column];
        });
        const cursorObj = {
            values,
            order,
        };
        const nextCursor = Buffer.from(JSON.stringify(cursorObj)).toString('base64');
        return nextCursor;
    }
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CommonService);
//# sourceMappingURL=common.service.js.map