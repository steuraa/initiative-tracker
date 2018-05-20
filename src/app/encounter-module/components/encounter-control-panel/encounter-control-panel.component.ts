import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { EncounterHero } from '../../../shared-module/models/hero';
import { EncounterMonster } from '../../../shared-module/models/monster';
import { ProgressEncounter } from '../../../shared-module/models/progressEncounter';
import { EncounterDomainService } from '../../../shared-module/services/encounter-service/encounter-domain.service';
import { HeroDomainService } from '../../../shared-module/services/hero-service/hero-domain.service';
import { MonsterDomainService } from '../../../shared-module/services/monster-service/monster-domain.service';
import { ProgressEncounterDomainService } from '../../../shared-module/services/progressEncounter-service/progressEncounter-domain.service';
import { StoreService } from '../../../shared-module/services/store-service/store.service';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-control-panel',
  templateUrl: './encounter-control-panel.component.html',
  styleUrls: ['./encounter-control-panel.component.scss']
})
export class EncounterControlPanelComponent implements OnDestroy, OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  currentIndex = 0;
  encounter: ProgressEncounter;
  maxIndex: number;
  participants = Array<(EncounterHero | EncounterMonster)>();
  selectedFeature: (EncounterHero | EncounterMonster);
  showInitiative = false;
  tempHeroes = Array<EncounterHero>();
  tempMonsters = Array<EncounterMonster>();

  constructor(private storeService: StoreService, private monsterService: MonsterDomainService, private heroService: HeroDomainService,
              private route: ActivatedRoute, private encounterService: ProgressEncounterDomainService) {
    this.route.data.takeUntil(this.ngUnsubscribe).subscribe(res => {
      this.encounter = new ProgressEncounter(res.encounter.data);
      this.maxIndex = [...this.encounter.heroes, ...this.encounter.monsters].length - 1;
    });
    this.storeService.encounterSubject.takeUntil(this.ngUnsubscribe).subscribe((res: ProgressEncounter) => {
      this.encounter = res;
    });
    this.storeService.healthSubject.takeUntil(this.ngUnsubscribe).subscribe((res: any) => {
      this.changeHp(res.hp, res.index);
    });
    this.storeService.singleItemSubject.takeUntil(this.ngUnsubscribe).subscribe(res => {
      this.selectedFeature = res;
    });
    this.storeService.targetSubject.takeUntil(this.ngUnsubscribe).subscribe(res => {
      if (res) {
        this.getFeature(res);
      }
    });
  }

  ngOnInit() {
    if (this.encounter.round === 1 && this.encounter.heroes[0].initiative === 0) {
      this.rollForInitiative();
    } else {
      this.handleParticipantsOrder(this.encounter.heroes, this.encounter.monsters);
    }
  }

  calculateInitiative(init_mod: number): number {
    return init_mod + Math.floor(Math.random() * 20);
  }

  changeHp(hp: string, index: number): void {
    if (hp) {
      // this.selected = undefined;
      const cP = this.participants[index];
      const mHp = cP.max_hp;
      const cHp = cP.hp + parseInt(hp, 10);
      cP.hp = (cHp > mHp) ? mHp : (cHp < 0) ? 0 : cHp;
      this.participants[index].hp = cP.hp;
      this.storeService.passParticipants(this.participants);
      this.handleHpChange(cP);
    }
  }

  handleHpChange(cP: (EncounterHero | EncounterMonster)): void {
    const cA = (cP.type === 'hero') ? this.encounter.heroes : this.encounter.monsters;
    const i = cA.findIndex((p: (EncounterHero | EncounterMonster)) => {
      return p._id === cP._id;
    });
    cA[i].hp = cP.hp;
    this.encounterService.saveProgressEncounter(this.encounter);
  }

  getFeature(res: (EncounterHero|EncounterMonster), player?: boolean): void {
    if (res.type === 'hero') {
      this.heroService.getHeroById(res.original_id, player);
    } else {
      this.monsterService.getMonsterById(res.original_id, player);
    }
  }

  handleParticipantsOrder(heroes: any, monsters?: Array<EncounterMonster>): void {
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
    this.storeService.passParticipants(this.participants);
    this.getFeature(this.participants[0], true);
    this.encounter.heroes = this.tempHeroes;
    this.encounter.monsters = this.tempMonsters;
    this.encounterService.saveProgressEncounter(this.encounter);
  }

  nextPlayer(): void {
    this.currentIndex = (this.currentIndex !== this.maxIndex) ? (this.currentIndex + 1) : 0;
    this.passIndex(this.currentIndex);
    const cP = this.participants[this.currentIndex];
    this.getFeature(cP, true);
  }

  rollForInitiative(): void {
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

  prevPlayer(): void {
    this.currentIndex = (this.currentIndex !== 0) ? (this.currentIndex - 1) : this.maxIndex;
    this.passIndex(this.currentIndex);
    const cP = this.participants[this.currentIndex];
    this.getFeature(cP, true);
  }

  passIndex(i) {
    if (i !== undefined) {
      this.storeService.passIndex(i);
    }
  }

  passParticipant(p) {
    if (p) {
      this.storeService.passParticipants(p);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
