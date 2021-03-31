import { PageHomeService } from './../page-home/_services/page-home.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlowGioithieuCanhanComponent } from './flow-gioithieu-canhan/flow-gioithieu-canhan.component';
import { FlowBaidangCanhanComponent } from './flow-baidang-canhan/flow-baidang-canhan.component';
import { FlowCaNhanComponent } from './flow-ca-nhan.component';
import { FlowCanhanRoutingModule } from './flow-canhan-routing.module';
import { DisplayTrangCaNhanComponent } from './display-trang-ca-nhan/display-trang-ca-nhan.component';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { InlineSVGModule } from 'ng-inline-svg';

import { FlowCaNhanService } from './flow-ca-nhan.service';
import { PopoverModule } from 'ngx-smart-popover';
import { CommentService } from '../page-home/_services/comment.service';
import { GroupService } from '../page-home/_services/group.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    FlowBaidangCanhanComponent,
    FlowGioithieuCanhanComponent,
    FlowCaNhanComponent,
    DisplayTrangCaNhanComponent,

  ],

  providers: [
	
    PageHomeService,
   
    CommentService,
    GroupService,
    FlowCaNhanService,
    
    
  
    
  
  
  ],
  imports: [
    CommonModule,
    FlowCanhanRoutingModule,
    NgbModule,
	InfiniteScrollModule,
	MatChipsModule,
	MatSelectModule,
	PopoverModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
	MatButtonModule,
	
	HttpClientModule,
		MatMenuModule,
		MatSelectModule,
		MatInputModule,
		
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		// MatPaginatorModule,
		// MatSortModule,
		// MatCheckboxModule,
		// MatProgressSpinnerModule,
		// MatSnackBarModule,
		// MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
		MatCardModule,

		// ng-bootstrap modules
	NgbTooltipModule,
	FormsModule,
	MatFormFieldModule,

    PerfectScrollbarModule,
	InlineSVGModule,
	FlexLayoutModule,
	FormsModule,
	ReactiveFormsModule,
  ]
})
export class FlowCanhanModule { }
