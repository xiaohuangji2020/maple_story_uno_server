import { BaseCard } from './BaseCard';

export class RevertCard extends BaseCard {
  constructor (color: number) {
    super(color, 0);
  }

  readonly type: number = 20;

  effect () {
    return 0;
  }

  canUse (thelastCard: BaseCard) {
    return thelastCard.num === this.num || thelastCard.color === this.color
  }
}