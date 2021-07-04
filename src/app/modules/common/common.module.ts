import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LoadItDirective } from './directives/load-it.directive';



@NgModule({
  declarations: [
    LoaderComponent,
    LoadItDirective
    ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadItDirective,
    LoaderComponent
  ],
  entryComponents: [
    LoaderComponent
  ]
})
export class CommonsModule { }
