import { HttpClient } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { HeaderComponent } from './components/header/header.component';
// import { ModalComponent} from './components/modal/modal.component';
import { throwIfAlreadyLoaded } from './module-import-guard';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
// }

@NgModule({
  imports: [
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [ HttpClient ]
    //   }
    // }),
    CommonModule
  ],
  exports: [
    // HeaderComponent,
    // ModalComponent,
    // TranslateModule
  ],
  declarations: [/* HeaderComponent, ModalComponent */]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
