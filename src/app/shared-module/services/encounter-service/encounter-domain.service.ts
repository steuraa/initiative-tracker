import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Encounter } from '../../models/encounter';
import { EncounterApiService } from './encounter-api.service';
import { StoreService } from '../stores/store.service';

@Injectable()
export class EncounterDomainService {

  constructor(private encounterApiService: EncounterApiService, private storeService: StoreService) {
  }

  getAllEncounters(): void {
    this.encounterApiService.getAllEncounters()
      .subscribe(res => {
        if (!res.data.status) {
          const encounters = [];
          res.data.forEach(r => {
            encounters.push(new Encounter(r));
          });
          this.storeService.passList(encounters, 'encounters');
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  getEncounterById(id: string): Observable<any> {
    return this.encounterApiService.getEncounterById(id)
      .map(res => {
        if (res.data && !res.data.status) {
          this.storeService.passEncounter(new Encounter(res.data));
          return res.data;
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  saveEncounter(encounter: Encounter): void {
    this.encounterApiService.saveEncounter(encounter)
      .subscribe(res => {
        if (res.data && !res.data.status) {
          this.storeService.passEncounter(new Encounter(res.data));
          this.getAllEncounters();
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  deleteEncounter(id) {
    return this.encounterApiService.deleteEncounter(id);
  }
}
