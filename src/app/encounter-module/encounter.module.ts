import { forwardRef, NgModule } from '@angular/core';
import { SharedModule } from '../shared-module/shared.module';
import { CommonModule } from '@angular/common';
import { EncounterRoutingModule } from './encounter-routing.module';
import { EncounterResolverService } from '../shared-module/services/encounter-resolver/encounter-resolver.service';
import { CentralFieldComponent } from './components/central-field/central-field.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { EncounterComponent } from './components/encounter.component';
import { EncounterItemComponent } from './components/central-field/encounter-item/encounter-item.component';
import { OverviewSidebarComponent } from './components/overview-sidebar/overview-sidebar.component';
import { OverviewCharScreenComponent } from './components/overview-sidebar/overview-char-screen/overview-char-screen.component';
import { SelectionSidebarComponent } from './components/selection-sidebar/selection-sidebar.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    EncounterRoutingModule
  ],
  providers: [
    forwardRef(() => EncounterResolverService)
  ],
  declarations: [
    CentralFieldComponent,
    ControlPanelComponent,
    EncounterComponent,
    EncounterItemComponent,
    OverviewSidebarComponent,
    OverviewCharScreenComponent,
    SelectionSidebarComponent
  ],
  exports: [
    CentralFieldComponent,
    ControlPanelComponent,
    EncounterComponent,
    EncounterItemComponent,
    OverviewSidebarComponent,
    OverviewCharScreenComponent,
    SelectionSidebarComponent
  ]
})
export class EncounterModule {
}
