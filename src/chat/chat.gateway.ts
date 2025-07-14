import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';

// controller의 역할을 함
@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('receiveMessage')
  async receiveMessage(
    @MessageBody() data: { message: string }, // 받기로 한 타입
    @ConnectedSocket() client: Socket, // 연결된 사람의 정보
  ) {
    console.log('receiveMessage');
    console.log(data);
    console.log(client);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody() data: { message: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('sendMessage', {
      ...data,
      from: 'server',
    });
    client.emit('sendMessage', {
      ...data,
      from: 'server',
    });
    client.emit('sendMessage', {
      ...data,
      from: 'server',
    });
  }
}
