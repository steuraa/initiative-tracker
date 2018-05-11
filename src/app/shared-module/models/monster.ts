export class Monster {
  id: string;
  type = 'monster';
  name: string;
  creature_class?: string;
  description?: string;
  hp: number;
  ac: number;
  init_mod: number;
  abilities?: Array<any> = [];

  constructor(json: any) {
    if (json && json._id) {
      this.id = json._id;
      this.name = json.name;
      this.creature_class = json.creature_class;
      this.description = json.description;
      this.hp = json.hp;
      this.ac = json.ac;
      this.init_mod = json.init_mod;
      if (json.abilities) {
        this.abilities = json.abilities;
      }
    }
  }
}
