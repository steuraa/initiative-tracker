import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Encounter } from '../../models/encounter';
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
        if (!res.data.status) {
          const encounters = [];
          res.data.forEach(r => {
            encounters.push(new ProgressEncounter(r));
          });
          this.storeService.passProgressList(encounters, 'progressEncounter');
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
          this.storeService.passEncounter(new ProgressEncounter(res.data));
          return res;
        }
      });
  }

  saveProgressEncounter(encounter: Encounter | ProgressEncounter): Observable<any> {
    return this.encounterApiService.saveProgressEncounter(encounter)
      .map(res => {
        if (res.data && !res.data.status) {
          return res.data;
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
