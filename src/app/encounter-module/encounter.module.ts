import { forwardRef, NgModule } from '@angular/core';
import { SharedModule } from '../shared-module/shared.module';
import { CommonModule } from '@angular/common';
import { EncounterRoutingModule } from './encounter-routing.module';
import { EncounterResolverService } from '../shared-module/services/encounter-resolver/encounter-resolver.service';
import { CentralFieldComponent } from './components/central-field/central-field.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { EncounterComponent } from './components/encounter.component';
import { InitiativeComponent } from './components/central-field/initiative/initiative.component';
import { PlayerSidebarComponent } from './components/player-sidebar/player-sidebar.component';
import { TargetSidebarComponent } from './components/target-sidebar/target-sidebar.component';

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
    InitiativeComponent,
    PlayerSidebarComponent,
    TargetSidebarComponent
  ],
  exports: [
    CentralFieldComponent,
    ControlPanelComponent,
    EncounterComponent,
    InitiativeComponent,
    PlayerSidebarComponent,
    TargetSidebarComponent
  ]
})
export class EncounterModule {
}
