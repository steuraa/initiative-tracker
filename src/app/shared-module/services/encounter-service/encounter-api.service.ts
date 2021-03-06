import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { PromiseSingleResult } from '../requestResult/promiseResult';
import { RequestResultType } from '../requestResult/requestResultType';
import { ErrorHandlingService } from '../errorhandling-service/errorHandling.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EncounterApiService {
  backend = environment.backendUri;

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {
  }
  getAllEncounters(): Observable<PromiseSingleResult<any>> {
    return this.http.get(this.backend + '/api/getAllEncounters')
      .map((res: any) => {
        if (res.body && res.body.length) {
          return new PromiseSingleResult(RequestResultType.Success, res.body);
        } else {
          return new PromiseSingleResult<any>(RequestResultType.NoDataFound, res.body);
        }
      })
      .catch(error => {
        return Observable
          .of(new PromiseSingleResult<any>(RequestResultType.BadRequest, this.errorHandlingService.handleError(error)));
      });
  }

  getEncounterById(id): Observable<PromiseSingleResult<any>> {
    return this.http.post(this.backend + '/api/getEncounter', {'_id': id})
      .map((res: any) => {
        if (res.body) {
          return new PromiseSingleResult(RequestResultType.Success, res.body);
        } else {
          return new PromiseSingleResult<any>(RequestResultType.NoDataFound, res.body);
        }
      })
      .catch(error => {
        return Observable
          .of(new PromiseSingleResult<any>(RequestResultType.BadRequest, this.errorHandlingService.handleError(error)));
      });
  }

  saveEncounter(encounter): Observable<PromiseSingleResult<any>> {
    return this.http.post(this.backend + '/api/saveEncounter', encounter)
      .map((res: any) => {
        if (res.body) {
          return new PromiseSingleResult(RequestResultType.Success, res.body);
        }
      })
      .catch(error => {
          return Observable
            .of(new PromiseSingleResult<any>(RequestResultType.BadRequest, this.errorHandlingService.handleError(error)));
        }
      );
  }

  deleteEncounter(id: string): Observable<PromiseSingleResult<any>> {
    return this.http.post(this.backend + '/api/deleteEncounter', {'_id': id})
      .map((res: any) => {
        if (res.body) {
          return new PromiseSingleResult(RequestResultType.Success, res.body);
        } else {
          return new PromiseSingleResult<any>(RequestResultType.NoDataFound, res.body);
        }
      })
      .catch(error => {
          return Observable
            .of(new PromiseSingleResult<any>(RequestResultType.BadRequest, this.errorHandlingService.handleError(error)));
        }
      );
  }
}
