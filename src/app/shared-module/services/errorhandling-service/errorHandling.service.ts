import { Injectable } from '@angular/core';
import { RequestError } from '../requestResult/requestError';
import { RequestErrorItem } from '../requestResult/requestErrorItem';
import * as _ from 'lodash';

@Injectable()
export class ErrorHandlingService {
  constructor() { }

  handleError(error: any): RequestError {
    if (error._body) {
      const errorBody = JSON.parse(error._body);
      const errorItems = new Array<RequestErrorItem>();
      if (_.has(errorBody, 'modelState')) {
        for (const item of Object.keys(errorBody.modelState)) {
          _.each(errorBody.modelState[item], (i) => {
            const errorItem = new RequestErrorItem(item, i);
            errorItems.push(errorItem);
          });
        }
      } else {
        const errorItem = new RequestErrorItem(errorBody.error, errorBody.error_description);
        errorItems.push(errorItem);
      }
      return new RequestError(error.status, errorItems);
    } else {
      if (error.error) {
        const errorItems = new Array<RequestErrorItem>();
        const errorItem = new RequestErrorItem(error.status, error.error);
        errorItems.push(errorItem);
        return new RequestError(error.status, errorItems);
      }
    }
  }
}
