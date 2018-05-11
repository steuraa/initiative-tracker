import { RequestErrorItem } from './requestErrorItem';

export class RequestError {
  status: number;
  errors: RequestErrorItem[];

  constructor(status: number, errors: RequestErrorItem[]) {
    this.status = status;
    this.errors = errors;
  }
}
