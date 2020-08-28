import { Message } from './Message';
import { GameRoom } from '../room/GameRoom';

export class MessageConstants {
  static readonly IS_YOUR_TURN = () => {
    return new Message({
      code: 0,
      type: 20001,
      from: 0,
      body: {}
    }) 
  }

  static readonly TEXT_MESSAGE = (text: string) => {
    return new Message({
      code: 0,
      type: 10005,
      body: { text }
    })
  }

  static readonly ROOM_INFO = (rooms: GameRoom[]) => {
    return new Message({
      code: 0,
      type: 10006,
      body: {
        roomIds: rooms.map((room) => {
          return room.id;
        })
      }
    })
  }
}