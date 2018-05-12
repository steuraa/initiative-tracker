import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonsModule} from 'ngx-bootstrap/buttons';
import { GroupedServices } from './services/grouped-services';
import { ControlBarComponent } from './components/control-bar/control-bar.component';
import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonsModule
  ],
  providers: [
    GroupedServices
  ],
  declarations: [ControlBarComponent, ListItemComponent],
  exports: [
    FormsModule,
    ButtonsModule,
    ControlBarComponent,
    ListItemComponent
  ]
})
export class SharedModule { }
