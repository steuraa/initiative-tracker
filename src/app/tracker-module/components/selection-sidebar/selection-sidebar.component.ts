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
  buttonOptions = [
    {
      selected: true,
      value: 'hero',
      source: '../../../../assets/images/hero-24.png'
    },
    {
      value: 'monster',
      source: '../../../../assets/images/monster2-24.png'
    },
    {
      value: 'encounter',
      source: '../../../../assets/images/encounter-24.png'
    }
  ];

  constructor(private storeService: StoreService, private monsterService: MonsterDomainService, private heroService: HeroDomainService) {
    this.storeService.listSubject.takeUntil(this.ngUnsubscribe).subscribe(list => {
      if (list) {
        this.itemsToDisplay = list;
      }
    });
  }

  ngOnInit() {
  }

  featureSelected(evt: Monster | Hero) {
    console.log('featureSelected::evt:: ', evt);
    if (evt.type === 'monster') {
      this.monsterService.getMonsterById(evt.id);
    } else if (evt.type === 'hero') {
      this.heroService.getHeroById(evt.id);
    } else {
      console.log('TODO: Encounterservice');
    }
  }

  typeSelected(type) {
    console.log('type::', type);
    switch (type) {
      case 'hero': {
        this.heroService.getAllHeroes();
        break;
      }
      case 'monster': {
        this.monsterService.getAllMonsters();
        break;
      }
      case 'enc': {
        console.log('TODO: Encounters');
        break;
      }
      default: {
        console.log('TODO: Start encounter');
      }
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
