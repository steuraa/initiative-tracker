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
import { RequestError } from '../../../shared-module/services/requestResult/requestError';
import { StoreService } from '../../../shared-module/services/stores/store.service';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  erroMessage: string;
  selectedType = 'hero';
  selectedFeature: Hero | Monster;
  selectedEncounter: any;
  showError = false;
  showModal = false;
  showRestart = false;

  constructor(private storeService: StoreService, private monsterService: MonsterDomainService, private heroService: HeroDomainService,
              private encounterService: EncounterDomainService, private progressEncounterService: ProgressEncounterDomainService,
              private router: Router) {
    this.storeService.singleItemSubject.takeUntil(this.ngUnsubscribe).subscribe(res => {
      this.selectedFeature = res;
      if (this.selectedType === this.selectedFeature.type) {
        this.getList(this.selectedType);
      }
    });
    this.storeService.errorSubject.takeUntil(this.ngUnsubscribe).subscribe((error: RequestError) => {
      this.handleError(error.errors[0].message);
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
    this.storeService.saveEncounterSubject.subscribe((res) => {
      this.saveEncounter(res);
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

  closeError() {
    this.showModal = false;
    this.showError = false;
  }

  closeFeature(evt) {
    this.selectedFeature = undefined;
    this.storeService.closeFeature(evt);
  }

  editFeature(evt) {
    this.storeService.editFeature(evt);
  }

  handleError(error) {
    this.erroMessage = error;
    this.showModal = true;
    this.showError = true;
  }

  handleProgressEncounter(restart) {
    if (!restart) {
      this.showModal = false;
      this.showRestart = false;
      this.router.navigate(['/encounters/' + this.selectedEncounter._id]);
    } else {
      let realName = this.selectedEncounter.name;
      if (isNaN(parseInt(realName.substr(-1), 10))) {
        realName = realName + 2;
      } else {
        const i = parseInt(realName.substr(-1), 10) + 1;
        realName = realName.slice(0, -1);
        realName = realName + i;
      }
      this.encounterService.getEncounterById(this.selectedEncounter.original).subscribe((res: Encounter) => {
        const progEnc = {
          name: realName,
          original: res._id,
          round: 1,
          heroes: res.heroes.map(h => new EncounterHero(h)),
          monsters: res.monsters.map(m => new EncounterMonster(m))
        };
        this.progressEncounterService.saveProgressEncounter(progEnc).subscribe(enc => {
            this.router.navigate(['/encounters/' + enc._id]);
          }
        );
      });
    }
  }

  startEncounter() {
    if (this.selectedEncounter && !this.selectedEncounter.original) {
      if (this.selectedEncounter.name && this.selectedEncounter.heroes.length && this.selectedEncounter.monsters.length) {
        const progEnc = {
          name: this.selectedEncounter.name + ' - progress',
          original: this.selectedEncounter._id,
          round: 1,
          heroes: this.selectedEncounter.heroes.map(h => new EncounterHero(h)),
          monsters: this.selectedEncounter.monsters.map(m => new EncounterMonster(m))
        };
        this.progressEncounterService.saveProgressEncounter(progEnc).subscribe(res => {
            this.router.navigate(['/encounters/' + res._id]);
          }
        );
      } else {
        console.log('ERROR! SAVE ENCOUNTER!');
      }
    } else {
      this.showModal = true;
      this.showRestart = true;
    }
  }

  getFeature(feat: (Hero | Monster)) {
    if (feat._id) {
      if (feat.type === 'monster') {
        this.monsterService.getMonsterById(feat._id);
      } else if (feat.type === 'hero') {
        this.heroService.getHeroById(feat._id);
      } else if (feat.type === 'encounter') {
        this.encounterService.getEncounterById(feat._id).subscribe();
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

  saveEncounter(encounter) {
    this.encounterService.saveEncounter(encounter);
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
