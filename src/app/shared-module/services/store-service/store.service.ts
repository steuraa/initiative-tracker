import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class StoreService {
  private errorSubjectSource: Subject<any> = new Subject<any>();
  errorSubject: Observable<any> = this.errorSubjectSource.asObservable();
  private listSubjectSource: Subject<any> = new Subject<any>();
  listSubject: Observable<any> = this.listSubjectSource.asObservable();
  private singleItemSubjectSource: Subject<any> = new Subject<any>();
  singleItemSubject: Observable<any> = this.singleItemSubjectSource.asObservable();
  private selectFeatureSubjectSource: Subject<any> = new Subject<any>();
  selectFeatureSubject: Observable<any> = this.selectFeatureSubjectSource.asObservable();
  private editFeatureSubjectSource: Subject<any> = new Subject<any>();
  editFeatureSubject: Observable<any> = this.editFeatureSubjectSource.asObservable();
  private closeFeatureSubjectSource: Subject<any> = new Subject<any>();
  closeFeatureSubject: Observable<any> = this.closeFeatureSubjectSource.asObservable();

  constructor() {
  }

  passError(error) {
    if (error) {
      this.errorSubjectSource.next(error);
    }
  }

  passList(list) {
    if (list) {
      this.listSubjectSource.next(list);
    }
  }

  passSingleItem(item) {
    if (item) {
      this.singleItemSubjectSource.next(item);
    }
  }

  selectFeature(feature) {
    if (feature) {
      this.selectFeatureSubjectSource.next(feature);
    }
  }

  editFeature(feature) {
    if (feature) {
      this.editFeatureSubjectSource.next(feature);
    }
  }

  closeFeature(feature) {
    if (feature) {
      this.closeFeatureSubjectSource.next(feature);
    }
  }
}
