import { BaseCard } from './BaseCard';
import { Situation } from '../base/Situation';

export class AddCard extends BaseCard {
  constructor (color: number, num: number) {
    super(color, num);
  }

  readonly type: number = 30;

  effect (situation: Situation) {
    situation.num = this.num;
    situation.color = this.color;
    situation.total += this.num;
  }

  canUse (thelastCard: BaseCard) {
    return thelastCard.color === this.color
  }
}