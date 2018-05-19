import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
  templateUrl: './encounter-control-panel.component.html',
  styleUrls: ['./encounter-control-panel.component.scss']
})
export class EncounterControlPanelComponent implements OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  currentIndex = 0;
  selectedFeature: Hero | Monster;
  selectedEncounter: Encounter;

  constructor(private storeService: StoreService, private monsterService: MonsterDomainService, private heroService: HeroDomainService,
              private router: Router) {
    this.storeService.encounterSubject.takeUntil(this.ngUnsubscribe).subscribe((res: Encounter) => {
      this.selectedEncounter = res;
    });
    this.storeService.singleItemSubject.takeUntil(this.ngUnsubscribe).subscribe(res => {
      this.selectedFeature = res;
    });
    this.storeService.targetSubject.takeUntil(this.ngUnsubscribe).subscribe(res => {
      if (res) {
        if (res.type === 'hero') {
          this.heroService.getHeroById(res.original_id);
        } else {
          this.monsterService.getMonsterById(res.original_id);
        }
      }
    });
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
