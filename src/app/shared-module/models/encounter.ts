import { Hero } from './hero';
import { Monster } from './monster';

export class Encounter {
  id?: string;
  type = 'encounter';
  round: number;
  name: string;
  heroes?: Array<Hero>;
  monsters?: Array<Monster>;

  constructor(json?) {
    if (json && json._id) {
      this.id = json._id;
      this.name = json.name;
      if (!json.round) {
        this.round = 1;
      }
      if (json.heroes && json.heroes.length) {
        this.heroes = [];
        json.heroes.forEach(h => {
          this.heroes.push(new Hero(h));
        });
      }
      if (json.monsters && json.monsters.length) {
        this.monsters = [];
        json.monsters.forEach(m => {
          this.monsters.push(new Monster(m));
        });
      }
    } else {
      this.name = '';
      this.round = 1;
      this.heroes = [];
      this.monsters = [];
    }
  }
}
