import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlBarComponent implements OnChanges {
  @Input() buttonOptions: any;
  @Output() emitButton: EventEmitter<any> = new EventEmitter<any>();
  selectedOption = '';

  constructor() {
  }

  ngOnChanges(change) {
    if (change.buttonOptions.currentValue) {
      this.buttonOptions.forEach(b => {
        if (b.selected) {
          this.selectedOption = b.value;
          this.emitButton.next(b.value);
        }
      });
    }
  }

  optionSelected(evt) {
    this.emitButton.next(evt);

  }

}
