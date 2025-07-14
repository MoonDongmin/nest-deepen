import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
export declare class ChatGateway {
    private readonly chatService;
    constructor(chatService: ChatService);
    receiveMessage(data: {
        message: string;
    }, client: Socket): Promise<void>;
    sendMessage(data: {
        message: string;
    }, client: Socket): Promise<void>;
}
