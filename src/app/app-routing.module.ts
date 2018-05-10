import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TrackerModule } from './tracker-module/tracker.module';
import { EncounterModule } from './encounter-module/encounter.module';
import { AppComponent } from './app.component';
import { TrackerComponent } from './tracker-module/components/tracker.component';

const routes: Routes = [
  // {
  //   path: '', pathMatch: 'full', component: AppComponent
  // },
  {
    path: '',
    loadChildren: './tracker-module/tracker.module#TrackerModule'
  },
  {
    path: 'encounter',
    loadChildren: './encounter-module/encounter.module#EncounterModule'
  }
];

@NgModule({
  imports: [
    TrackerModule,
    EncounterModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
