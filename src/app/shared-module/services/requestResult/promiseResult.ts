import { RequestResultType } from './requestResultType';

export class PromiseResult<T> {
  requestResultType: RequestResultType;
  data: T[];

  constructor(requestResultType: RequestResultType);
  constructor(requestResultType: RequestResultType, data: T[]);
  constructor(requestResultTypeOrData?: any, data?: T[]) {
    if (data) {
      this.requestResultType = requestResultTypeOrData;
      this.data = data;
    } else {
      this.requestResultType = requestResultTypeOrData;
    }
  }
}

export class PromiseSingleResult<T> {
  requestResultType: RequestResultType;
  data: T;

  constructor(requestResultType: RequestResultType);
  constructor(requestResultType: RequestResultType, data: T);
  constructor(requestResultTypeOrData?: any, data?: T) {
    if (data) {
      this.requestResultType = requestResultTypeOrData;
      this.data = data;
    } else {
      this.requestResultType = requestResultTypeOrData;
    }
  }
}
