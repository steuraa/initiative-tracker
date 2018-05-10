import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncounterRoutingModule} from './encounter-routing.module';
import { EncounterComponent } from './components/encounter-component/encounter.component';

@NgModule({
  imports: [
    CommonModule,
    EncounterRoutingModule
  ],
  declarations: [
    EncounterComponent
  ],
  exports: [EncounterComponent]
})
export class EncounterModule { }
