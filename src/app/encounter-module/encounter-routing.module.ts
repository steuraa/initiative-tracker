import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncounterResolverService } from '../shared-module/services/encounter-resolver/encounter-resolver.service';
import { EncounterComponent} from './components/encounter.component';

const routes: Routes = [
    {path: ':id', component: EncounterComponent, resolve: {encounter: EncounterResolverService}}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncounterRoutingModule { }
