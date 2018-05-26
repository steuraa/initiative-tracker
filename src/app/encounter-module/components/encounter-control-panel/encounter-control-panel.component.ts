import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { EncounterHero } from '../../../shared-module/models/hero';
import { EncounterMonster } from '../../../shared-module/models/monster';
import { ProgressEncounter } from '../../../shared-module/models/progressEncounter';
import { HeroDomainService } from '../../../shared-module/services/hero-service/hero-domain.service';
import { MonsterDomainService } from '../../../shared-module/services/monster-service/monster-domain.service';
import { ProgressEncounterDomainService } from '../../../shared-module/services/progressEncounter-service/progressEncounter-domain.service';
import { RequestError } from '../../../shared-module/services/requestResult/requestError';
import { StoreService } from '../../../shared-module/services/stores/store.service';
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
  errorMessage: string;
  losers: string;
  manualEndRound = false;
  maxIndex: number;
  participants = Array<(EncounterHero | EncounterMonster)>();
  selectedFeature: any;
  showInitiative = false;
  showDelete = false;
  showEndRound = false;
  showError = false;
  showFinished = false;
  showModal = false;
  tempHeroes: Array<EncounterHero> = [];
  tempMonsters: Array<EncounterMonster> = [];

  constructor(private storeService: StoreService, private monsterService: MonsterDomainService, private heroService: HeroDomainService,
              private route: ActivatedRoute, private encounterService: ProgressEncounterDomainService, private router: Router) {
    this.route.data.takeUntil(this.ngUnsubscribe).subscribe(res => {
      this.encounter = new ProgressEncounter(res.encounter);
      this.maxIndex = [...this.encounter.heroes, ...this.encounter.monsters].length - 1;
    });
    this.storeService.errorSubject.takeUntil(this.ngUnsubscribe).subscribe((error: RequestError) => {
      this.handleError(error.errors[0].message);
    });
    this.storeService.playerValuesSubject.takeUntil(this.ngUnsubscribe).subscribe((res: any) => {
      if (res && res.hp) {
        this.changeHp(res.hp, res.index);
      } else if (res && res.hasOwnProperty('disabled')) {
        this.handleDisable(res.disabled, res.index);
      } else {
        this.handleDelete(res.index);
      }
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
      this.handlePlayerChange(cP);
    }
  }

  checkPlayed() {
    return (this.participants.findIndex(p => !p.played) === -1);
  }

  closeError() {
    this.errorMessage = undefined;
    this.showModal = false;
    this.showError = false;
  }

  deletePlayer(doDelete: string) {
    this.showModal = false;
    this.showDelete = false;
    if (doDelete === 'yes') {
      this.participants.splice(this.selectedFeature.tempIndex, 1);
      this.maxIndex = this.participants.length - 1;
      const cA = (this.selectedFeature.type === 'hero') ? this.encounter.heroes : this.encounter.monsters;
      const i = (cA as  Array<any>).findIndex(p => p._id === this.selectedFeature._id);
      cA.splice(i, 1);
      this.saveEncounter();
    }
  }

  endEncounter() {
    this.handleSaveEncounter();
  }

  endRound() {
    this.encounter.round += 1;
    this.manualEndRound = false;
    this.participants.forEach(p => {
      p.played = false;
    });
    this.nextPlayer(true);
    this.saveEncounter();
  }

  handleError(error) {
    this.errorMessage = error;
    this.showModal = true;
    this.showError = true;
  }

  findCurrentIndex() {
    if ((this.participants[this.currentIndex] as EncounterMonster).disabled || this.participants[this.currentIndex].played) {
      this.currentIndex += 1;
      this.findCurrentIndex();
    } else {
      this.passIndex(this.currentIndex);
    }
  }

  handleDelete(i) {
    this.selectedFeature = this.participants[i];
    this.selectedFeature.tempIndex = i;
    this.showModal = true;
    this.showDelete = true;
  }

  handleDisable(disabled, i) {
    (this.participants[i] as EncounterMonster).disabled = disabled;
    this.handlePlayerChange(this.participants[i]);
  }

  handleEndRound(endRound) {
    if (endRound) {
      this.endRound();
    } else {
      this.manualEndRound = true;
      this.nextPlayer();
    }
    this.showModal = false;
    this.showEndRound = false;
  }

  handleFinish(finish: boolean) {
    if (finish) {
      this.router.navigate(['/']);
    } else {
      this.showModal = false;
      this.showFinished = false;
    }
  }

  handlePlayerChange(cP: (EncounterHero | EncounterMonster)): void {
    this.storeService.passParticipants(this.participants);
    const cA = (cP.type === 'hero') ? this.encounter.heroes : this.encounter.monsters;
    const i = (cA as  Array<any>).findIndex(p => p._id === cP._id);
    cA[i] = cP;
    this.saveEncounter();
    if ((cA as  Array<any>).findIndex((p: EncounterHero) => p.hp > 0) === -1) {
      this.showModal = true;
      this.showFinished = true;
      this.losers = cP.type;
    }
    // this.nextPlayer();
  }

  handleSaveEncounter() {
    this.encounter.heroes.forEach((h: EncounterHero) => {
      const cP = (this.participants.find(p => p._id === h._id) as EncounterHero);
      h.played = cP.played;
    });
    this.encounter.monsters.forEach((m: EncounterMonster) => {
      const cP = (this.participants.find(p => p._id === m._id) as EncounterMonster);
      m.played = cP.played;
    });
    console.log('participants::', this.participants);
    console.log('encounter:: ', this.encounter);
    this.saveEncounter(true);
  }

  getFeature(res: (EncounterHero | EncounterMonster), player?: boolean): void {
    if (res.type === 'hero') {
      this.heroService.getHeroById(res.original_id, player);
    } else {
      this.monsterService.getMonsterById(res.original_id, player);
    }
  }

  handleParticipantsOrder(heroes: any, monsters?: Array<EncounterMonster>): void {
    if (!monsters) {
      this.showInitiative = false;
      this.showModal = false;
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
    this.findCurrentIndex();
    this.storeService.passParticipants(this.participants);
    this.getFeature(this.participants[this.currentIndex], true);
    this.encounter.heroes = this.tempHeroes;
    this.encounter.monsters = this.tempMonsters;
    this.saveEncounter();
  }

  nextPlayer(start?: boolean): void {
    this.participants[this.currentIndex].played = !(typeof start === 'boolean');
    if (!this.checkPlayed() || this.manualEndRound) {
      this.currentIndex = (typeof start === 'boolean') ? 0 : (this.currentIndex !== this.maxIndex) ? (this.currentIndex + 1) : 0;
      if ((this.participants[this.currentIndex] as EncounterMonster).disabled) {
        this.nextPlayer();
      } else {
        this.passIndex(this.currentIndex);
        const cP = this.participants[this.currentIndex];
        this.getFeature(cP, true);
      }
    } else {
      this.showModal = true;
      this.showEndRound = true;
    }
  }

  rollForInitiative(): void {
    this.encounter.heroes.forEach(h => {
      const tH = Object.assign({}, h);
      let init = this.calculateInitiative(tH.init_mod);
      init = (init > 20) ? 20 : (init < 1) ? 1 : init;
      tH.initiative = init;
      this.tempHeroes.push(tH);
    });
    this.encounter.monsters.forEach(m => {
      const tM = Object.assign({}, m);
      let init = this.calculateInitiative(tM.init_mod);
      init = (init > 20) ? 20 : (init < 1) ? 1 : init;
      tM.initiative = init;
      this.tempMonsters.push(tM);
    });
    this.showModal = true;
    this.showInitiative = true;
  }

  prevPlayer(): void {
    this.participants[this.currentIndex].played = true;
    this.currentIndex = (this.currentIndex !== 0) ? (this.currentIndex - 1) : this.maxIndex;
    if ((this.participants[this.currentIndex] as EncounterMonster).disabled) {
      this.prevPlayer();
    } else {
      this.passIndex(this.currentIndex);
      const cP = this.participants[this.currentIndex];
      this.getFeature(cP, true);
    }
  }

  passIndex(i) {
    if (i !== undefined) {
      this.storeService.passIndex(i);
    }
  }

  saveEncounter(final?: boolean) {
    this.encounterService.saveProgressEncounter(this.encounter).takeUntil(this.ngUnsubscribe).subscribe(res => {
      this.encounter = res;
      if (final) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
