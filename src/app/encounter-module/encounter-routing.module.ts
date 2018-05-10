import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncounterComponent} from './components/encounter-component/encounter.component';

const routes: Routes = [
    {path: '', component: EncounterComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncounterRoutingModule { }
