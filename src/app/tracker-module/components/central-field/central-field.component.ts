import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  encounterForm: FormGroup;

  constructor(private fb: FormBuilder, private encounterService: EncounterDomainService, private storeService: StoreService) {
    this.encounterForm = this.fb.group({
      name: ['', Validators.required],
      heroes: this.fb.array([]),
      monsters: this.fb.array([])
    });
    this.storeService.encounterSubject.subscribe((enc: Encounter) => {
      this.encounter = enc;
      this.tempEncounter = Object.assign({}, this.encounter);
      this.populateForm();
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

  populateForm() {
    this.encounterForm.setValue({
      'id': this.tempEncounter.id,
      'name': this.tempEncounter.name,
    });
    const heroesFG = this.tempEncounter.heroes.map(h => this.fb.group(h));
    const monstersFG = this.tempEncounter.monsters.map(m => this.fb.group(m));
    const heroesArray = this.fb.array((heroesFG));
    const monstersArray = this.fb.array((monstersFG));
    this.encounterForm.setControl('heroes', heroesArray);
    this.encounterForm.setControl('monsters', monstersArray);
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
