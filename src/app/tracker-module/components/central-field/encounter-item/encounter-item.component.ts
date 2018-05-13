import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  /* tslint:disable-next-line */
  selector: '[app-encounter-item]',
  templateUrl: './encounter-item.component.html',
  styleUrls: ['./encounter-item.component.scss']
})
export class EncounterItemComponent {
  @Input() participant: any;
  @Input() index: any;
  @Output() removeEmit: EventEmitter<any> = new EventEmitter<any>();
  remove() {
    this.removeEmit.next({feature: this.participant, index: this.index});
  }
}
