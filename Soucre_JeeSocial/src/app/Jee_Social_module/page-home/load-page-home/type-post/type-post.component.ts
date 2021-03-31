import { AuthService } from './../../../../modules/auth/_services/auth.service';

import { ChaoDonThanhVienMoiComponent } from './Template_LoaiBaiDang/chao-don-thanh-vien-moi/chao-don-thanh-vien-moi.component';
import { TinTucNoiBoComponent } from './Template_LoaiBaiDang/tin-tuc-noi-bo/tin-tuc-noi-bo.component';
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { KhenThuongComponent } from './Template_LoaiBaiDang/khen-thuong/khen-thuong.component';
import { DeXuatComponent } from './Template_LoaiBaiDang/de-xuat/de-xuat.component';
import { TinNhanhComponent } from './Template_LoaiBaiDang/tin-nhanh/tin-nhanh.component';
import { ThongBaoComponent } from './Template_LoaiBaiDang/thong-bao/thong-bao.component';

@Component({
  selector: 'kt-type-post',
  templateUrl: './type-post.component.html',
  styleUrls: ['./type-post.component.scss'],

})
export class TypePostComponent implements OnInit {
  selected:any;
  listLoaiBai:any[]=[];
  listLoaiBai_Tam:any[]=[];
  Id_baidang:number;
  filtered :any;
id:any;
  constructor(	
  

     private authService:AuthService,
    // private tokenSotre:TokenStorage,
    private dialog:MatDialog,
    public dialogRef: MatDialogRef<TypePostComponent>,
    // private  sharedService: SharedService,
     private changeDetectorRefs: ChangeDetectorRef,
    // public _services:BaiDangService ,
    // private dataSource:BaiDangDataSource,
   
    // @Inject(MAT_DIALOG_DATA)
    //  public data: DialogData,
  

    
    ) { 
    
    }

    LoadData() {
      // this.layIdUser()
      this.authService.getPhanLoaiBaiDang().subscribe(res=>{
        this.listLoaiBai = res.data;
        this.changeDetectorRefs.detectChanges();
        // console.log(res.data);

      })
     }

     
  //  binData()
  //  {
  //    this.sharedService.setData(this.txtemail);
  //    this.sharedService.setDataPass(this.txtpass)
  //  }
     Template_LoaiBaiDang(id_loaibaidang:number)
     {

      //  this.dialogRef.close();
      
      //  debugger
     //  this.sharedService.setId_LoaiBaiDAng(id_loaibaidang);
      // let obj = this.listLoaiBai.find(x => x.Id_LoaiDang ==id_loaibaidang);
      //this.deleteHT1(obj);
      if(id_loaibaidang===1)
      {
        const dialogRef = this.dialog.open(TinTucNoiBoComponent, {
          width: '550px',
          height:'510px',
          position: {
            
          },
          data: {id_loaibaidang}
        }).afterClosed().subscribe(result => {
         
            if(!result)
            {
              // this._BaiDangViewComponent.change();
           this.changeDetectorRefs.detectChanges();
            }
            else
      
            {
              // this._BaiDangViewComponent.change();
              this.changeDetectorRefs.detectChanges();
            }
          
        
    
        
        });
       
      }
      else if(id_loaibaidang===2){
        const dialogRef = this.dialog.open(KhenThuongComponent, {
          width: '650px',
          height:'500px',
          data: {id_loaibaidang}
        });
      }
      else if(id_loaibaidang===3){
        const dialogRef = this.dialog.open(ThongBaoComponent, {
          width: '550px',
          data: {id_loaibaidang}
        });
      }
      else if(id_loaibaidang===4){
        const dialogRef = this.dialog.open(ChaoDonThanhVienMoiComponent, {
          width: '550px',
          height:'500px',
          data: {id_loaibaidang}
        });
      }
      else if(id_loaibaidang===7){
    
        const dialogRef = this.dialog.open(DeXuatComponent, {
          width: '550px',
          height:'500px',
          data: {id_loaibaidang}
        });

      }
      else
      {
        const dialogRef = this.dialog.open(TinNhanhComponent, {
          width: '550px',
          data: {id_loaibaidang}
        });
      }
     }
  ngOnInit() {
    this.LoadData();
  
  }
 

}
