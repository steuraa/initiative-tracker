import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Encounter } from '../../../shared-module/models/encounter';
import { Hero } from '../../../shared-module/models/hero';
import { Monster } from '../../../shared-module/models/monster';
import { StoreService } from '../../../shared-module/services/store-service/store.service';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-overview-sidebar',
  templateUrl: './overview-sidebar.component.html',
  styleUrls: ['./overview-sidebar.component.scss']
})
export class OverviewSidebarComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
item: Monster | Hero | Encounter;
  constructor(private storeService: StoreService) {
    this.storeService.singleItemSubject.takeUntil(this.ngUnsubscribe).subscribe((item: Monster | Hero | Encounter) => {
      this.item = item;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
