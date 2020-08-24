import { BaseCard } from './BaseCard'
import { CommonCard } from './CommonCard';
import { PassCard } from './PassCard';
import { AddCard } from './AddCard';
import { RevertCard } from './RevertCard';

export class CardFactory {
  static getNewCard (cardObj: object) {
    return new CommonCard(1, 1);
  }
}