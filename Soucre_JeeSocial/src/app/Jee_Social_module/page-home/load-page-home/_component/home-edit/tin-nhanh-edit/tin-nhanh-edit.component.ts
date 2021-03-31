import { ImageModel } from './../../../../_model/Img.model';
import { AuthService } from './../../../../../../modules/auth/_services/auth.service';
import { PageHomeService } from './../../../../_services/page-home.service';

import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'kt-tin-nhanh-edit',
  templateUrl: './tin-nhanh-edit.component.html',
  styleUrls: ['./tin-nhanh-edit.component.scss']
})
export class TinNhanhEditComponent implements OnInit {

  tinnhanh: any = {};
  item:any[]=[];
  base64Image: string;
  nameimg:any;
  image: any;
  id_user:number;
  viewLoading:boolean=false;
  listTT_user:any[]=[];
  
  constructor(
    public dialogRef: MatDialogRef<TinNhanhEditComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
    private _service:PageHomeService,
    private auth:AuthService,
    // private _service_file:UploadfileService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  closeDilog(data = undefined)
{
    this.dialogRef.close(data);
}

onSubmit() {
 // debugger
 this.insert_file();
      
 setTimeout(() => {
  this._service.updateSocial(this.tinnhanh,this._service.rt_update_baidang).subscribe(res => {
   
    if (res && res.status == 1) {
      
      this.closeDilog(res.data);
      
    }
  });
 }, 500);
 
 
  this.changeDetectorRefs.detectChanges();
}
getCurrentUser() 
{
  this._service.getUserData().subscribe(res =>{
   
      this.item= res;
      this.id_user=res.Id;
 

  });
}

loadTTuser()
{
  this.auth.getProFileUsers_change().subscribe(res =>{	

    this.listTT_user=res.data;
    this.changeDetectorRefs.detectChanges();
  
  })
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
          // this.tinnhanh.image=item.name
         }
        
    
    this.changeDetectorRefs.detectChanges();
    return item;
  }
  insert_file()
  {


    let hinh=this.Item_hinh();
 
  
     this._service.UpdateWithFile(this.tinnhanh.Id_BaiDang,hinh,this._service.rt_update_file_image).subscribe((res) => {
      

    });
    this.changeDetectorRefs.detectChanges();
  }
  ngOnInit() {
    this.getCurrentUser();
    this.loadTTuser();
    this.tinnhanh = this.data;
    console.log('data tin nhanh',this.tinnhanh);
    this.changeDetectorRefs.detectChanges();
    
  }


}
