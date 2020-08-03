import { BaseCard } from './BaseCard';
import { Situation } from '../base/Situation';

export class PassCard extends BaseCard {
  constructor (color: number) {
    super(color, 0);
  }

  readonly type: number = 30;

  effect (situation: Situation) {
    situation.num = this.num;
    situation.color = this.color;
  }

  canUse (thelastCard: BaseCard) {
    return thelastCard.num === this.num || thelastCard.color === this.color
  }
}