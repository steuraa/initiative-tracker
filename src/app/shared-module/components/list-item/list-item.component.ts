import {
  Component, OnInit, Input, Output,
  EventEmitter, ChangeDetectionStrategy
} from '@angular/core';
import { Encounter } from '../../models/encounter';
import { Hero } from '../../models/hero';
import { Monster } from '../../models/monster';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {
  @Input() item: Monster | Hero | Encounter;
  @Output() itemSelected = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  selectItem() {
    this.itemSelected.emit(this.item);
  }

}
