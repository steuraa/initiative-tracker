import { EncounterHero } from './hero';
import { EncounterMonster } from './monster';

export class ProgressEncounter {
  _id?: string;
  type ? = 'progressEncounter';
  original: string;
  round: number;
  name: string;
  heroes: Array<EncounterHero>;
  monsters: Array<EncounterMonster>;

  constructor(json?) {
    if (json) {
      this._id = json._id;
      this.name = json.name;
      this.original = json.original;
      if (!json.round) {
        this.round = 1;
      } else {
        this.round = json.round;
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
    }
  }
}
