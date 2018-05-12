import { Component, OnInit } from '@angular/core';
import { HeroDomainService } from '../../../shared-module/services/hero-service/hero-domain.service';
import { MonsterDomainService } from '../../../shared-module/services/monster-service/monster-domain.service';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.scss']
})
export class ControlBarComponent implements OnInit {
  selectedOption = 'hero';

  constructor(private monsterService: MonsterDomainService, private heroService: HeroDomainService) {
  }

  ngOnInit() {
  }

  optionSelected(evt) {
    const monster = {
      'abilities': ['Slime'],
      'name': 'Zombieslimer',
      'creature_class': 'Medium undead',
      'description': 'neutral evil',
      'hp': 28,
      'ac': 10,
      'init_mod': -1
    };
    switch (evt) {
      case 'hero': {
        this.heroService.getAllHeroes();
        break;
      }
      case 'monster': {
        this.monsterService.getAllMonsters();
        break;
      }
      case 'enc': {
        console.log('TODO: Encounters');
        break;
      }
      default: {
        console.log('TODO: Start encounter');
      }
    }
  }

}
