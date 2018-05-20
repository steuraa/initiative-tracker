import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncounterHero } from '../../../shared-module/models/hero';
import { EncounterMonster } from '../../../shared-module/models/monster';
import { ProgressEncounter } from '../../../shared-module/models/progressEncounter';
import { EncounterDomainService } from '../../../shared-module/services/encounter-service/encounter-domain.service';
import { StoreService } from '../../../shared-module/services/store-service/store.service';

@Component({
  selector: 'app-central-field',
  templateUrl: './central-encounter-field.component.html',
  styleUrls: ['./central-encounter-field.component.scss']
})
export class CentralEncounterFieldComponent implements OnInit {
  currentIndex = 0;
  encounter: ProgressEncounter;
  participants = Array<(EncounterHero | EncounterMonster)>();
  selected: number;
  showInitiative = false;
  tempHeroes = Array<EncounterHero>();
  tempMonsters = Array<EncounterMonster>();


  constructor(private encounterService: EncounterDomainService, private storeService: StoreService, private route: ActivatedRoute) {
    this.route.data.subscribe((data: { encounter: any }) => {
      this.encounter = new ProgressEncounter(data.encounter.data);
    });
  }

  ngOnInit() {
    if (this.encounter.round === 1 && this.encounter.heroes[0].initiative === 0) {
      this.rollForInitiative();
    } else {
      this.handleParticipantsOrder(this.encounter.heroes, this.encounter.monsters);
    }
  }

  calculateInitiative(init_mod: number) {
    return init_mod + Math.floor(Math.random() * 20);
  }

  changeHp(hp: string, index: number) {
    if (hp) {
      this.selected = undefined;
      const cP = this.participants[index];
      const mHp = cP.max_hp;
      const cHp = cP.hp + parseInt(hp, 10);
      cP.hp = (cHp > mHp) ? mHp : (cHp < 0) ? 0 : cHp;
      this.participants[index].hp = cP.hp;
      this.handleHpChange(cP);
    }
  }

  handleHpChange(cP: (EncounterHero | EncounterMonster)) {
    const cA = (cP.type === 'hero') ? this.encounter.heroes : this.encounter.monsters;
    cA.findIndex((p: (EncounterHero | EncounterMonster)) => {
      if (p._id === cP._id) {
        p.hp = cP.hp;
      }
      return p._id === cP._id;
    });
    console.log(this.encounter);
  }

  handleParticipantsOrder(heroes: any, monsters?: Array<EncounterMonster>) {
    if (!monsters) {
      this.showInitiative = false;
      this.tempMonsters = heroes.monsters;
      this.tempHeroes = heroes.heroes;
    } else {
      this.tempHeroes = heroes;
      this.tempMonsters = monsters;
    }
    this.participants = [...this.tempHeroes, ...this.tempMonsters];
    this.participants.sort(function (a, b) {
      if (a.initiative > b.initiative) {
        return -1;
      }
      if (a.initiative < b.initiative) {
        return 1;
      }
      if (a.initiative === b.initiative) {
        if (a.init_mod > b.init_mod) {
          return -1;
        }
        if (a.init_mod < b.init_mod) {
          return 1;
        }
        return 0;
      }
    });
  }

  rollForInitiative() {
    this.encounter.heroes.forEach(h => {
      const tH = Object.assign({}, h);
      let init = this.calculateInitiative(tH.init_mod);
      init = (init > 20) ? 20 : (init < 0) ? 0 : init;
      tH.initiative = init;
      this.tempHeroes.push(tH);
    });
    this.encounter.monsters.forEach(m => {
      const tM = Object.assign({}, m);
      let init = this.calculateInitiative(tM.init_mod);
      init = (init > 20) ? 20 : (init < 0) ? 0 : init;
      tM.initiative = init;
      this.tempMonsters.push(tM);
    });
    this.showInitiative = true;
  }

  selectTarget(target: any, index: number) {
    this.storeService.passTarget(target);
    this.selected = index;
  }

}
