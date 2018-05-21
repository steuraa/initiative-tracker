import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Encounter } from '../../../shared-module/models/encounter';
import { Hero } from '../../../shared-module/models/hero';
import { Monster } from '../../../shared-module/models/monster';
import { EncounterDomainService } from '../../../shared-module/services/encounter-service/encounter-domain.service';
import { HeroDomainService } from '../../../shared-module/services/hero-service/hero-domain.service';
import { MonsterDomainService } from '../../../shared-module/services/monster-service/monster-domain.service';
import { ProgressEncounterDomainService } from '../../../shared-module/services/progressEncounter-service/progressEncounter-domain.service';
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

  constructor(private storeService: StoreService, private monsterService: MonsterDomainService, private heroService: HeroDomainService,
              private encounterService: EncounterDomainService, private progressEncounterService: ProgressEncounterDomainService) {
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
    switch (this.type) {
      case 'monsters': {
        this.storeService.passSingleItem(new Monster({}));
        break;
      }
      case 'heroes': {
        this.storeService.passSingleItem(new Hero({}));
        break;
      }
      default: {
        this.storeService.passEncounter(new Encounter({}));
      }
    }
  }

  filterList() {
    this.itemsToDisplay = this.itemsList.filter(i => (i.name as string).toLowerCase().startsWith(this.filter.toLowerCase()));
  }

  itemSelected(evt: Monster | Hero) {
    console.log(evt);
    if (evt.type === 'monster') {
      this.monsterService.getMonsterById(evt._id);
    } else if (evt.type === 'hero') {
      this.heroService.getHeroById(evt._id);
    } else if (evt.type === 'encounter') {
      this.encounterService.getEncounterById(evt._id);
    } else {
      this.progressEncounterService.getProgressEncounterById(evt._id).subscribe();
    }
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
