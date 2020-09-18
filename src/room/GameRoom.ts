import { Game } from '../base/Game';
import { RoomAbstract } from './RoomAbstract';
import { Player } from '../user/Player';
import { MessageFactory } from '../message/MessageFactory';

export class GameRoom extends RoomAbstract{
  game: Game;
  readyStatus = 0;
  gameStatus = 0;

  constructor (roomId?: string, roomName?: string) {
    super(roomId, roomName)
  }

  async checkReady() {
    this.readyStatus = Number(!this.getUsers().some(user => {
      if (!(user instanceof Player)) {
        return false
      }
      return !user.isReady();
    }))
    if (this.readyStatus) {
      this.broadcastMsg(MessageFactory.ALL_USER_READY());
      this.initGame();
    }
  }

  initGame() {}
}