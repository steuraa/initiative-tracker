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
export class HeroApiService {
  backend = environment.backendUri;

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {
  }

  getAllHeroes(): Observable<PromiseSingleResult<any>> {
    return this.http.get(this.backend + '/api/getAllHeroes')
      .map((res: any) => {
        if (res.body && res.body.length) {
          return new PromiseSingleResult(RequestResultType.Success, res.body);
        } else {
          return new PromiseSingleResult<any>(RequestResultType.NoDataFound, res.data.body);
        }
      })
      .catch(error => {
        return Observable
          .of(new PromiseSingleResult<any>(RequestResultType.BadRequest, this.errorHandlingService.handleError(error)));
      });
  }

  getHeroById(id): Observable<PromiseSingleResult<any>> {
    return this.http.post(this.backend + '/api/getHero', {'id': id})
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

  saveHero(hero): Observable<PromiseSingleResult<any>> {
    return this.http.post(this.backend + '/api/saveHero', hero)
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

  deleteHero(id: string): Observable<PromiseSingleResult<any>> {
    return this.http.post(this.backend + '/api/deleteHero', {'id': id})
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
