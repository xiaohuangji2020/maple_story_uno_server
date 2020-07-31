import { BaseCard } from './BaseCard';

export class SPCard extends BaseCard {
  constructor () {
    super(0, 0);
  }

  readonly type: number = 40;

  effect () {
    return this.num;
  }

  canUse (thelastCard: BaseCard) {
    return true;
  }
}