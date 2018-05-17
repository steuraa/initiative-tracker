import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProgressEncounterDomainService } from '../progressEncounter-service/progressEncounter-domain.service';
import 'rxjs/add/operator/map';


@Injectable()
export class EncounterResolverService implements Resolve<any> {

  constructor(private router: Router, private encounterService: ProgressEncounterDomainService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');

    return this.encounterService.getProgressEncounterById(id)
      .map(encounter => {
        if (encounter) {
          return encounter;
        } else {
          return null;
        }
      });
  }
}
