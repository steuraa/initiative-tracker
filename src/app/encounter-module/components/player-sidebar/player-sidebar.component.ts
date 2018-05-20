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
      console.log('player:: ', item);
      this.item = item;
      this.tempItem = Object.assign({}, this.item);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
