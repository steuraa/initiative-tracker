import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Encounter } from '../../../shared-module/models/encounter';
import { EncounterDomainService } from '../../../shared-module/services/encounter-service/encounter-domain.service';
import { StoreService } from '../../../shared-module/services/stores/store.service';

@Component({
  selector: 'app-central-field',
  templateUrl: './central-field.component.html',
  styleUrls: ['./central-field.component.scss']
})
export class CentralFieldComponent {
  encounter: Encounter;
  encounterForm: FormGroup;
  progress: boolean;
  tempEncounter: any;

  constructor(private fb: FormBuilder, private encounterService: EncounterDomainService, private storeService: StoreService) {
    this.encounterForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      round: [''],
      heroes: this.fb.array([], Validators.minLength(1)),
      monsters: this.fb.array([], Validators.minLength(1))
    });

    this.storeService.encounterSubject.subscribe((enc: Encounter) => {
      this.encounter = enc;
      this.tempEncounter = Object.assign({}, this.encounter);
      this.progress = !!this.tempEncounter.original;
      this.populateForm();
    });
    this.storeService.addFeatureToEncounterSubject.subscribe(feature => {
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
    let fg;
    if (h._id) {
      fg = this.fb.group({
        '_id': h._id,
        'initiative': h.initiative,
        'max_ac': h.max_ac,
        'max_hp': h.max_hp,
        'original_id': h.original_id,
        'ac': new FormControl({value: h.ac, disabled: true}),
        'hp': new FormControl({value: h.hp, disabled: true}),
        'name': new FormControl({value: h.name, disabled: true}),
        'player': new FormControl(h.player, Validators.required),
        'init_mod': new FormControl({value: h.init_mod, disabled: true}),
      });
    } else {
      fg = this.fb.group({
        'initiative': h.initiative,
        'max_ac': h.max_ac,
        'max_hp': h.max_hp,
        'original_id': h.original_id,
        'ac': new FormControl({value: h.ac, disabled: true}),
        'hp': new FormControl({value: h.hp, disabled: true}),
        'name': new FormControl({value: h.name, disabled: true}),
        'player': new FormControl(h.player, Validators.required),
        'init_mod': new FormControl({value: h.init_mod, disabled: true}),
      });
    }
    this.heroes.push(fg);
  }

  addMonster(m) {
    let fg;
    if (m._id) {
      fg = this.fb.group({
        '_id': m._id,
        'initiative': m.initiative,
        'max_ac': m.max_ac,
        'max_hp': m.max_hp,
        'original_id': m.original_id,
        'ac': new FormControl({value: m.ac, disabled: true}),
        'hp': new FormControl({value: m.hp, disabled: true}),
        'name': new FormControl({value: m.name, disabled: true}),
        'init_mod': new FormControl({value: m.init_mod, disabled: true})
      });
    } else {
      fg = this.fb.group({
        'initiative': m.initiative,
        'max_ac': m.max_ac,
        'max_hp': m.max_hp,
        'original_id': m.original_id,
        'ac': new FormControl({value: m.ac, disabled: true}),
        'hp': new FormControl({value: m.hp, disabled: true}),
        'name': new FormControl({value: m.name, disabled: true}),
        'init_mod': new FormControl({value: m.init_mod, disabled: true})
      });
    }
    this.monsters.push(fg);
  }

  get heroes() {
    return this.encounterForm.get('heroes') as FormArray;
  }

  get monsters() {
    return this.encounterForm.get('monsters') as FormArray;
  }

  populateForm() {
    this.encounterForm.get('_id').setValue(this.tempEncounter._id);
    this.encounterForm.get('name').setValue(this.tempEncounter.name);
    this.encounterForm.get('round').setValue(this.tempEncounter.round);
    let heroesFG = [];
    let monstersFG = [];
    if (this.tempEncounter.heroes && this.tempEncounter.heroes.length) {
      heroesFG = this.tempEncounter.heroes.map(h => {
        if (h._id) {
          return this.fb.group({
            '_id': h._id,
            'initiative': h.initiative,
            'max_ac': h.max_ac,
            'max_hp': h.max_hp,
            'original_id': h.original_id,
            'ac': new FormControl({value: h.ac, disabled: true}),
            'hp': new FormControl({value: h.hp, disabled: true}),
            'name': new FormControl({value: h.name, disabled: true}),
            'player': new FormControl(h.player, Validators.required),
            'init_mod': new FormControl({value: h.init_mod, disabled: true}),
          });
        } else {
          return this.fb.group({
            'initiative': h.initiative,
            'max_ac': h.max_ac,
            'max_hp': h.max_hp,
            'original_id': h.original_id,
            'ac': new FormControl({value: h.ac, disabled: true}),
            'hp': new FormControl({value: h.hp, disabled: true}),
            'name': new FormControl({value: h.name, disabled: true}),
            'player': new FormControl(h.player, Validators.required),
            'init_mod': new FormControl({value: h.init_mod, disabled: true}),
          });
        }
      });
    }
    if (this.tempEncounter.monsters && this.tempEncounter.monsters.length) {
      monstersFG = this.tempEncounter.monsters.map(m => {
        if (m._id) {
          return this.fb.group({
            '_id': m._id,
            'initiative': m.initiative,
            'max_ac': m.max_ac,
            'max_hp': m.max_hp,
            'original_id': m.original_id,
            'ac': new FormControl({value: m.ac, disabled: true}),
            'hp': new FormControl({value: m.hp, disabled: true}),
            'name': new FormControl({value: m.name, disabled: true}),
            'init_mod': new FormControl({value: m.init_mod, disabled: true}),
          });
        } else {
          return this.fb.group({
            'initiative': m.initiative,
            'max_ac': m.max_ac,
            'max_hp': m.max_hp,
            'original_id': m.original_id,
            'ac': new FormControl({value: m.ac, disabled: true}),
            'hp': new FormControl({value: m.hp, disabled: true}),
            'name': new FormControl({value: m.name, disabled: true}),
            'init_mod': new FormControl({value: m.init_mod, disabled: true}),
          });
        }
      });
    }

    const heroesArray = this.fb.array((heroesFG));
    const monstersArray = this.fb.array((monstersFG));
    this.encounterForm.setControl('heroes', heroesArray);
    this.encounterForm.setControl('monsters', monstersArray);
  }

  removeHero(index: number) {
    this.heroes.removeAt(index);
  }

  removeMonster(index: number) {
    this.monsters.removeAt(index);
  }

  save() {
    console.log(this.encounterForm.getRawValue());
    this.storeService.saveEncounter(this.encounterForm.getRawValue());
    // this.encounterService.saveEncounter(this.encounterForm.getRawValue());
  }
}
