import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.scss']
})
export class ControlBarComponent implements OnInit {
  selectedOption = 'hero';
  constructor() { }

  ngOnInit() {
  }

  optionSelected(evt) {
    console.log('evt::', evt);
  }

}
