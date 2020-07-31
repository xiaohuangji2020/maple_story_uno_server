import { BaseCardBO } from '../card/BaseCardBO';

export class User {
  id: number;
  name: string;
  avatar: string;
  
  cards: BaseCardBO[] = [];
}
