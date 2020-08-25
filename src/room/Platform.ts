import { UserAbstract } from '../user/UserAbstract';
import { GameRoom } from './GameRoom';
import { RoomAbstract } from './RoomAbstract';
export class Platform extends RoomAbstract{

  gameRooms: {[propName: string]: GameRoom} = {};

  constructor() {
    super('1001')
    
  }

  addGameRoom(room: GameRoom) {
    this.gameRooms[room.id] = room;
  }

  deleteGameRoom(room: GameRoom) {
    delete this.gameRooms[room.id]
  }

  getGameRooms() {
    return Object.values(this.gameRooms);
  }

  getGameRoom(roomId: string) {
    return this.gameRooms[roomId]
  }

  getGameRoomIfNot(roomId: string) {
    let room = this.gameRooms[roomId];
    if (!room) {
      room = new GameRoom(roomId)
      this.addGameRoom(room)
    }
    return room;
  }
}