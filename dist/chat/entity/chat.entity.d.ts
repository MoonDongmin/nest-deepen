import { BaseTable } from '../../common/entity/base-table.entity';
import { User } from '../../user/entity/user.entity';
import { ChatRoom } from './chat-room.entity';
export declare class Chat extends BaseTable {
    id: number;
    author: User;
    message: string;
    chatRoom: ChatRoom;
}
