import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class StoreService {
  private errorSubjectSource: Subject<any> = new Subject<any>();
  errorSubject: Observable<any> = this.errorSubjectSource.asObservable();
  private encounterSubjectSource: Subject<any> = new Subject<any>();
  encounterSubject: Observable<any> = this.encounterSubjectSource.asObservable();
  private saveEncounterSubjectSource: Subject<any> = new Subject<any>();
  saveEncounterSubject: Observable<any> = this.saveEncounterSubjectSource.asObservable();
  private startEncounterSubjectSource: Subject<any> = new Subject<any>();
  startEncounterSubject: Observable<any> = this.startEncounterSubjectSource.asObservable();
  private listSubjectSource: Subject<any> = new Subject<any>();
  listSubject: Observable<any> = this.listSubjectSource.asObservable();
  private progressEncounterListSubjectSource: Subject<any> = new Subject<any>();
  progressEncounterListSubject: Observable<any> = this.progressEncounterListSubjectSource.asObservable();
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

  passEncounter(encounter) {
    if (encounter) {
      console.log('storeService::passEnconter::encounter:: ', encounter);
      this.encounterSubjectSource.next(encounter);
    }
  }

  startEncounter() {
    this.startEncounterSubjectSource.next('start');
  }

  passList(list, type) {
    if (list) {
      this.listSubjectSource.next({values: list, type: type});
    }
  }

  passProgressList(progList, type) {
    if (progList) {
      this.progressEncounterListSubjectSource.next({values: progList, type: type});
    }
  }

  passSingleItem(item) {
    if (item) {
      this.singleItemSubjectSource.next(item);
    }
  }

  selectFeature(feature) {
    if (feature) {
      console.log('storeService::selectFeature::feature::', feature);
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
