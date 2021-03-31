import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { StickyDirective } from './sticky.directive';

@NgModule({
  declarations: [FirstLetterPipe, SafePipe,StickyDirective],
  imports: [CommonModule,
    // StickyDirective,
  
  ],
  exports: [FirstLetterPipe, SafePipe],
})
export class CoreModule { }
