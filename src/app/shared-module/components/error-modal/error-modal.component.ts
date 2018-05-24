import { Component, EventEmitter, OnChanges, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnChanges {
  @Input() errorMessage: string;
  @Output() closeError: EventEmitter<any> = new EventEmitter<any>();

  ngOnChanges(changes) {
    if (!changes.errorMessage.currentValue) {
      this.errorMessage = 'Something went wrong in the backend. Make sure it is up and running.';
    }
  }

  close() {
    this.closeError.emit();
  }

}
