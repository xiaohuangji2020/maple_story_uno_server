import { UserAbstract } from '../user/UserAbstract';
import { Message } from '../message/Message';

export class RoomAbstract {
  id: string;
  users: {[propName: string]: UserAbstract} = {};

  constructor (roomId?: string) {
    this.id = roomId || ('room' + Date.now() + Math.random() * 1000)
  }

  addUser(user: UserAbstract) {
    this.users[user.id] = user;
  }

  deleteUser(user: UserAbstract) {
    delete this.users[user.id]
  }

  getUsers() {
    return Object.values(this.users);
  }

  getUser(userId: string) {
    return this.users[userId]
  }

  userCount() {
    return Object.keys(this.users).length;
  }

  broadcastMsg(msg: Message) {
    // todo 广播消息
    this.getUsers().forEach(user => {
      user.listen(msg)
    })
  }
}