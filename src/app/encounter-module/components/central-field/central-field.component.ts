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
  heroes = [];
  tempEncounter: any;

  constructor(private encounterService: EncounterDomainService, private storeService: StoreService) {
  }
}
