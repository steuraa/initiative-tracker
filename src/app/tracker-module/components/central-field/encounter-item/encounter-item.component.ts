import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-encounter-item',
  templateUrl: './encounter-item.component.html',
  styleUrls: ['./encounter-item.component.scss']
})
export class EncounterItemComponent implements OnInit {
  @Input() participant: any;

  constructor() {
  }

  ngOnInit() {
  }

}
