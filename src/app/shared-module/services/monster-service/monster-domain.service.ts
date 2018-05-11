import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Monster } from '../../models/monster';
import { MonsterApiService } from './monster-api.service';
import { StoreService } from '../store-service/store.service';

@Injectable()
export class MonsterDomainService {

  constructor(private monsterApiService: MonsterApiService, private storeService: StoreService) {
  }

  getAllMonsters(): Observable<Array<Monster>> {
    return this.monsterApiService.getAllMonsters()
      .map(res => {
        if (res.data.length) {
          const monsters = [];
          res.data.forEach(r => {
            monsters.push(new Monster(r));
          });
          this.storeService.passList(monsters);
          return monsters;
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  getMonsterById(id: string): Observable<Monster> {
    return this.monsterApiService.getMonsterById(id)
      .map(res => {
        if (res.data && !res.data.status) {
          this.storeService.passSingleItem(new Monster(res.data));
          return new Monster(res.data);
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  saveMonster(monster: any) {
    return this.monsterApiService.saveMonster(monster)
      .map(res => {
        if (res.data && !res.data.status) {
          this.storeService.passSingleItem(new Monster(res.data));
          return new Monster(res.data);
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  deleteMonster(id) {
    return this.monsterApiService.deleteMonster(id);
  }
}
