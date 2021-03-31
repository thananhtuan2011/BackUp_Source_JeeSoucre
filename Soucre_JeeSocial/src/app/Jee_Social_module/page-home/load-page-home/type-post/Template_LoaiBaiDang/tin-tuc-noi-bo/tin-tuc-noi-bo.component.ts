import { GroupService } from './../../../../_services/group.service';
import { BaiDangModel } from './../../../../_model/BaiDang.model';
import { PageHomeService } from './../../../../_services/page-home.service';
import { LayoutUtilsService, MessageType } from './../../../../../../_metronic/core/utils/layout-utils.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import * as moment from 'moment'; 
import { FormControl } from '@angular/forms';

 import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute } from '@angular/router';
import { TypePostComponent } from '../../type-post.component';

@Component({
  selector: 'kt-tin-tuc-noi-bo',
  templateUrl: './tin-tuc-noi-bo.component.html',
  styleUrls: ['./tin-tuc-noi-bo.component.scss'],
 
})
export class TinTucNoiBoComponent implements OnInit {

  list_group:any[]=[];
  item:any[]=[];
  tam:string;
  lastUpdated: string;
  Time:Date;
  id_loaibaidang:number;
  htmlContent:string='';
  id:number;
  id_user:number;
  tieude:string;
  dulieu = new FormControl('');
  id_group = new FormControl('');
  congkhai='Công Khai';
   editor = ClassicEditor;
  dl: any = `Nhập nội dung`;
  selected:number;
  public groupFilterCtrl: FormControl = new FormControl();
  constructor(   private dialogRef:MatDialogRef<TinTucNoiBoComponent>,
    private dialogRef_all:MatDialogRef<TypePostComponent>,
    private _services:PageHomeService,
    private changeDetectorRefs: ChangeDetectorRef,
   private  _services_group: GroupService,
    private layoutUtilsService: LayoutUtilsService,
    //  private dataSource:BaiDangDataSource,
     private _service_gr:GroupService,
    private route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {   this.lastUpdated = this.getCurrentTime();}


    
        // get id user
    LoadData() {
      // debugger
      this._services.getUserData().subscribe(res =>{
        this.item= res;
        this.id_user=res.Id;
      });
     
    }
   
    
      

 

  closeDilog()
  {
    this.dialogRef.close();
  }
                

  
  f_convertDate(p_Val: any) {
    let a = p_Val === "" ? new Date() : new Date(p_Val);
    return ("0" + (a.getDate())).slice(-2) + "/" + ("0" + (a.getMonth() + 1)).slice(-2) + "/" + a.getFullYear();
  }


  ItemBaiDang(): BaiDangModel {
		//  debugger
	
	
		//const controls = this.itemForm.controls;
		
		const item = new BaiDangModel();
    
      // Users: Array<BaiDangUser> = [];	// user.ID_User = this.item.ID_User;
      if(this.id_group.value=="Công Khai"||this.id_group.value==0)
      {
        var plainText = this.dulieu.value.replace(/<[^>]*>/g," ");
        // let myDate=new Date(this.lastUpdated);
        let dateString =this.lastUpdated;
          let myDate=new Date('');
        
          item.id_loaibaidang=this.id_loaibaidang;
          item.title=this.tieude;
          item.NoiDung=plainText;
          // item.Id_Group=this.id_group.value;
          item.typepost='';
      }
      else

      {

      
      var plainText = this.dulieu.value.replace(/<[^>]*>/g," ");
        // let myDate=new Date(this.lastUpdated);
        let dateString =this.lastUpdated;
          let myDate=new Date('');
        
          item.id_loaibaidang=this.id_loaibaidang;
          item.title=this.tieude;
          item.NoiDung=plainText;
          item.Id_Group=this.id_group.value;
          item.typepost='';
          // item.CreatedDate=myDate;
         // item.CreatedBy=this.id_user;
        
          // item.UpdateDate=null;
      }
       
        
		this.changeDetectorRefs.detectChanges();
		return item;
	}

  AddBaiDang(item: BaiDangModel, withBack: boolean) {
    // this.loadingAfterSubmit = true;
    // debugger
    if(this.id_group.value=="Công Khai"||this.id_group.value==0)
    {

        
        this._services.Insert(item,this._services.rt_addbaidang).subscribe(res => {
          if (res && res.status === 1) {
          this.dialogRef.close();
          //  this.dataSource.loadListBaiDang();
        
            
          }
          else {
            this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
          }
        });
      }
      else

      {
        this._services.Insert(item,this._services.rt_addbaidang).subscribe(res => {
          if (res && res.status === 1) {
          this.dialogRef.close();
          //  this.dataSource.loadListBaiDang();
        
            
          }
          else {
            this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
          }
        });
      }
  }
 

 

  submit()
  {
    // debugger
    let ItemBd=this.ItemBaiDang();
    this.AddBaiDang(ItemBd,false);

    // this.ThongBaotInsert();
    // this.reload.loadDataList();
    // this._BaiDangViewComponent.change();
    this.dialogRef_all.close();
    this.changeDetectorRefs.detectChanges();

  }

   getCurrentTime(){
    return moment().format('DD/MM/YYYY HH:mm:ss'); 
 }



 LoadListGroup(){
  this._service_gr.Get_Social(this._service_gr.rt_getlist_group).subscribe(res =>{
        this.list_group=res.data;
  })
}


getDataShare(){
  this._services_group.id_group$.subscribe(res=>{
    this.selected=Number(res);
  })

}
 
  ngOnInit() {
    this.id_loaibaidang=this.data.id_loaibaidang;

    this.getDataShare();
    this.LoadData();
    
    this.LoadListGroup();
    this.groupFilterCtrl.setValue('');

    
   // console.log(this.id_loai_bai_dang);
   
  }









  

}
