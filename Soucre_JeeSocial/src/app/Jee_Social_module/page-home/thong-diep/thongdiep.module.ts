
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThongdiepRoutingModule } from './thongdiep-routing.module';
import { NguyenTacLamviecComponent } from './nguyen-tac-lamviec/nguyen-tac-lamviec.component';
// import { ThongDiepViewComponent } from './thong-diep-view/thong-diep-view.component';
import { ThongdiepService } from './_service_TD/thongdiep.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { SuaThongDiepComponent } from './sua-thong-diep/sua-thong-diep.component';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
// import { DetailThongdiepComponent } from './detail-thongdiep/detail-thongdiep.component';

@NgModule({
  declarations: [
    
    NguyenTacLamviecComponent,
    // ThongDiepViewComponent,
    // SuaThongDiepComponent,
    //  DetailThongdiepComponent,
 
   
  ],
  entryComponents: [
   
    // SuaThongDiepComponent,
  
  
  ],
  providers: [

    ThongdiepService
  
  ],
  imports: [
    CommonModule,
    ThongdiepRoutingModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule ,
    MatDialogModule
 
  ]
})
export class ThongdiepModule { }
