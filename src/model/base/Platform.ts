import { User } from './User';
import { Room } from './Room';
export class Platform {
  // TODO 考虑下，这里的user包不包括已经进入房间的
  static readonly users: {[propName: string]: User} = {};
  static readonly rooms: {[propName: string]: Room} = {};

  static addUser(user: User) {
    Platform.users[user.id] = user;
  }

  static deleteUser(user: User) {
    delete Platform.users[user.id]
  }

  static getUsers() {
    return Object.values(Platform.users);
  }


  static addRoom(room: Room) {
    Platform.rooms[room.id] = room;
  }

  static deleteRoom(room: Room) {
    delete Platform.rooms[room.id]
  }

  static getRooms() {
    return Object.values(Platform.rooms);
  }

  static getRoom(roomId: string) {
    return Platform.rooms[roomId]
  }
}