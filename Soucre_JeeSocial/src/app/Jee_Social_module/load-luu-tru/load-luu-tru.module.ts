import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadLuuTruRoutingModule } from './load-luu-tru-routing.module';
import { LoadLuutruComponent } from './load-luutru/load-luutru.component';


@NgModule({
  declarations: [LoadLuutruComponent],
  imports: [
    CommonModule,
    LoadLuuTruRoutingModule
  ]
})
export class LoadLuuTruModule { }
