import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { StoreService } from '../../../shared-module/services/stores/store.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-selection-sidebar',
  templateUrl: './selection-sidebar.component.html',
  styleUrls: ['./selection-sidebar.component.scss']
})
export class SelectionSidebarComponent implements OnDestroy, OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  filterControl = new FormControl();
  filter = '';
  filterSubject: Subscription;
  input = false;
  itemsList: Array<any>;
  itemsToDisplay: Array<any>;
  progressList: Array<any>;
  progressType: string;
  type: string;

  constructor(private storeService: StoreService) {
    this.storeService.listSubject.takeUntil(this.ngUnsubscribe).subscribe(list => {
      if (list) {
        this.itemsList = list.values;
        this.itemsList.sort(this.sort);
        this.itemsToDisplay = [...this.itemsList];
        this.type = list.type;
        if (this.type !== 'encounters') {
          this.progressType = '';
          this.progressList = undefined;
        }
      }
    });
    this.storeService.progressEncounterListSubject.takeUntil(this.ngUnsubscribe).subscribe(list => {
      if (list) {
        this.progressList = list.values;
        this.progressList.sort(this.sort);
        this.progressType = list.type;
      }
    });
  }

  ngOnInit() {
    this.filterSubject = this.filterControl.valueChanges
      .debounceTime(300)
      .subscribe(newValue => {
        this.filter = newValue;
        this.filterList();
      });
  }

  createNew() {
    this.storeService.passSelectedFeature({type: this.type});
  }

  filterList() {
    this.itemsToDisplay = this.itemsList.filter(i => (i.name as string).toLowerCase().startsWith(this.filter.toLowerCase()));
  }

  itemSelected(evt: any) {
    this.storeService.passSelectedFeature(evt);
  }

  sort(a, b) {
    return (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0;
  }

  toggleInput() {
    this.input = !this.input;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
