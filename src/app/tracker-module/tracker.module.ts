import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared-module/shared.module';
import { TrackerRoutingModule } from './tracker-routing.module';
import { CentralFieldComponent } from './components/central-field/central-field.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { OverviewSidebarComponent } from './components/overview-sidebar/overview-sidebar.component';
import { RestartEncounterModalComponent } from './components/control-panel/modals/restart-encounter-modal/restart-encounter-modal.component';
import { SelectionSidebarComponent } from './components/selection-sidebar/selection-sidebar.component';
import { TrackerComponent } from './components/tracker.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TrackerRoutingModule
  ],
  declarations: [
    CentralFieldComponent,
    ControlPanelComponent,
    OverviewSidebarComponent,
    RestartEncounterModalComponent,
    SelectionSidebarComponent,
    TrackerComponent
  ],
  exports: [
    CentralFieldComponent,
    ControlPanelComponent,
    OverviewSidebarComponent,
    RestartEncounterModalComponent,
    SelectionSidebarComponent,
    TrackerComponent
  ]
})
export class TrackerModule {
}
