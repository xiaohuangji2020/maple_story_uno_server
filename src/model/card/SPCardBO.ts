import { BaseCard } from './BaseCard';
import { Situation } from '../base/Situation';

export class SPCard extends BaseCard {
  constructor () {
    super(0, 0);
  }

  readonly type: number = 40;

  effect (situation: Situation) {
    situation.num = this.num;
    situation.color = this.color;
    // todo 补全特效
  }

  canUse (thelastCard: BaseCard) {
    return true;
  }
}