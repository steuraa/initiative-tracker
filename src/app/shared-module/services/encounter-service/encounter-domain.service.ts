import { Injectable } from '@angular/core';
import { EncounterApiService } from './encounter-api.service';

@Injectable()
export class EncounterDomainService {

  constructor(private encounterApiService: EncounterApiService) { }

}
