import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTable } from '../../common/entity/base-table.entity';
import { Exclude } from 'class-transformer';
import { Movie } from '../../movie/entity/movie.entity';
import { MovieUserLike } from '../../movie/entity/movie-user-like.entity';
import { Chat }     from '../../chat/entity/chat.entity';
import { ChatRoom } from '../../chat/entity/chat-room.entity';

export enum Role {
  admin,
  paidUser,
  user,
}

@Entity()
export class User extends BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude({
    // 응답을 할 때
    toPlainOnly: true,
    // toClassOnly -> 요청을 할 때
  })
  password: string;

  @Column({
    enum: Role,
    default: Role.user,
  })
  role: Role;

  @OneToMany(() => Movie, (movie) => movie.creator)
  createdMovies: Movie[];

  @OneToMany(() => MovieUserLike, (mul) => mul.user)
  likedMovies: MovieUserLike[];

  @OneToMany(() => Chat, (chat) => chat.author)
  chats: Chat[];

  @ManyToMany(() => ChatRoom, (chatRoom) => chatRoom.users)
  chatRooms: ChatRoom[];
}
