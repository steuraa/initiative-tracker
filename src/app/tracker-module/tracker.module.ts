import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerRoutingModule} from './tracker-routing.module';
import { TrackerComponent} from './components/tracker-component/tracker.component';

@NgModule({
  imports: [
    CommonModule,
    TrackerRoutingModule
  ],
  declarations: [
    TrackerComponent
  ],
  exports: [
    TrackerComponent
  ]
})
export class TrackerModule { }
