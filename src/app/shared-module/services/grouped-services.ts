import { EncounterApiService } from './encounter-service/encounter-api.service';
import { EncounterDomainService } from './encounter-service/encounter-domain.service';
import { HeroApiService } from './hero-service/hero-api.service';
import { HeroDomainService } from './hero-service/hero-domain.service';
import { MonsterApiService } from './monster-service/monster-api.service';
import { MonsterDomainService} from './monster-service/monster-domain.service';

export const GroupedServices = [
  EncounterApiService,
  EncounterDomainService,
  HeroApiService,
  HeroDomainService,
  MonsterApiService,
  MonsterDomainService
];
