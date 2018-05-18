import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Encounter } from '../../../shared-module/models/encounter';
import { Hero } from '../../../shared-module/models/hero';
import { Monster } from '../../../shared-module/models/monster';
import { EncounterDomainService } from '../../../shared-module/services/encounter-service/encounter-domain.service';
import { HeroDomainService } from '../../../shared-module/services/hero-service/hero-domain.service';
import { MonsterDomainService } from '../../../shared-module/services/monster-service/monster-domain.service';
import { StoreService } from '../../../shared-module/services/store-service/store.service';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-selection-sidebar',
  templateUrl: './selection-sidebar.component.html',
  styleUrls: ['./selection-sidebar.component.scss']
})
export class SelectionSidebarComponent implements OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  itemsToDisplay: Array<any>;
  type: string;

  constructor(private storeService: StoreService, private monsterService: MonsterDomainService, private heroService: HeroDomainService,
              private encounterService: EncounterDomainService) {
    this.storeService.listSubject.takeUntil(this.ngUnsubscribe).subscribe(list => {
      if (list) {
        this.itemsToDisplay = list;
        if (this.itemsToDisplay[0] && this.itemsToDisplay[0].type) {
          this.type = this.itemsToDisplay[0].type;
        }
      }
    });
  }

  createNew() {
    switch (this.type) {
      case 'monster': {
        this.storeService.passSingleItem(new Monster({}));
        break;
      }
      case 'hero': {
        this.storeService.passSingleItem(new Hero({}));
        break;
      }
      default: {
        this.storeService.passEncounter(new Encounter({}));
      }
    }
  }

  itemSelected(evt: Monster | Hero) {
    if (evt.type === 'monster') {
      this.monsterService.getMonsterById(evt._id);
    } else if (evt.type === 'hero') {
      this.heroService.getHeroById(evt._id);
    } else {
      this.encounterService.getEncounterById(evt._id);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
