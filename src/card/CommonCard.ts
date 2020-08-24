import { BaseCard } from './BaseCard';
import { Situation } from '../base/Situation';

export class CommonCard extends BaseCard {
  constructor (color: number, num: number) {
    super(color, num);
  }

  readonly type: number = 10;

  effect (situation: Situation) {
    situation.num = this.num;
    situation.color = this.color;
  }

  canUse (thelastCard: BaseCard) {
    return thelastCard.num === this.num || thelastCard.color === this.color
  }
}