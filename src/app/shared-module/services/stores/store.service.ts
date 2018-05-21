import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class StoreService {
  private errorSubjectSource: Subject<any> = new Subject<any>();
  errorSubject: Observable<any> = this.errorSubjectSource.asObservable();
  /* passes encounter from controller or service to central field*/
  private encounterSubjectSource: Subject<any> = new Subject<any>();
  encounterSubject: Observable<any> = this.encounterSubjectSource.asObservable();
  private saveEncounterSubjectSource: Subject<any> = new Subject<any>();
  saveEncounterSubject: Observable<any> = this.saveEncounterSubjectSource.asObservable();
  /* passes player values from encounter central field to the encountercontroller*/
  private playerValuesSubjectSource: Subject<number> = new Subject<any>();
  playerValuesSubject: Observable<any> = this.playerValuesSubjectSource.asObservable();
  /* passses current index from the controller to encounter central field*/
  private indexSubjectSource: Subject<number> = new Subject<any>();
  indexSubject: Observable<any> = this.indexSubjectSource.asObservable();
  /* passes lists of encounters/heroes/monsters to the selection side bar*/
  private listSubjectSource: Subject<any> = new Subject<any>();
  listSubject: Observable<any> = this.listSubjectSource.asObservable();
  /* passes the calculated list of participants from controller to encounter central field*/
  private participantsSubjectSource: Subject<any> = new Subject<any>();
  participantsSubject: Observable<any> = this.participantsSubjectSource.asObservable();
  /* passes the current player from encounter controller to player sidebar during encounter*/
  private playerSubjectSource: Subject<any> = new Subject<any>();
  playerSubject: Observable<any> = this.playerSubjectSource.asObservable();
  /* passes a list of encounters in progress*/
  private progressEncounterListSubjectSource: Subject<any> = new Subject<any>();
  progressEncounterListSubject: Observable<any> = this.progressEncounterListSubjectSource.asObservable();
  /* passes a single feature around from controller or service to the panels*/
  private singleItemSubjectSource: Subject<any> = new Subject<any>();
  singleItemSubject: Observable<any> = this.singleItemSubjectSource.asObservable();
  /* passes an edit command from the tracker controller to the overview side panel*/
  private editFeatureSubjectSource: Subject<any> = new Subject<any>();
  editFeatureSubject: Observable<any> = this.editFeatureSubjectSource.asObservable();
  /* passes an close command from the tracker controller to the overview side panel*/
  private closeFeatureSubjectSource: Subject<any> = new Subject<any>();
  closeFeatureSubject: Observable<any> = this.closeFeatureSubjectSource.asObservable();
  /* passes an select command from the tracker controller to the overview side panel*/
  private addFeatureToEncounterSubjectSource: Subject<any> = new Subject<any>();
  addFeatureToEncounterSubject: Observable<any> = this.addFeatureToEncounterSubjectSource.asObservable();
  /* passes the to save feature from the overview side panel to the controller*/
  private saveFeatureSubjectSource: Subject<any> = new Subject<any>();
  saveFeatureSubject: Observable<any> = this.saveFeatureSubjectSource.asObservable();
  /* passes an selected feature from the select sidepanel to the controller*/
  private selectedFeatureSubjectSource: Subject<any> = new Subject<any>();
  selectedFeatureSubject: Observable<any> = this.selectedFeatureSubjectSource.asObservable();
  /* passes a new target to the target sidebar*/
  private targetSubjectSource: Subject<any> = new Subject<any>();
  targetSubject: Observable<any> = this.targetSubjectSource.asObservable();

  constructor() {
  }

  passError(error) {
    if (error) {
      this.errorSubjectSource.next(error);
    }
  }

  passFeatureToSave(feat) {
    if (feat) {
      this.saveFeatureSubjectSource.next(feat);
    }
  }

  passEncounter(encounter) {
    if (encounter) {
      this.encounterSubjectSource.next(encounter);
    }
  }

  passPlayerValues(values: any) {
    if (values) {
      this.playerValuesSubjectSource.next(values);
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

  passSelectedFeature(feature) {
    if (feature) {
      this.selectedFeatureSubjectSource.next(feature);
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

  addFeatureToEncounter(feature) {
    if (feature) {
      this.addFeatureToEncounterSubjectSource.next(feature);
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
