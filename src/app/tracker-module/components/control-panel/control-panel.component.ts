import { Component } from '@angular/core';
import { EncounterHero, Hero } from '../../../shared-module/models/hero';
import { EncounterMonster, Monster } from '../../../shared-module/models/monster';
import { EncounterDomainService } from '../../../shared-module/services/encounter-service/encounter-domain.service';
import { HeroDomainService } from '../../../shared-module/services/hero-service/hero-domain.service';
import { MonsterDomainService } from '../../../shared-module/services/monster-service/monster-domain.service';
import { StoreService } from '../../../shared-module/services/store-service/store.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
  selectedType = 'hero';
  selectedFeature: Hero | Monster;

  constructor(private storeService: StoreService, private monsterService: MonsterDomainService, private heroService: HeroDomainService,
              private encounterService: EncounterDomainService) {
    this.storeService.singleItemSubject.subscribe(res => {
      this.selectedFeature = res;
    });
    this.heroService.getAllHeroes();
  }

  selectFeature(evt) {
    let encounterFeature;
    if (this.selectedFeature.type === 'monster') {
      encounterFeature = new EncounterMonster(this.selectedFeature);
    } else {
      encounterFeature = new EncounterHero(this.selectedFeature);
    }
    this.storeService.selectFeature(encounterFeature);
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
    if (evt === 'monster') {
      this.monsterService.getAllMonsters();
    } else if (evt === 'hero') {
      this.heroService.getAllHeroes();
    } else {
      this.encounterService.getAllEncounters();
    }
  }
}
