import { Injectable } from '@angular/core';
import { HeroApiService } from './hero-api.service';

@Injectable()
export class HeroDomainService {

  constructor(private heroApiService: HeroApiService) { }

}
