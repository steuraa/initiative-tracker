import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Encounter } from '../../../shared-module/models/encounter';
import { Hero } from '../../../shared-module/models/hero';
import { Monster } from '../../../shared-module/models/monster';
import { HeroDomainService } from '../../../shared-module/services/hero-service/hero-domain.service';
import { MonsterDomainService } from '../../../shared-module/services/monster-service/monster-domain.service';
import { StoreService } from '../../../shared-module/services/store-service/store.service';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-overview-sidebar',
  templateUrl: './overview-sidebar.component.html',
  styleUrls: ['./overview-sidebar.component.scss']
})
export class OverviewSidebarComponent implements OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  editable = false;
  item: Monster | Hero | Encounter;
  tempItem: any;


  constructor(private heroService: HeroDomainService, private monsterService: MonsterDomainService, private storeService: StoreService) {
    this.storeService.singleItemSubject.takeUntil(this.ngUnsubscribe).subscribe((item: Monster | Hero | Encounter) => {
      this.item = item;
      this.tempItem = Object.assign({}, this.item);
      this.editable = false;
    });
    this.storeService.selectFeatureSubject.takeUntil(this.ngUnsubscribe).subscribe(() => {
      // this.editable = true;
    });
    this.storeService.editFeatureSubject.takeUntil(this.ngUnsubscribe).subscribe(() => {
      this.editable = true;
    });
    this.storeService.closeFeatureSubject.takeUntil(this.ngUnsubscribe).subscribe(() => {
      this.tempItem = undefined;
      this.item = undefined;
    });
  }

  cancel() {
    this.tempItem = Object.assign({}, this.item);
    this.editable = false;
  }

  save() {
    switch (this.tempItem.type) {
      case 'hero': {
        this.heroService.saveHero(this.tempItem);
        break;
      }
      case 'monster': {
        this.monsterService.saveMonster(this.tempItem);
        break;
      }
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
