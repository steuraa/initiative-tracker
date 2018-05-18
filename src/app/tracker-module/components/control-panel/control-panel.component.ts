import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Encounter } from '../../../shared-module/models/encounter';
import { EncounterHero, Hero } from '../../../shared-module/models/hero';
import { EncounterMonster, Monster } from '../../../shared-module/models/monster';
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
  selectedEncounter: any;

  constructor(private storeService: StoreService, private monsterService: MonsterDomainService, private heroService: HeroDomainService,
              private encounterService: EncounterDomainService, private progressEncounterService: ProgressEncounterDomainService,
              private router: Router) {
    this.storeService.singleItemSubject.takeUntil(this.ngUnsubscribe).subscribe(res => {
      this.selectedFeature = res;
    });
    this.storeService.encounterSubject.takeUntil(this.ngUnsubscribe).subscribe((res: Encounter) => {
      this.selectedEncounter = res;
      console.log('selectedEncounter::', this.selectedEncounter);
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

  startEncounter() {
    if (!this.selectedEncounter.original) {
      if (this.selectedEncounter.name && this.selectedEncounter.heroes.length && this.selectedEncounter.monsters.length) {
        const progEnc = {
          name: this.selectedEncounter.name,
          original: this.selectedEncounter._id,
          round: 1,
          heroes: this.selectedEncounter.heroes.map(h => new EncounterHero(h)),
          monsters: this.selectedEncounter.monsters.map(m => new EncounterMonster(m))
        };
        console.log(progEnc);
        this.progressEncounterService.saveProgressEncounter(progEnc).subscribe(res => {
            this.router.navigate(['/encounters/' + res._id]);
          }
        );
      } else {
        console.log('ERROR! SAVE ENCOUNTER!');
      }
    } else {
      this.router.navigate(['/encounters/' + this.selectedEncounter._id]);
    }
  }

  addEncounter() {
    this.storeService.startEncounter();
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
