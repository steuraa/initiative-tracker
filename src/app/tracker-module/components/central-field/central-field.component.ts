import { Component } from '@angular/core';
import { Encounter } from '../../../shared-module/models/encounter';
import { EncounterDomainService } from '../../../shared-module/services/encounter-service/encounter-domain.service';
import { StoreService } from '../../../shared-module/services/store-service/store.service';

@Component({
  selector: 'app-central-field',
  templateUrl: './central-field.component.html',
  styleUrls: ['./central-field.component.scss']
})
export class CentralFieldComponent {
  encounter: Encounter;
  tempEncounter: any;

  constructor(private encounterService: EncounterDomainService, private storeService: StoreService) {
    this.storeService.encounterSubject.subscribe((enc: Encounter) => {
      this.encounter = enc;
      this.tempEncounter = Object.assign({}, this.encounter);
    });
    this.storeService.startEncounterSubject.subscribe(() => {
      this.tempEncounter = new Encounter();
    });
    this.storeService.selectFeatureSubject.subscribe(feature => {
      if (feature && feature.type) {
        if (feature.type === 'hero') {
          this.addHero(feature);
        } else {
          this.addMonster(feature);
        }
      }
    });
  }

  addHero(hero) {
    this.tempEncounter.heroes.push(hero);
  }

  addMonster(monster) {
    this.tempEncounter.monsters.push(monster);
  }

  removeHero(index: number) {
    this.tempEncounter.heroes.splice(index, 1);
  }

  removeMonster(index: number) {
    this.tempEncounter.monsters.splice(index, 1);
  }

  save() {
    this.encounterService.saveEncounter(this.tempEncounter);
  }
}
