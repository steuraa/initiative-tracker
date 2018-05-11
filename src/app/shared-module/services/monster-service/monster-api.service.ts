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
export class MonsterApiService {
  backend = environment.backendUri;

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {
  }

  getAllMonsters(): Observable<PromiseSingleResult<any>> {
    return this.http.get(this.backend + '/api/getAllMonsters')
      .map((res: any) => {
        if (res.body && res.body.length) {
          return new PromiseSingleResult(RequestResultType.Success, res.body);
        } else {
          return new PromiseSingleResult<any>(RequestResultType.NoDataFound, res.data.body.report);
        }
      })
      .catch(error => {
        return Observable
          .of(new PromiseSingleResult<any>(RequestResultType.BadRequest, this.errorHandlingService.handleError(error)));
      });
  }

  getMonsterById(id): Observable<PromiseSingleResult<any>> {
    return this.http.post(this.backend + '/api/getMonster', {'id': id})
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

  saveMonster(monster): Observable<PromiseSingleResult<any>> {
    return this.http.post(this.backend + '/api/saveMonster', {'monster': monster})
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

  deleteMonster(id: string): Observable<PromiseSingleResult<any>> {
    return this.http.post(this.backend + '/api/deleteMonster', {'id': id})
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
}
