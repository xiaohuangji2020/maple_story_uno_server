import { Game } from '../base/Game';
import { RoomAbstract } from './RoomAbstract';

export class GameRoom extends RoomAbstract{
  game: Game;

  constructor (roomId?: string) {
    super(roomId)
  }
}