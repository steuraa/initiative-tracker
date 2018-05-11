import { Hero } from './hero';
import { Monster } from './monster';

export class Encounter {
  id: string;
  type = 'encounter';
  name: string;
  heroes?: Array<Hero> = [];
  monsters?: Array<Monster> = [];

  constructor(json) {
    if (json && json._id) {
      this.id = json._id;
      this.name = json.name;
      if (json.heroes.length) {
        json.heroes.forEach(h => {
          this.heroes.push(new Hero(h));
        });
      }
      if (json.monsters.length) {
        json.monsters.forEach(h => {
          this.monsters.push(new Monster(h));
        });
      }
    }
  }
}
