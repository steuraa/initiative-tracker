import { Injectable } from '@angular/core';
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

  getProgressEncounterById(id: string): void {
    this.encounterApiService.getProgressEncounterById(id)
      .subscribe(res => {
        if (res.data && !res.data.status) {
          this.storeService.passEncounter(new ProgressEncounter(res.data));
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  saveProgressEncounter(encounter: ProgressEncounter): void {
    this.encounterApiService.saveProgressEncounter(encounter)
      .subscribe(res => {
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
