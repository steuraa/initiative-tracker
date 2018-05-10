import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { throwIfAlreadyLoaded } from './module-import-guard';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
  ],
  declarations: [ HeaderComponent ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
