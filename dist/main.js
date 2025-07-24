"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const swagger_1 = require("@nestjs/swagger");
const ffmpeg = require("@ffmpeg-installer/ffmpeg");
const ffmpegFluent = require("fluent-ffmpeg");
const ffprobe = require("ffprobe-static");
ffmpegFluent.setFfmpegPath(ffmpeg.path);
ffmpegFluent.setFfprobePath(ffprobe.path);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['verbose'],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('넷플릭스')
        .setDescription('코드팩토리 NestJS 강의!')
        .setVersion('1.0')
        .addBasicAuth()
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('doc', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    app.useLogger(app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map