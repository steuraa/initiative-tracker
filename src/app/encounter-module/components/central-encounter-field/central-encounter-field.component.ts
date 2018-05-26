import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { EncounterHero } from '../../../shared-module/models/hero';
import { EncounterMonster } from '../../../shared-module/models/monster';
import { ProgressEncounter } from '../../../shared-module/models/progressEncounter';
import { StoreService } from '../../../shared-module/services/stores/store.service';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-central-field',
  templateUrl: './central-encounter-field.component.html',
  styleUrls: ['./central-encounter-field.component.scss']
})
export class CentralEncounterFieldComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  currentIndex = 0;
  encounter: ProgressEncounter;
  participants = Array<(EncounterHero | EncounterMonster)>();
  selected: number;

  constructor(private storeService: StoreService, private route: ActivatedRoute) {
    this.route.data.takeUntil(this.ngUnsubscribe).subscribe((data: { encounter: any }) => {
      this.encounter = new ProgressEncounter(data.encounter);
    });
    this.storeService.indexSubject.takeUntil(this.ngUnsubscribe).subscribe((i: number) => {
      this.currentIndex = i;
    });
    this.storeService.participantsSubject.takeUntil(this.ngUnsubscribe).subscribe((p: Array<any>) => {
      this.participants = p;
    });
  }

  ngOnInit() {
  }

  changeHp(hp: string, index: number) {
    this.selected = undefined;
    if (hp) {
      this.storeService.passPlayerValues({
        hp: hp,
        index: index
      });
    }
  }

  deletePlayer(index: number) {
    if (index !== undefined) {
      this.storeService.passPlayerValues({
        toDelete: true,
        index: index
      });
    }
  }

  disablePlayer(player, index: number) {
    if (player) {
      this.storeService.passPlayerValues({
        disabled: !player.disabled,
        index: index
      });
    }
  }

  selectTarget(evt, target: any, index: number) {
    if (evt.target.nodeName === 'INPUT') {
      return false;
    }
    this.storeService.passTarget(target);
    this.selected = index;
    setTimeout(() => {
      this.selected = undefined;
    }, 20000);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
