import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonsModule} from 'ngx-bootstrap/buttons';
import { GroupedServices } from './services/grouped-services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonsModule
  ],
  providers: [
    GroupedServices
  ],
  declarations: [],
  exports: [
    FormsModule,
    ButtonsModule
  ]
})
export class SharedModule { }
