import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
      id: [''],
      name: ['', Validators.required],
      round: [''],
      heroes: this.fb.array([], Validators.minLength(1)),
      monsters: this.fb.array([], Validators.minLength(1))
    });

    this.storeService.encounterSubject.subscribe((enc: Encounter) => {
      this.encounter = enc;
      this.tempEncounter = Object.assign({}, this.encounter);
      this.populateForm();
    });
    this.storeService.startEncounterSubject.subscribe(() => {
      this.tempEncounter = new Encounter();
      this.populateForm();
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

  addHero(h) {
    const fg = this.fb.group({
      'ac': new FormControl({value: h.ac, disabled: true}),
      'hp': new FormControl({value: h.hp, disabled: true}),
      'name': new FormControl({value: h.name, disabled: true}),
      'player': new FormControl(h.player, Validators.required),
      'init_mod': new FormControl({value: h.init_mod, disabled: true}),
    });
    this.heroes.push(fg);
  }

  addMonster(m) {
    const fg = this.fb.group({
      'ac': new FormControl({value: m.ac, disabled: true}),
      'hp': new FormControl({value: m.hp, disabled: true}),
      'name': new FormControl({value: m.name, disabled: true}),
      'init_mod': new FormControl({value: m.init_mod, disabled: true}),
    });
    this.monsters.push(fg);
  }

  get heroes() {
    return this.encounterForm.get('heroes') as FormArray;
  }

  get monsters() {
    return this.encounterForm.get('monsters') as FormArray;
  }

  populateForm() {
    this.encounterForm.get('id').setValue(this.tempEncounter.id);
    this.encounterForm.get('name').setValue(this.tempEncounter.name);
    this.encounterForm.get('round').setValue(this.tempEncounter.round);
    const heroesFG = this.tempEncounter.heroes.map(h => {
      const fg = this.fb.group({
        'ac': new FormControl({value: h.ac, disabled: true}),
        'hp': new FormControl({value: h.hp, disabled: true}),
        'name': new FormControl({value: h.name, disabled: true}),
        'player': new FormControl(h.player, Validators.required),
        'init_mod': new FormControl({value: h.init_mod, disabled: true}),
      });
      return fg;
    });
    const monstersFG = this.tempEncounter.monsters.map(m => {
      const fg = this.fb.group({
        'ac': new FormControl({value: m.ac, disabled: true}),
        'hp': new FormControl({value: m.hp, disabled: true}),
        'name': new FormControl({value: m.name, disabled: true}),
        'init_mod': new FormControl({value: m.init_mod, disabled: true}),
      });
      return fg;
    });

    const heroesArray = this.fb.array((heroesFG));
    const monstersArray = this.fb.array((monstersFG));
    this.encounterForm.setControl('heroes', heroesArray);
    this.encounterForm.setControl('monsters', monstersArray);
    console.log('monsterArray::', monstersArray);
  }

  removeHero(index: number) {
    this.heroes.removeAt(index);
  }

  removeMonster(index: number) {
    this.monsters.removeAt(index);
  }

  save() {
    this.encounterService.saveEncounter(this.encounterForm.getRawValue());
  }
}
