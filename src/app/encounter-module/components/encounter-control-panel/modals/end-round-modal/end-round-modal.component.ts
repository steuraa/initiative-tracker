import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-end-round-modal',
  templateUrl: './end-round-modal.component.html'
})
export class EndRoundModalComponent {
  @Output() endRound: EventEmitter<any> = new EventEmitter<any>();

  end(endRound: boolean) {
    this.endRound.emit(endRound);
  }

}
