import { BaseCard } from '../card/BaseCard';

export class User {
  id: number;
  name: string;
  avatar: string;
  
  cards: BaseCard[] = [];
}
