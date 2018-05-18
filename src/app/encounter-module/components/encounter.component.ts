import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgressEncounter } from '../../shared-module/models/progressEncounter';

@Component({
  selector: 'app-encounter-component',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.scss']
})
export class EncounterComponent implements OnInit {
  encounter: ProgressEncounter;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data: { encounter: any }) => {
      this.encounter = new ProgressEncounter(data.encounter.data);
    });
  }

  ngOnInit() {
  }

}
