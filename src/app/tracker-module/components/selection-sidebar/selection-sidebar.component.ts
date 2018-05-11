import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../shared-module/models/hero';
import { Monster } from '../../../shared-module/models/monster';
import { StoreService } from '../../../shared-module/services/store-service/store.service';
import { MonsterDomainService } from '../../../shared-module/services/monster-service/monster-domain.service';
import { HeroDomainService } from '../../../shared-module/services/hero-service/hero-domain.service';

@Component({
  selector: 'app-selection-sidebar',
  templateUrl: './selection-sidebar.component.html',
  styleUrls: ['./selection-sidebar.component.scss']
})
export class SelectionSidebarComponent implements OnInit {
  itemsToDisplay: Array<any>;

  constructor(private storeService: StoreService, private monsterService: MonsterDomainService, private heroesService: HeroDomainService) {
    this.storeService.listSubject.subscribe(list => {
      if (list) {
        this.itemsToDisplay = list;
      }
    });
  }

  ngOnInit() {
  }

  itemSelected(evt: Monster | Hero) {
    console.log('itemSelected::evt:: ', evt);
    if (evt.type === 'monster') {
      this.monsterService.getMonsterById(evt.id).subscribe();
    } else if (evt.type === 'hero') {
      this.heroesService.getHeroById(evt.id).subscribe();
    } else {
      console.log('TODO: Encounterservice');
    }
  }

}
