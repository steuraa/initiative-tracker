import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Hero } from '../../../shared-module/models/hero';
import { Monster } from '../../../shared-module/models/monster';
import { StoreService } from '../../../shared-module/services/stores/store.service';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-player-sidebar',
  templateUrl: './player-sidebar.component.html',
  styleUrls: ['./player-sidebar.component.scss']
})
export class PlayerSidebarComponent implements OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  item: (Monster | Hero);
  tempItem: any;

  constructor(private storeService: StoreService) {
    this.storeService.playerSubject.takeUntil(this.ngUnsubscribe).subscribe((item: Monster | Hero) => {
      this.item = item;
      this.tempItem = Object.assign({}, this.item);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
