import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster';
import { MonsterApiService } from './monster-api.service';
import { StoreService } from '../stores/store.service';

@Injectable()
export class MonsterDomainService {

  constructor(private monsterApiService: MonsterApiService, private storeService: StoreService) {
  }

  getAllMonsters(): void {
    this.monsterApiService.getAllMonsters()
      .subscribe(res => {
        if (res.data && !res.data.status) {
          const monsters = [];
          res.data.forEach(r => {
            monsters.push(new Monster(r));
          });
          this.storeService.passList(monsters, 'monsters');
          // return monsters;
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  getMonsterById(id: string, player?: boolean): void {
    this.monsterApiService.getMonsterById(id)
      .subscribe(res => {
        if (res.data && !res.data.status) {
          !player ? this.storeService.passSingleItem(new Monster(res.data)) : this.storeService.passPlayer(new Monster(res.data));
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  saveMonster(monster: any): void {
    this.monsterApiService.saveMonster(monster)
      .subscribe(res => {
        if (res.data && !res.data.status) {
          this.storeService.passSingleItem(new Monster(res.data));
        } else {
          this.storeService.passError(res.data);
        }
      });
  }

  deleteMonster(id) {
    return this.monsterApiService.deleteMonster(id);
  }
}
