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
  selector: 'app-target-sidebar',
  templateUrl: './target-sidebar.component.html',
  styleUrls: ['./target-sidebar.component.scss']
})
export class TargetSidebarComponent implements OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  item: (Monster | Hero);
  tempItem: any;


  constructor(private heroService: HeroDomainService, private monsterService: MonsterDomainService, private storeService: StoreService) {
    this.storeService.singleItemSubject.takeUntil(this.ngUnsubscribe).subscribe((item: Monster | Hero) => {
      this.item = item;
      this.tempItem = Object.assign({}, this.item);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
