import { EncounterApiService } from './encounter-service/encounter-api.service';
import { EncounterDomainService } from './encounter-service/encounter-domain.service';
import { ErrorHandlingService} from './errorhandling-service/errorHandling.service';
import { HeroApiService } from './hero-service/hero-api.service';
import { HeroDomainService } from './hero-service/hero-domain.service';
import { MonsterApiService } from './monster-service/monster-api.service';
import { MonsterDomainService} from './monster-service/monster-domain.service';
import { StoreService } from './store-service/store.service';

export const GroupedServices = [
  EncounterApiService,
  EncounterDomainService,
  ErrorHandlingService,
  HeroApiService,
  HeroDomainService,
  MonsterApiService,
  MonsterDomainService,
  StoreService
];
