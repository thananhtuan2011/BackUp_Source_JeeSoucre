import { GroupService } from './../_services/group.service';
import { AuthService } from './../../../modules/auth/_services/auth.service';
import { PageHomeService } from './../_services/page-home.service';
import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-content-left',
  templateUrl: './content-left.component.html',
  styleUrls: ['./content-left.component.scss']
})
export class ContentLeftComponent implements OnInit {
  list_group:any[]=[];
  // ReloadData:Subscription;
  id_user:number;
  list_user:any[]=[];
  name_user:string;
  constructor(

    private _service_gr:GroupService,
    // private tokenStore:TokenStorage,
    private _service:PageHomeService,

    private _authservice:AuthService,
    private changeDetectorRefs: ChangeDetectorRef,

  ) {
    // this.ReloadData = this._services.getClickEvent().subscribe(
		// 	() => {
			
		// // this.loadDataList();
		


    
		// this.ngOnInit();
	
	
		// 	}
		// );

   }

   @Input() name: any;

  ngOnChanges(change: SimpleChanges) {
    if(change["name"]) {
      this.LoadListGroup();
      // console.log(change["name"]);
    }
  }


   LoadListGroup(){
      this._service_gr.Get_Social(this._service_gr.rt_getlist_group).subscribe(res =>{
            this.list_group=res.data;
         //   this.changeDetectorRefs.detectChanges();
      })
   }

   GetCurrentUser() {
    this._service.getUserData().subscribe(res =>{
    //   this.item= res;
    console.log('Crursss',res);
      this.id_user=res.Id
    });
     
    
    }

    reload()
    {
   
      // this._service.sendClickEvent();
			
    }
   
    loadRandomUser()
    {
      this._service_gr.Get_Social(this._service_gr.rt_random_user).subscribe(res =>{
        this.list_user=res.data;
       
  })
    }
    getTT(user_name:string){
      this.name_user=user_name;
    }
  ngOnInit() {
  
    this.GetCurrentUser();
    this.LoadListGroup();
    this.loadRandomUser();
  }


}
