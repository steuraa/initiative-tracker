import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Encounter } from '../../../shared-module/models/encounter';
import { EncounterHero, Hero } from '../../../shared-module/models/hero';
import { EncounterMonster, Monster } from '../../../shared-module/models/monster';
import { ProgressEncounter } from '../../../shared-module/models/progressEncounter';
import { EncounterDomainService } from '../../../shared-module/services/encounter-service/encounter-domain.service';
import { HeroDomainService } from '../../../shared-module/services/hero-service/hero-domain.service';
import { MonsterDomainService } from '../../../shared-module/services/monster-service/monster-domain.service';
import { ProgressEncounterDomainService } from '../../../shared-module/services/progressEncounter-service/progressEncounter-domain.service';
import { StoreService } from '../../../shared-module/services/store-service/store.service';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  selectedType = 'hero';
  selectedFeature: Hero | Monster;
  selectedEncounter: Encounter;

  constructor(private storeService: StoreService, private monsterService: MonsterDomainService, private heroService: HeroDomainService,
              private encounterService: EncounterDomainService, private progressEncounterService: ProgressEncounterDomainService) {
    this.storeService.singleItemSubject.takeUntil(this.ngUnsubscribe).subscribe(res => {
      this.selectedFeature = res;
    });
    this.storeService.encounterSubject.takeUntil(this.ngUnsubscribe).subscribe((res: Encounter) => {
      this.selectedEncounter = res;
    });
    this.heroService.getAllHeroes();
  }

  selectFeature() {
    let encounterFeature;
    if (this.selectedFeature.type === 'monster') {
      encounterFeature = new EncounterMonster(this.selectedFeature);
    } else {
      encounterFeature = new EncounterHero(this.selectedFeature);
    }
    this.storeService.selectFeature(encounterFeature);
  }

  closeFeature(evt) {
    this.storeService.closeFeature(evt);
  }

  editFeature(evt) {
    this.storeService.editFeature(evt);
  }

  addEncounter() {
    this.storeService.startEncounter();
  }

  startEncounter(evt) {
    console.log('selectedEncounter:: ', this.selectedEncounter);
    const progEnc: ProgressEncounter = {
      name: this.selectedEncounter.name,
      original: this.selectedEncounter.id,
      round: 1,
      heroes: this.selectedEncounter.heroes,
      monsters: this.selectedEncounter.monsters
    };

    this.progressEncounterService.saveProgressEncounter(progEnc);
  }

  selectType(evt) {
    if (evt === 'monster') {
      this.monsterService.getAllMonsters();
    } else if (evt === 'hero') {
      this.heroService.getAllHeroes();
    } else {
      this.encounterService.getAllEncounters();
      this.progressEncounterService.getAllProgressEncounters();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
