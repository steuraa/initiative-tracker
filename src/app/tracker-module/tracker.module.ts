import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared-module/shared.module';
import { TrackerRoutingModule } from './tracker-routing.module';
import { TrackerComponent } from './components/tracker.component';
import { OverviewSidebarComponent } from './components/overview-sidebar/overview-sidebar.component';
import { CentralFieldComponent } from './components/central-field/central-field.component';
import { SelectionSidebarComponent } from './components/selection-sidebar/selection-sidebar.component';
import { SelectionSidebarOverviewComponent } from './components/selection-sidebar/selection-sidebar-overview/selection-sidebar-overview.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TrackerRoutingModule
  ],
  declarations: [
    CentralFieldComponent,
    OverviewSidebarComponent,
    SelectionSidebarComponent,
    SelectionSidebarOverviewComponent,
    TrackerComponent
  ],
  exports: [
    CentralFieldComponent,
    OverviewSidebarComponent,
    SelectionSidebarComponent,
    SelectionSidebarOverviewComponent,
    TrackerComponent
  ]
})
export class TrackerModule {
}
