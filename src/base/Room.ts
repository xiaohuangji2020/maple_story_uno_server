import { Game } from './Game';
import { User } from './User';
import { Message } from '../message/Message';

export class Room {
  id: string;
  game: Game;
  users: {[propName: string]: User} = {};
  messages: Message[];

  constructor (roomId?: string) {
    this.id = roomId || ('room' + Date.now() + Math.random() * 1000)
  }

  addUser(user: User) {
    this.users[user.id] = user;
  }

  deleteUser(user: User) {
    delete this.users[user.id]
  }

  getUsers() {
    return Object.values(this.users);
  }

  broadcastMsg(msg: Message) {
    // todo 广播消息
    this.getUsers().forEach(user => {
      user.listen(msg)
    })
  }
}