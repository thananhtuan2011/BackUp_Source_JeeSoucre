import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ThongdiepService } from './_service_TD/thongdiep.service';

@Component({
  selector: 'app-thong-diep',
  templateUrl: './thong-diep.component.html',
  styleUrls: ['./thong-diep.component.scss']
})
export class ThongDiepComponent implements OnInit {

  // check=false;
  check=true;
  listrd_khenthuong:any[]=[];
  listrd_thongdiep:any[]=[];
  constructor(

    private _service:ThongdiepService,
    
    
    private changeDetectorRefs: ChangeDetectorRef,
  ) { }





  loadrandomKt()
  {
      this._service.GetDSKhenThuong_Top2().subscribe(res=>{

          this.listrd_khenthuong=res.data;
        //  this.changeDetectorRefs.detectChanges();
	


      })
  }

  
  loadrandomTD()
  {
      this._service.getrandomDSThongDiep().subscribe(res=>{

          this.listrd_thongdiep=res.data;
          this.changeDetectorRefs.detectChanges();
	


      })
  }
  ngOnInit() {
    this.loadrandomKt();
    this.loadrandomTD();
  }

}
