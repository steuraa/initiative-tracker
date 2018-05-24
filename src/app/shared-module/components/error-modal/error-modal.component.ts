import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {
  @Input() errorMessage: string;
  @Output() closeError: EventEmitter<any> = new EventEmitter<any>();


  close() {
    this.closeError.emit();
  }

}
