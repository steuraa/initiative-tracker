import { Component, OnInit } from '@angular/core';
import { Encounter } from '../../../shared-module/models/encounter';
import { StoreService } from '../../../shared-module/services/store-service/store.service';

@Component({
  selector: 'app-central-field',
  templateUrl: './central-field.component.html',
  styleUrls: ['./central-field.component.scss']
})
export class CentralFieldComponent implements OnInit {
  encounter: Encounter;
  tempEncounter: any;
  constructor(private storeService: StoreService) {
    this.storeService.encounterSubject.subscribe((enc: Encounter) => {
      this.encounter = enc;
      this.tempEncounter = Object.assign({}, this.encounter);
    });
  }

  ngOnInit() {
  }

}
