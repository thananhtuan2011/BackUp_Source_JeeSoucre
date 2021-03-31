import { TrangCaNhanService } from './../../page-home/_services/trang-ca-nhan.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlowCaNhanService } from '../flow-ca-nhan.service';

@Component({
  selector: 'kt-flow-gioithieu-canhan',
  templateUrl: './flow-gioithieu-canhan.component.html',
  styleUrls: ['./flow-gioithieu-canhan.component.scss']
})
export class FlowGioithieuCanhanComponent implements OnInit {
  @Input() id_user_canhan: any;

  item:any[]=[];
  list_randomanh:any[]=[];
  listGioiThieu:any[]=[];
  id_user_current:number;
  list_Flow:any[]=[];
  constructor(
    private _service:FlowCaNhanService,
    private service_canhan:TrangCaNhanService,

    private changeDetectorRefs: ChangeDetectorRef,
    private route:ActivatedRoute,

  ) { }

  getCurrentUser() 
	{
	  this.service_canhan.getUserData().subscribe(res =>{
	   
		  this.item= res;
		  this.id_user_current=res.Id;
	 
  
	  });
  }


  
  LoadFlow()

  {
 
        this._service.getFlow(this.id_user_canhan,this._service.rt_flow).subscribe(res=>{
          this.list_Flow=res.data;
              this.changeDetectorRefs.detectChanges();
              console.log('Flow_GiiThieu',this.list_Flow);
        })
  }
  LoadGioiThieu()
  {
        this._service.getGioiThieuFlow(this.id_user_canhan).subscribe(res =>{
          this.listGioiThieu=res.data;
          this.changeDetectorRefs.detectChanges();
        })
  }

  LoadOneImage()

  {
	this.service_canhan.getRanDomAnh(this.service_canhan.rt_API_TrangCaNhan).subscribe(res=>{
	this.list_randomanh=res.data;
	this.changeDetectorRefs.detectChanges();
	})

  }
  ngOnInit() {
   
    this.route.params.subscribe(params => {
    
      this.id_user_canhan =+params.id_canhan;
     
    
    // this.GetCurrentUser();

    this.LoadGioiThieu();
    this.LoadOneImage();
    this.getCurrentUser();
    this.LoadFlow();
  });

}
}
