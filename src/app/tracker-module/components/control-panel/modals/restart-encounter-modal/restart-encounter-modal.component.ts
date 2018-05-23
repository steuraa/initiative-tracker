import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-restart-encounter-modal',
  templateUrl: './restart-encounter-modal.component.html',
  styleUrls: ['./restart-encounter-modal.component.scss']
})
export class RestartEncounterModalComponent implements OnInit {
  @Output() restartEncounter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  restart(doDelete: boolean) {
    this.restartEncounter.emit(doDelete);
  }

}
