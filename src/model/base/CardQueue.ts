import { BaseCard } from '../card/BaseCard'
import { Constant } from './Constant';
import { CommonCard } from '../card/CommonCard';
import { PassCard } from '../card/PassCard';
import { AddCard } from '../card/AddCard';
import { RevertCard } from '../card/RevertCard';

export class CardQueue {
  cardQueue: BaseCard[];

  generateCards () {
    const cardQueue = []
    Constant.CARD_COLORS.forEach((color) => {
      // 普通卡
      Constant.CARD_NUMBERS.forEach((number) => {
        cardQueue.push(new CommonCard(color, number))
      })
      // 跳过卡
      for(let i = 0; i < Constant.EACH_COLOR_PASS_CARD_COUNT; i++) {
        cardQueue.push(new PassCard(color))
      }
      // 反转卡
      for(let i = 0; i < Constant.EACH_COLOR_REVERT_CARD_COUNT; i++) {
        cardQueue.push(new RevertCard(color))
      }
      // 加牌卡
      Constant.ADD_CARDS.forEach((number) => {
        cardQueue.push(new AddCard(color, number))
      })
      // 骑士魔法卡
    })
    cardQueue.sort((x, y) => {return x.random - y.random;})
    this.cardQueue = cardQueue
  }

  shiftCards (num: number) {
    let cards = [];
    if (this.cardQueue.length < num) {
      cards = this.cardQueue;
      num -= this.cardQueue.length;
      this.generateCards();
    }
    cards.push(...this.cardQueue.splice(0, num));
    return cards
  }
}