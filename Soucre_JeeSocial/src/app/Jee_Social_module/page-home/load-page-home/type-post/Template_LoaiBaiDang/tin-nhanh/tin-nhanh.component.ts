import { GroupService } from './../../../../_services/group.service';
import { ImageModel } from './../../../../_model/Img.model';
import { BaiDangModel } from './../../../../_model/BaiDang.model';
import { PageHomeService } from './../../../../_services/page-home.service';
import { LayoutUtilsService, MessageType } from './../../../../../../_metronic/core/utils/layout-utils.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';

import { DatePipe } from '@angular/common';
import * as moment from 'moment'; 
import { FormControl } from '@angular/forms';

@Component({
  selector: 'kt-tin-nhanh',
  templateUrl: './tin-nhanh.component.html',
  styleUrls: ['./tin-nhanh.component.scss']
})
export class TinNhanhComponent implements OnInit {

  
  public groupFilterCtrl: FormControl = new FormControl();
  constructor(
    
    private dialogRef:MatDialogRef<TinNhanhComponent>,
    private _services:PageHomeService,
    private _services_group:GroupService,
    private changeDetectorRefs: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
    // private  sharedService: SharedService,
    private _service_gr:GroupService,
    // private _service_file:UploadfileService,
    // private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    listTT_user:any[]=[];
    list_group:any[]=[];
  tin:string='';
  tam:string
  item:any[]=[];
  id_loaibaidang:number;
  congkhai='Công Khai';
  isDisabled = true;
  selected:number;
  id_user:number;
  id_loai_bai_dang:string;
  tieude:string;
  id:number
  id_group = new FormControl('');
  image: any;
  images:any[]=[];
  filesAmount: File = null;
  imgURL:any;
  AttachFileComment: any[] = [];
  base64Image: string;
  nameimg:any;
  
  
  // Bắt đầu phần comment
  

  
 
  LoadUser() {
    // debugger
    this._services.getUserData().subscribe(res =>{
      this.item= res;
    });
  }
  getCurrentUser() 
  {
    this._services.getUserData().subscribe(res =>{
     
        this.item= res;
        this.id_user=res.ID_user;
   

    });
  }

 


  item_baidang():BaiDangModel
  {
    const item = new BaiDangModel();
      
        
        item.id_loaibaidang=this.id_loaibaidang;
        item.title=this.tin;
         item.NoiDung='';
         item.typepost='';
         item.Id_Group=this.id_group.value;
        // item.CreatedDate=myDate;
        //item.CreatedBy=this.id_user;
       /// item.id_group=null;
        // item.UpdateDate=null;
        //item.UpdateBy=null
      
  this.changeDetectorRefs.detectChanges();
  return item;
  }

  addTinNhanh(item:BaiDangModel, withBack: boolean)
  {
    if(this.id_group.value=="Công Khai"||this.id_group.value==0)
    {
    this._services.Insert(item,this._services.rt_addbaidang).subscribe(res => {
			if (res && res.status === 1) {
       this.dialogRef.close();
      //  this.dataSource.loadListBaiDang();
     
    //  this.ThongBaotInsert();
//this.ThongBaoForApp();
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
     //  this.ThongBaotInsert();
      // this.ThongBaoForApp();
      //  this.dataSource.loadListBaiDang();
     
        
			}
			else {
				this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
			}
    });
  }
  }
 
	onSelectFile_PDF(event) {

    if (event.target.files && event.target.files[0]) {
     
			var filesAmount = event.target.files[0];
      var Strfilename = filesAmount.name.split('.');
    
		

		
			var reader = new FileReader();
			//this.FileAttachName = filesAmount.name;
			let base64Str: any;
			reader.onload = (event) => {
        this.image=reader.result;
      this.base64Image = ''+event.target["result"];
      this.nameimg=filesAmount.name;
      this.base64Image = this.base64Image.split(',')[1];
    
					this.changeDetectorRefs.detectChanges();
		
				}
			}

			reader.readAsDataURL(filesAmount);

		}
   
    Item_hinh(): ImageModel {
     
      const item = new ImageModel();
    

           item.image=this.base64Image;
           if(this.nameimg==="")
           {
            item.name=null;
           }
           else

           {
            item.name=this.nameimg;
           }
          
      
      this.changeDetectorRefs.detectChanges();
      return item;
    }
		
		
		  

      insert_file()
      {
      
        let hinh=this.Item_hinh();
     
      
         this._services.postWithFile(hinh,this._services.rt_file_image).subscribe((res) => {

			  });
      }

  submit()
  {
    let item=this.item_baidang();
      this.addTinNhanh(item,false);
     

      if(this.nameimg!=null ||this.nameimg!=" ")
      {
        this.insert_file();
      }
     
      this.changeDetectorRefs.detectChanges();
  }

  
  closeDilog()
  {
    this.dialogRef.close();
  }

  flip() {
    // debugger
    if(this.tin!="")
    this.isDisabled = !this.isDisabled;
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
  //  this.sharedService.id_group.subscribe(sharedata => this.tam = sharedata)
  

  
  }
   
  loadTTuser()
  {
    this._services.getProFileUsers_change().subscribe(res =>{	
  
      this.listTT_user=res.data;
      this.changeDetectorRefs.detectChanges();
    
    })
  }

  ngOnInit() {
    this.getDataShare();
    this.getCurrentUser();
    this.loadTTuser();
    this.LoadUser();
   
this.id_loaibaidang=this.data.id_loaibaidang;
    this.LoadListGroup();
    this.groupFilterCtrl.setValue('');
    
    
  }

}
