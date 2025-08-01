import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { envVariableKeys } from '../common/const/env.const';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { UserService } from '../user/user.service';
import { Role } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManger: Cache,
    // private readonly prisma: PrismaService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async tokenBlock(token: string) {
    const payload = this.jwtService.decode(token);

    const expiryDate = +new Date(payload['exp'] * 1000);
    const now = +Date.now();

    const differenceInSeconds = (expiryDate - now) / 1000;
    await this.cacheManger.set(
      `BLOCK_TOKEN_${token}`,
      payload,
      Math.max(differenceInSeconds * 1000, 1),
    );

    return true;
  }

  parseBasicToken(rawToken: string) {
    // 1) 토큰을 ' ' 기준으로 스플릿 한 후 토큰 값만 추출하기
    // ['Basic', '$token']이 들어와야 함.
    const basicSplit = rawToken.split(' ');

    if (basicSplit.length !== 2) {
      throw new BadRequestException(`토큰 포맷이 잘못됐습니다!`);
    }

    const [basic, token] = basicSplit;
    if (basic.toLowerCase() !== 'basic') {
      throw new BadRequestException(`토큰 포맷이 잘못됐습니다!`);
    }

    // 2) 추출한 토큰을 base64 디코딩해서 이메일과 비밀번호로 나눔
    const decoded = Buffer.from(token, 'base64').toString('utf-8');

    // "email:password"로 변환된 -> 이를 스플릿 해야 함
    const tokenSplit = decoded.split(':');
    if (tokenSplit.length !== 2) {
      throw new BadRequestException(`토큰 포맷이 잘못됐습니다!`);
    }

    const [email, password] = tokenSplit;
    return {
      email,
      password,
    };
  }

  async parseBearerToken(rawToken: string, isRefreshToken: boolean) {
    const basicSplit = rawToken.split(' ');

    if (basicSplit.length !== 2) {
      throw new BadRequestException(`토큰 포맷이 잘못됐습니다!`);
    }

    const [bearer, token] = basicSplit;

    if (bearer.toLowerCase() !== 'bearer') {
      throw new BadRequestException(`토큰 포맷이 잘못됐습니다!`);
    }

    try {
      // decode: 검증은 안하고, payload만 가져오는 것.
      // verify: payload도 들고오고, 검증도 해줌
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>(
          isRefreshToken
            ? envVariableKeys.refreshTokenSecret
            : envVariableKeys.accessTokenSecret,
        ),
      });

      if (isRefreshToken) {
        if (payload.type !== 'refresh') {
          throw new BadRequestException(`Refresh 토튼을 입력해주세요!`);
        }
      } else {
        if (payload.type !== 'access') {
          throw new BadRequestException(`Access 토튼을 입력해주세요!`);
        }
      }

      return payload;
    } catch (e) {
      throw new UnauthorizedException(`토큰이 만료됐습니다!`);
    }
  }

  // rawToken -> "Basic $token'
  async register(rawToken: string) {
    const { email, password } = this.parseBasicToken(rawToken);

    return this.userService.create({
      email,
      password,
    });
  }

  async authenticate(email: string, password: string) {
    const user = await this.userModel.findOne(
      {
        email,
      },
      {
        password: 1,
        role: 1,
      },
    );

    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     email,
    //   },
    //   select: {
    //     id: true,
    //     password: true,
    //     role: true,
    //   },
    // });

    // const user = await this.userRepository.findOne({
    //   where: {
    //     email,
    //   },
    // });

    if (!user) {
      throw new BadRequestException(`잘못된 로그인 정보입니다.`);
    }

    const passOk = await bcrypt.compare(password, user.password);

    if (!passOk) {
      throw new BadRequestException(`잘못된 로그인 정보입니다.`);
    }

    return user;
  }

  async issueToken(user: { _id: any; role: Role }, isRefreshToken: boolean) {
    const refreshTokenSecret = this.configService.get<string>(
      envVariableKeys.refreshTokenSecret,
    );

    const accessTokenSecret = this.configService.get<string>(
      envVariableKeys.accessTokenSecret,
    );

    return this.jwtService.signAsync(
      {
        sub: user._id,
        role: user.role,
        type: isRefreshToken ? 'refresh' : 'access',
      },
      {
        secret: isRefreshToken ? refreshTokenSecret : accessTokenSecret,
        expiresIn: isRefreshToken ? '24h' : '1h',
      },
    );
  }

  async login(rawToken: string) {
    const { email, password } = this.parseBasicToken(rawToken);

    const user = await this.authenticate(email, password);

    return {
      refreshToken: await this.issueToken(user, true),
      accessToken: await this.issueToken(user, false),
    };
  }
}
