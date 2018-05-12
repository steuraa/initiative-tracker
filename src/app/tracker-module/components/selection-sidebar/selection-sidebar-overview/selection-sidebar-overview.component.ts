import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selection-sidebar-overview',
  templateUrl: './selection-sidebar-overview.component.html',
  styleUrls: ['./selection-sidebar-overview.component.scss']
})
export class SelectionSidebarOverviewComponent implements OnInit {
  @Input() itemsToDisplay: Array<any>;
  @Output() featureSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  itemSelected(item) {
    if (item) {
      this.featureSelected.next(item);
    }
  }

}
