import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Encounter } from '../../../../shared-module/models/encounter';
import { Hero } from '../../../../shared-module/models/hero';
import { Monster } from '../../../../shared-module/models/monster';

@Component({
  selector: 'app-overview-char-screen',
  templateUrl: './overview-char-screen.component.html',
  styleUrls: ['./overview-char-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewCharScreenComponent implements OnChanges {
  @Input() item: any;
  @Input() editable: boolean;
  @Output() cancelEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveEdit: EventEmitter<any> = new EventEmitter<any>();
  player = false;
  tempItem: any;

  constructor() {
  }

  ngOnChanges(changes) {
    if (changes.item && changes.item.currentValue && (changes.item.currentValue !== changes.item.lastValue)) {
      this.tempItem = Object.assign({}, changes.item.currentValue);
      this.player = !!(this.tempItem.player);
    } else if (changes.item && !changes.item.currentValue) {
      this.tempItem = undefined;
      this.player = false;
    }
  }

  cancel() {
    this.tempItem = Object.assign({}, this.item);
    this.cancelEdit.next(false);
  }

  save() {
    this.saveEdit.next(this.tempItem);
    // console.log('tempItem::', this.tempItem);
  }
}
