import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule} from 'ngx-bootstrap/buttons';
import { GroupedServices } from './services/grouped-services';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
  imports: [
    ButtonsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GroupedServices
  ],
  declarations: [ErrorModalComponent, ListItemComponent],
  exports: [
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorModalComponent,
    ListItemComponent
  ]
})
export class SharedModule { }
