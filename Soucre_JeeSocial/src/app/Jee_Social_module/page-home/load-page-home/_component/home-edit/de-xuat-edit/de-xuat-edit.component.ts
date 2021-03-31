import { ImageModel } from './../../../../_model/Img.model';
import { PageHomeService } from './../../../../_services/page-home.service';

import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'kt-de-xuat-edit',
  templateUrl: './de-xuat-edit.component.html',
  styleUrls: ['./de-xuat-edit.component.scss']
})
export class DeXuatEditComponent implements OnInit {
  image: any;
  base64Image: string;
  nameimg:any;
  dexuat: any = {};
  item:any[]=[];
  id_user:number;
	viewLoading:boolean=false;
  constructor(
    public dialogRef: MatDialogRef<DeXuatEditComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
    private _service:PageHomeService,
    // private tokenStore:TokenStorage,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  CloseDia(data = undefined)
{
    this.dialogRef.close(data);
}
onSubmit() {
 // debugger
 this.insert_file();
 setTimeout(() => {
  this._service.updateSocial(this.dexuat,this._service.rt_update_baidang).subscribe(res => {
    if (res && res.status == 1) {
      this.CloseDia(res.data);
    }
  });
 }, 500);
 
 
  this.changeDetectorRefs.detectChanges();

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
        
    
    return item;
  }
  insert_file()
  {
    let hinh=this.Item_hinh();
 
    
     this._service.UpdateWithFile(this.dexuat.Id_BaiDang,hinh,this._service.rt_update_file_image).subscribe((res) => {
      

    });
    this.changeDetectorRefs.detectChanges();
  }
getCurrentUser() 
{
  this._service.getUserData().subscribe(res =>{
   
      this.item= res;
      this.id_user=res.Id;
 

  });
}

  ngOnInit() {
    this.getCurrentUser();
    this.dexuat = this.data;
    this.changeDetectorRefs.detectChanges();
    
  }


}
