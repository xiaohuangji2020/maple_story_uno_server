import { User } from './user';
import { CardQueue } from './CardQueue';

export class Game {
  direction: boolean; // true顺时针，false逆时针
  totalEffect: number; // 说是effect，实际就是加多少张牌
  curUser: User;
  cardQueue: CardQueue;

  affect () {
    const cards = this.cardQueue.shiftCards(this.totalEffect)
    console.debug(cards)
    this.curUser.cards.push(...cards);
    this.clearEffect();
  }

  clearEffect () {
    this.totalEffect = 0;
  }
}