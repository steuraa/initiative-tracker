import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared-module/shared.module';
import { TrackerRoutingModule} from './tracker-routing.module';
import { TrackerComponent} from './components/tracker.component';
import { ControlBarComponent } from './components/control-bar/control-bar.component';
import { OverviewSidebarComponent } from './components/overview-sidebar/overview-sidebar.component';
import { CentralFieldComponent } from './components/central-field/central-field.component';
import { SelectionSidebarComponent } from './components/selection-sidebar/selection-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TrackerRoutingModule
  ],
  declarations: [
    TrackerComponent,
    ControlBarComponent,
    OverviewSidebarComponent,
    CentralFieldComponent,
    SelectionSidebarComponent
  ],
  exports: [
    TrackerComponent,
    ControlBarComponent,
    SelectionSidebarComponent,
    OverviewSidebarComponent,
    CentralFieldComponent
  ]
})
export class TrackerModule { }
