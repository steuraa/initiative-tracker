import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackerModule } from './tracker-module/tracker.module';
import { EncounterModule } from './encounter-module/encounter.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tracker-module/tracker.module#TrackerModule'
  },
  {
    path: 'encounters',
    loadChildren: './encounter-module/encounter.module#EncounterModule'
  }
];

@NgModule({
  imports: [
    TrackerModule,
    EncounterModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
