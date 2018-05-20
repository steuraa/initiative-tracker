import { Injectable } from '@angular/core';
import { Hero } from '../../models/hero';
import { HeroApiService } from './hero-api.service';
import { StoreService } from '../store-service/store.service';

@Injectable()
export class HeroDomainService {

  constructor(private heroApiService: HeroApiService, private storeService: StoreService) {
  }

  getAllHeroes(): void {
    this.heroApiService.getAllHeroes()
      .subscribe(res => {
        if (res.data.length && !res.data.status) {
          const heroes = [];
          res.data.forEach(r => {
            heroes.push(new Hero(r));
          });
          this.storeService.passList(heroes, 'heroes');
          return heroes;
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  getHeroById(id: string, player?: boolean): void {
    this.heroApiService.getHeroById(id)
      .subscribe(res => {
        if (res.data && !res.data.status) {
          !player ? this.storeService.passSingleItem(new Hero(res.data)) : this.storeService.passPlayer(new Hero(res.data));
          return new Hero(res.data);
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  saveHero(hero: Hero): void {
    this.heroApiService.saveHero(hero)
      .subscribe(res => {
        if (res.data && !res.data.status) {
          this.storeService.passSingleItem(new Hero(res.data));
          return new Hero(res.data);
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  deleteHero(id) {
    return this.heroApiService.deleteHero(id);
  }
}
