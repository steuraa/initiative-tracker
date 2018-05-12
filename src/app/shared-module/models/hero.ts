export class Hero {
  id: string;
  type = 'hero';
  name: string;
  player?: string;
  creature_class?: string;
  description?: string;
  hp: number;
  ac: number;
  init_mod: number;
  abilities?: Array<any>;

  constructor(json) {
    if (json && json._id) {
      this.id = json._id;
      this.name = json.name;
      this.hp = json.hp;
      this.ac = json.ac;
      if (json.player) {
        this.player = json.player;
      }
      if (json.creature_class) {
        this.init_mod = json.init_mod;
        this.creature_class = json.creature_class;
        this.description = json.description;
        this.abilities = json.abilities;
      }
    }
  }
}
