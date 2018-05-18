export class EncounterMonster {
  type = 'monster';
  id: string;
  original_id: string;
  name: string;
  hp: number;
  max_hp: number;
  ac: number;
  max_ac: number;
  init_mod: number;
  initiative: number;

  constructor(json: any) {
    if (json) {
      if (json.original_id) {
        this.id = json.id;
        this.original_id = json.original_id;
      }
      if (!json.original_id) {
        this.original_id = json.id;
      }
      this.original_id = json.id;
      this.name = json.name;
      this.hp = json.hp;
      this.max_hp = (json.max_hp) ? json.max_hp : json.hp;
      this.ac = json.ac;
      this.max_ac = (json.max_ac) ? json.max_ac : json.ac;
      this.init_mod = json.init_mod;
      this.initiative = (json.initiative) ? json.initiative : 0;
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
