import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-initiative-modal',
  templateUrl: './initiative-modal.component.html',
  styleUrls: ['./initiative-modal.component.scss']
})
export class InitiativeModalComponent implements OnInit {
  @Input() heroes: Array<any>;
  @Input() monsters: Array<any>;
  @Output() setOrder: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  close() {
    this.setOrder.emit({
      heroes: this.heroes,
      monsters: this.monsters
    });
  }

}
