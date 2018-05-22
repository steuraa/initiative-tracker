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
import { StoreService } from '../../../shared-module/services/stores/store.service';
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
      if (this.selectedType === this.selectedFeature.type) {
        this.getList(this.selectedType);
      }
    });
    this.storeService.selectedFeatureSubject.takeUntil(this.ngUnsubscribe).subscribe(feat => {
      this.getFeature(feat);
    });
    this.storeService.encounterSubject.takeUntil(this.ngUnsubscribe).subscribe((res: Encounter) => {
      this.selectedEncounter = res;
    });
    this.storeService.saveFeatureSubject.takeUntil(this.ngUnsubscribe).subscribe((feat: (Hero | Monster)) => {
      this.saveFeature(feat);
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
    this.storeService.addFeatureToEncounter(encounterFeature);
  }

  closeFeature(evt) {
    this.selectedFeature = undefined;
    this.storeService.closeFeature(evt);
  }

  editFeature(evt) {
    this.storeService.editFeature(evt);
  }

  startEncounter() {
    if (this.selectedEncounter && !this.selectedEncounter.original) {
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

  getFeature(feat: (Hero | Monster)) {
    if (feat._id) {
      if (feat.type === 'monster') {
        this.monsterService.getMonsterById(feat._id);
      } else if (feat.type === 'hero') {
        this.heroService.getHeroById(feat._id);
      } else if (feat.type === 'encounter') {
        this.encounterService.getEncounterById(feat._id);
      } else {
        this.progressEncounterService.getProgressEncounterById(feat._id).subscribe();
      }
    } else {
      if (feat.type === 'monsters') {
        this.storeService.passSingleItem(new Monster({}));
      } else if (feat.type === 'heroes') {
        this.storeService.passSingleItem(new Hero({}));
      } else {
        this.storeService.passEncounter(new Encounter({}));
      }
    }
  }

  saveFeature(feat: (Hero | Monster)) {
    (feat.type === 'hero') ? this.heroService.saveHero(feat) : this.monsterService.saveMonster(feat);
  }

  getList(evt) {
    if (evt === 'monster') {
      this.monsterService.getAllMonsters();
    } else if (evt === 'hero') {
      this.heroService.getAllHeroes();
    } else {
      this.encounterService.getAllEncounters();
      this.progressEncounterService.getAllProgressEncounters();
    }
    this.selectedType = evt;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
