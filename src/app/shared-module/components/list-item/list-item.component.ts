import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Encounter } from '../../models/encounter';
import { Hero } from '../../models/hero';
import { Monster } from '../../models/monster';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() item: Monster | Hero | Encounter;
  @Output() itemSelected = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  selectItem(evt) {
    this.itemSelected.emit(this.item);
  }

}
