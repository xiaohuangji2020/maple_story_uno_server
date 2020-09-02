import { BaseCard } from '../card/BaseCard';
import { MessageFactory } from '../message/MessageFactory';
import { UserAbstract } from './UserAbstract'
import { MyGlobal } from '../base/MyGlobal';

export class Player extends UserAbstract{
  cards: BaseCard[] = [];
  ready = 0;
  constructor (conn: any) {
    super(conn);
  }

  notifyUserTurn () {
    this.listen(MessageFactory.IS_YOUR_TURN())
  }

  // 出牌
  playCard (card: BaseCard) {
    const curRoom = MyGlobal.platform.getGameRoom(this.curRoomId)
    curRoom.game.play(card)
  }

  isReady() {
    return this.ready === 1;
  }

  getReady() {
    this.ready = 1;
    const curRoom = MyGlobal.platform.getGameRoom(this.curRoomId)
    curRoom.checkReady();
  }

  cancelReady() {
    this.ready = 0;
  }
}
