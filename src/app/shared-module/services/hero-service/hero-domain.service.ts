import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Hero } from '../../models/hero';
import { HeroApiService } from './hero-api.service';
import { StoreService } from '../store-service/store.service';

@Injectable()
export class HeroDomainService {

  constructor(private heroApiService: HeroApiService, private storeService: StoreService) {
  }

  getAllHeroes(): Observable<Array<Hero>> {
    return this.heroApiService.getAllHeroes()
      .map(res => {
        if (res.data.length && !res.data.status) {
          const heroes = [];
          res.data.forEach(r => {
            heroes.push(new Hero(r));
          });
          this.storeService.passList(heroes);
          return heroes;
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  getHeroById(id: string): Observable<Hero> {
    return this.heroApiService.getHeroById(id)
      .map(res => {
        if (res.data && !res.data.status) {
          this.storeService.passSingleItem(new Hero(res.data));
          return new Hero(res.data);
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  saveHero(hero: Hero) {
    return this.heroApiService.saveHero(hero)
      .map(res => {
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
