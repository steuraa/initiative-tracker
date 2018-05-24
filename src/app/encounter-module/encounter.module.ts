import { forwardRef, NgModule } from '@angular/core';
import { SharedModule } from '../shared-module/shared.module';
import { CommonModule } from '@angular/common';
import { EncounterRoutingModule } from './encounter-routing.module';
import { EncounterResolverService } from '../shared-module/services/encounter-resolver/encounter-resolver.service';
import { CentralEncounterFieldComponent } from './components/central-encounter-field/central-encounter-field.component';
import { DeleteModalComponent } from './components/encounter-control-panel/modals/delete-modal/delete-modal.component';
import { EncounterControlPanelComponent } from './components/encounter-control-panel/encounter-control-panel.component';
import { EncounterComponent } from './components/encounter.component';
// tslint:disable-next-line
import { EncounterFinishedModalComponent} from './components/encounter-control-panel/modals/encounter-finished-modal/encounter-finished-modal.component';
import { InitiativeModalComponent } from './components/encounter-control-panel/modals/initiative-modal/initiative-modal.component';
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
    CentralEncounterFieldComponent,
    DeleteModalComponent,
    EncounterControlPanelComponent,
    EncounterComponent,
    EncounterFinishedModalComponent,
    InitiativeModalComponent,
    PlayerSidebarComponent,
    TargetSidebarComponent
  ],
  exports: [
    CentralEncounterFieldComponent,
    DeleteModalComponent,
    EncounterControlPanelComponent,
    EncounterComponent,
    EncounterFinishedModalComponent,
    InitiativeModalComponent,
    PlayerSidebarComponent,
    TargetSidebarComponent
  ]
})
export class EncounterModule {
}
