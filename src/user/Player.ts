import { BaseCard } from '../card/BaseCard';
import { MessageConstants } from '../message/MessageConstants';
import { Platform } from '../room/Platform';
import { UserAbstract } from './UserAbstract'
import { MyGlobal } from '../base/MyGlobal';

export class Player extends UserAbstract{
  cards: BaseCard[] = [];
  constructor (conn: any) {
    super(conn);
  }

  notifyUserTurn () {
    this.listen(MessageConstants.IS_YOUR_TURN())
  }

  // 出牌
  playCard (card: BaseCard) {
    const curRoom = MyGlobal.platform.getGameRoom(this.curRoomId)
    curRoom.game.play(card)
  }
}
