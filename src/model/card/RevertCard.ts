import { BaseCard } from './BaseCard';
import { Game } from '../base/Game';
import { Situation } from '../base/Situation';

export class RevertCard extends BaseCard {
  constructor (color: number) {
    super(color, -1);
  }

  readonly type: number = 20;

  effect (situation: Situation) {
    situation.num = this.num;
    situation.color = this.color;
  }

  canUse (thelastCard: BaseCard) {
    return thelastCard.num === this.num || thelastCard.color === this.color
  }
}