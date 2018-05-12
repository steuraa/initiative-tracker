import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Hero } from '../../../shared-module/models/hero';
import { Monster } from '../../../shared-module/models/monster';
import { StoreService } from '../../../shared-module/services/store-service/store.service';
import { MonsterDomainService } from '../../../shared-module/services/monster-service/monster-domain.service';
import { HeroDomainService } from '../../../shared-module/services/hero-service/hero-domain.service';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-selection-sidebar',
  templateUrl: './selection-sidebar.component.html',
  styleUrls: ['./selection-sidebar.component.scss']
})
export class SelectionSidebarComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  itemsToDisplay: Array<any>;

  constructor(private storeService: StoreService, private monsterService: MonsterDomainService, private heroService: HeroDomainService) {
    this.storeService.listSubject.takeUntil(this.ngUnsubscribe).subscribe(list => {
      console.log('itemsToDisplay::', list);
      if (list) {
        this.itemsToDisplay = list;
      }
    });
  }

  ngOnInit() {
  }

  itemSelected(evt: Monster | Hero) {
    if (evt.type === 'monster') {
      this.monsterService.getMonsterById(evt.id);
    } else if (evt.type === 'hero') {
      this.heroService.getHeroById(evt.id);
    } else {
      console.log('TODO: Encounterservice');
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
