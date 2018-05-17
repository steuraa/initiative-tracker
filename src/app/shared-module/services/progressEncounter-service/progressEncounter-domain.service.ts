import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProgressEncounter } from '../../models/progressEncounter';
import { ProgressEncounterApiService } from './progressEncounter-api.service';
import { StoreService } from '../store-service/store.service';

@Injectable()
export class ProgressEncounterDomainService {

  constructor(private encounterApiService: ProgressEncounterApiService, private storeService: StoreService) {
  }

  getAllProgressEncounters(): void {
    this.encounterApiService.getAllProgressEncounters()
      .subscribe(res => {
        if (res.data && res.data.length && !res.data.status) {
          const encounters = [];
          res.data.forEach(r => {
            encounters.push(new ProgressEncounter(r));
          });
          this.storeService.passList(encounters);
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  getProgressEncounterById(id: string): Observable<any> {
    return this.encounterApiService.getProgressEncounterById(id)
      .map(res => {
        if (res.data && res.data.status) {
          this.storeService.passError(res.data);
        } else {
          return res;
        }
      });
  }

  saveProgressEncounter(encounter: ProgressEncounter): Observable<any> {
    return this.encounterApiService.saveProgressEncounter(encounter)
      .map(res => {
        if (res.data && !res.data.status) {
          // this.storeService.passSingleItem(new Encounter(res.data));
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  deleteProgressEncounter(id) {
    return this.encounterApiService.deleteProgressEncounter(id);
  }
}
