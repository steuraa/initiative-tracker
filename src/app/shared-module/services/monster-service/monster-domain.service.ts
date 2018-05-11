import { Injectable } from '@angular/core';
import { MonsterApiService } from './monster-api.service';

@Injectable()
export class MonsterDomainService {

  constructor(private monsterApiService: MonsterApiService) { }

}
