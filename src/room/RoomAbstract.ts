import { UserAbstract } from '../user/UserAbstract';
import { Message } from '../message/Message';

export class RoomAbstract {
  id: string;
  name: string
  users: {[propName: string]: UserAbstract} = {};

  constructor (roomId?: string, roomName?: string) {
    this.id = roomId || ('room' + Date.now() + Math.random() * 1000)
    this.name = roomName || '房间'
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

  broadcastMsg(msg: Message, excludeUserIds?: string[]) {
    // todo 广播消息
    this.getUsers().forEach(user => {
      if (excludeUserIds && excludeUserIds.includes(user.id)) {
        return;
      }
      user.listen(msg)
    })
  }
}