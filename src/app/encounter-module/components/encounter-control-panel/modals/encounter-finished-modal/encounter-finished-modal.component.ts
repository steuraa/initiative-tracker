import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-encounter-finished-modal',
  templateUrl: './encounter-finished-modal.component.html',
  styleUrls: ['./encounter-finished-modal.component.scss']
})
export class EncounterFinishedModalComponent implements OnInit {
  @Input() losers: string;
  @Output() finishEmit: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  finishEncounter(finish: boolean) {
    this.finishEmit.emit(finish);
  }

}
