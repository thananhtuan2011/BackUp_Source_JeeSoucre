import { AuthService } from './../../../../modules/auth/_services/auth.service';
import { TrangCaNhanService } from '../../_services/trang-ca-nhan.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ImageModel } from '../../_model/Img.model';

@Component({
  selector: 'kt-update-avtar',
  templateUrl: './update-avtar.component.html',
  styleUrls: ['./update-avtar.component.scss']
})
export class UpdateAvtarComponent implements OnInit {
  listTT_user:any[] = [];
  id_user:number;
  image: any;
base64Image: string;
nameimg:any;
  constructor(
    private auth:AuthService,
    
private _service_:TrangCaNhanService,
    public dialogRef: MatDialogRef<UpdateAvtarComponent>,
    private changeDetectorRefs: ChangeDetectorRef,) { }

    GetCurrentUser() {
      // debugger
      this._service_.getUserData().subscribe(res =>{
      //   this.item= res;
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


      Close_Dialog()

      {
            this.dialogRef.close();
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
          
            // base64Str = event.target["result"]
              // // var metaIdx = base64Str.indexOf(';base64,');
              // base64Str = base64Str.substr(metaIdx + 8); // Cắt meta data khỏi chuỗi base64
      
              // //this.FileAttachStrBase64 = base64Str;
          
              // 	this.AttachFileComment.push({ filename: filesAmount.name, strBase64: base64Str });
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
             this._service_.postAvatar(hinh,this._service_.rt_API_TrangCaNhan).subscribe((res) => {
              this.changeDetectorRefs.detectChanges();
            });
            this.Close_Dialog();
              setTimeout(() => {
                window.location.reload();
              }, 500);
           
          }
    
    
         


  ngOnInit() {

    this.GetCurrentUser();
    this.loadTTuser();
  }

}
