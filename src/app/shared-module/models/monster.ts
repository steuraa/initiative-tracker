export class EncounterMonster {
  type = 'monster';
  name: string;
  hp: number;
  ac: number;
  init_mod: number;

  constructor(json: any) {
    if (json) {
      this.name = json.name;
      this.hp = json.hp;
      this.ac = json.ac;
      this.init_mod = json.init_mod;
    }
  }
}

export class Monster {
  id: string;
  type = 'monster';
  name: string;
  avatar?: string;
  creature_class?: string;
  description?: string;
  hp: number;
  ac: number;
  init_mod: number;
  abilities?: Array<any>;

  constructor(json: any) {
    if (json && json._id) {
      this.id = json._id;
      this.name = json.name;
      this.hp = json.hp;
      this.ac = json.ac;
      if (json.avatar) {
        this.avatar = json.avatar;
      }
      if (json.creature_class) {
        this.init_mod = json.init_mod;
        this.creature_class = json.creature_class;
        this.description = json.description;
        this.abilities = json.abilities;
      }
    } else if (json) {
      this.name = json.name;
      this.hp = json.hp;
      this.ac = json.ac;
      this.init_mod = json.init_mod;
    }
  }
}
