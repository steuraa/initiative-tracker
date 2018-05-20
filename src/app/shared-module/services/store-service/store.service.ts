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
  private healthSubjectSource: Subject<number> = new Subject<any>();
  healthSubject: Observable<any> = this.healthSubjectSource.asObservable();
  private indexSubjectSource: Subject<number> = new Subject<any>();
  indexSubject: Observable<any> = this.indexSubjectSource.asObservable();
  private listSubjectSource: Subject<any> = new Subject<any>();
  listSubject: Observable<any> = this.listSubjectSource.asObservable();
  private participantsSubjectSource: Subject<any> = new Subject<any>();
  participantsSubject: Observable<any> = this.participantsSubjectSource.asObservable();
  private playerSubjectSource: Subject<any> = new Subject<any>();
  playerSubject: Observable<any> = this.playerSubjectSource.asObservable();
  private progressEncounterListSubjectSource: Subject<any> = new Subject<any>();
  progressEncounterListSubject: Observable<any> = this.progressEncounterListSubjectSource.asObservable();
  private singleItemSubjectSource: Subject<any> = new Subject<any>();
  singleItemSubject: Observable<any> = this.singleItemSubjectSource.asObservable();
  private editFeatureSubjectSource: Subject<any> = new Subject<any>();
  editFeatureSubject: Observable<any> = this.editFeatureSubjectSource.asObservable();
  private closeFeatureSubjectSource: Subject<any> = new Subject<any>();
  closeFeatureSubject: Observable<any> = this.closeFeatureSubjectSource.asObservable();
  private selectFeatureSubjectSource: Subject<any> = new Subject<any>();
  selectFeatureSubject: Observable<any> = this.selectFeatureSubjectSource.asObservable();
  private targetSubjectSource: Subject<any> = new Subject<any>();
  targetSubject: Observable<any> = this.targetSubjectSource.asObservable();

  constructor() {
  }

  passError(error) {
    if (error) {
      this.errorSubjectSource.next(error);
    }
  }

  passEncounter(encounter) {
    if (encounter) {
      this.encounterSubjectSource.next(encounter);
    }
  }

  passHealth(values: any) {
    if (values) {
      this.healthSubjectSource.next(values);
    }
  }

  passIndex(index: number) {
    if (index !== undefined) {
      this.indexSubjectSource.next(index);
    }
  }

  passList(list, type) {
    if (list) {
      this.listSubjectSource.next({
        values: list,
        type: type
      });
    }
  }

  passParticipants(participants: Array<any>) {
    if (participants) {
      this.participantsSubjectSource.next(participants);
    }
  }

  passPlayer(player: any) {
    if (player) {
      this.playerSubjectSource.next(player);
    }
  }

  passProgressList(progList, type) {
    if (progList) {
      this.progressEncounterListSubjectSource.next({
        values: progList,
        type: type
      });
    }
  }

  passSingleItem(item) {
    if (item) {
      this.singleItemSubjectSource.next(item);
    }
  }

  passTarget(target) {
    if (target) {
      this.targetSubjectSource.next(target);
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
