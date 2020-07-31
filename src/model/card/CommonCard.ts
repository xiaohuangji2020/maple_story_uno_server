import { BaseCard } from './BaseCard';

export class CommonCard extends BaseCard {
  constructor (color: number, num: number) {
    super(color, num);
  }

  readonly type: number = 10;

  effect () {
    return 0;
  }

  canUse (thelastCard: BaseCard) {
    return thelastCard.num === this.num || thelastCard.color === this.color
  }
}