import { EncounterHero } from './hero';
import { EncounterMonster } from './monster';

export class Encounter {
  _id?: string;
  type = 'encounter';
  // TODO: remove round from encounter, serves no purpose
  round: number;
  name: string;
  heroes?: Array<EncounterHero>;
  monsters?: Array<EncounterMonster>;

  constructor(json?) {
    if (json && json._id) {
      this._id = json._id;
      this.name = json.name;
      if (!json.round) {
        this.round = 1;
      }
      if (json.heroes && json.heroes.length) {
        this.heroes = [];
        json.heroes.forEach(h => {
          this.heroes.push(new EncounterHero(h));
        });
      }
      if (json.monsters && json.monsters.length) {
        this.monsters = [];
        json.monsters.forEach(m => {
          this.monsters.push(new EncounterMonster(m));
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
