import { Component } from '@angular/core';
import { HeroDomainService } from '../../../shared-module/services/hero-service/hero-domain.service';
import { MonsterDomainService } from '../../../shared-module/services/monster-service/monster-domain.service';
import { StoreService } from '../../../shared-module/services/store-service/store.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
  selectedFeature = 'hero';

  constructor(private storeService: StoreService, private monsterService: MonsterDomainService, private heroService: HeroDomainService) {
    this.heroService.getAllHeroes();
  }

  selectFeature(evt) {
    this.storeService.selectFeature(evt);
  }

  closeFeature(evt) {
    this.storeService.closeFeature(evt);
  }

  editFeature(evt) {
    this.storeService.editFeature(evt);
  }

  saveEncounter(evt) {
    console.log('saveEnc::', evt);
  }

  startEncounter(evt) {
    console.log('saveEnc::', evt);
  }

  selectType(evt) {
    console.log('selectFeat::evt::', evt);
    if (evt === 'monster') {
      this.monsterService.getAllMonsters();
    } else if (evt === 'hero') {
      this.heroService.getAllHeroes();
    } else {
      console.log('TODO: Encounterservice');
    }
  }
}
