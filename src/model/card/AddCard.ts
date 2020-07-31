import { BaseCard } from './BaseCard';

export class AddCard extends BaseCard {
  constructor (color: number, num: number) {
    super(color, num);
  }

  readonly type: number = 30;

  effect () {
    return this.num;
  }

  canUse (thelastCard: BaseCard) {
    return thelastCard.color === this.color
  }
}