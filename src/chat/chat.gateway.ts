import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { UseInterceptors } from '@nestjs/common';
import { WsTransactionInterceptor } from '../common/interceptor/ws-transaction.interceptor';
import { WsQueryRunner } from '../common/decorator/ws-query-runner.decorator';
import { QueryRunner } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';

// controller의 역할을 함
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  handleDisconnect(client: any) {
    const user = client.data.user;
    if (user) {
      this.chatService.removeClient(user.sub);
    }
  }

  // onConnection과 같음 (연결을 검증함. 사용자 검증로직을 넣어야 함)
  async handleConnection(client: Socket) {
    try {
      const rawToken = client.handshake.headers.authorization; // 헤더의 authorization의 키 값을 얻을 수 있음

      const payload = await this.authService.parseBearerToken(rawToken, false);
      if (payload) {
        client.data.user = payload;
        this.chatService.registerClient(payload.sub, client);
        this.chatService.joinUserRooms(payload, client);
      } else {
        client.disconnect();
      }
    } catch (e) {
      console.log(e);
      client.disconnect();
    }
  }

  @SubscribeMessage('sendMessage')
  @UseInterceptors(WsTransactionInterceptor)
  async handleMessage(
    @MessageBody() body: CreateChatDto,
    @ConnectedSocket() client: Socket,
    @WsQueryRunner() qr: QueryRunner,
  ) {
    const payload = client.data.user;
    await this.chatService.createMessage(payload, body, qr);
  }

  // @SubscribeMessage('receiveMessage')
  // async receiveMessage(
  //   @MessageBody() data: { message: string }, // 받기로 한 타입
  //   @ConnectedSocket() client: Socket, // 연결된 사람의 정보
  // ) {
  //   console.log('receiveMessage');
  //   console.log(data);
  //   console.log(client);
  // }

  // @SubscribeMessage('sendMessage')
  // async sendMessage(
  //   @MessageBody() data: { message: string },
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   client.emit('sendMessage', {
  //     ...data,
  //     from: 'server',
  //   });
  //   client.emit('sendMessage', {
  //     ...data,
  //     from: 'server',
  //   });
  //   client.emit('sendMessage', {
  //     ...data,
  //     from: 'server',
  //   });
  // }
}
