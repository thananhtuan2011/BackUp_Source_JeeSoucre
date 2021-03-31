import { AuthService } from './../../../../../../modules/auth/_services/auth.service';
import { PageHomeService } from './../../../../_services/page-home.service';
import { BaiDangModel } from './../../../../_model/BaiDang.model';
import { LayoutUtilsService, MessageType } from './../../../../../../_metronic/core/utils/layout-utils.service';
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocomplete, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { trim } from 'lodash';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';
@Component({
  selector: 'kt-chao-don-thanhvien-edit',
  templateUrl: './chao-don-thanhvien-edit.component.html',
  styleUrls: ['./chao-don-thanhvien-edit.component.scss']
})
export class ChaoDonThanhvienEditComponent implements OnInit {

  removable = true;
  selectedTab: number = 0;
  separatorKeysCodes: number[] = [ENTER, COMMA];
	visible = true;
  selectable = true;
  chaodonthanhvien: any = {};
  data_user:any;
id_user:number;
id_baidang:number;
item:any[]=[];
  userCtrl=new FormControl();
  listUser:Observable<any[]>;
  viewLoading:boolean=false;
  tieude:string="";
  noidung:string;
  user_tam: any[] = [
    
    
  ];
 

  // title_user = new FormControl('');
  title_user:string;
  title:string;
  @ViewChild('userInput', {static: false}) userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  constructor(
    public dialogRef: MatDialogRef<ChaoDonThanhvienEditComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
    // private _service_cmt:CommentService,
    private _service:PageHomeService,
    private _authservice:AuthService,
    private layoutUtilsService: LayoutUtilsService,
    // private tokenStore:TokenStorage,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  closeDia(data = undefined)
{
    this.dialogRef.close(data);
}

close()
{
  this.dialogRef.close();
}

ItemBaiDang(): BaiDangModel {
  //  debugger


  //const controls = this.itemForm.controls;
  
  const item = new BaiDangModel();
  
    
        for(let i=0;i<this.user_tam.length;i++){
         
          
          this.tieude=this.tieude+" "+this.user_tam[i].hoten+",";
      
            this.title=trim(this.tieude,",");
          


        }
       
        item.Id_BaiDang=this.id_baidang;
        item.title=this.title;
        item.NoiDung=this.noidung;
        item.typepost='';
        // item.CreatedDate=myDate;
        // item.CreatedBy=this.id_user;
        // item.i=null;
        // item.UpdateDate=this.id_user;;
        item.UpdateBy=this.id_user;
      
  this.changeDetectorRefs.detectChanges();
  return item;
}

AddBaiDang(item: BaiDangModel, withBack: boolean) {
  // this.loadingAfterSubmit = true;
  // debugger
  this._service.updateSocial(item,this._service.rt_update_baidang).subscribe(res => {
    if (res && res.status === 1) {
    
     this.closeDia(res.data);
    //  this.dataSource.loadListBaiDang();
   
      
    }
    else {
      this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
    }
  });
}




submit()
{
  
  let ItemBd=this.ItemBaiDang();
  this.AddBaiDang(ItemBd,false);

  // this.reload.loadDataList();
  // this._BaiDangViewComponent.change();
 
  this.changeDetectorRefs.detectChanges();

}
// onSubmit() {
//   debugger
//   // this._service.UpdateBaiDang(this.chaodonthanhvien).subscribe(res => {
//   //   if (res && res.status == 1) {
//   //     this.closeDia(res.data);
//   //   }
//   // });
// }
 
private _normalizeValue(value: string): string {
  return value.toLowerCase().replace(/\s/g, '');
}

private _filterStates(value: string): any[] {
  //debugger
  //	const filterValue = value.toLowerCase();
  const filterValue = this._normalizeValue(value);
  return this.data_user.filter(state => this._normalizeValue(state.hoten).includes(filterValue));
}



add(event: MatChipInputEvent): void {
  // Add fruit only when MatAutocomplete is not open
  // To make sure this does not conflict with OptionSelected Event
  if (!this.matAutocomplete.isOpen) {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.user_tam.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.userCtrl.setValue(null);
  }
}
// xóa dữ liệu trong mảng user_tam
remove(user: string): void {
  const index = this.user_tam.indexOf(user);

  if (index >= 0) {
    this.user_tam.splice(index, 1);
  }
}



selected(event: MatAutocompleteSelectedEvent): void {
             // debugger
    let obj = this.user_tam.find(x => x.hoten == event.option.viewValue);
    if(obj)
    {
        alert('Vui lòng chọn nhân viên khác !')
    }
    else{

    
  this.user_tam.push(
   
    {
      
      // ID_NV:this.id_nv.value,
				hoten:event.option.viewValue,
    })

    console.log('user_tam_edit:',this.user_tam);

  this.userInput.nativeElement.value = '';
  this.userCtrl.setValue(null);
 
 
  
  }
}
LoadData_current_user() {
  // debugger
  this._service.getUserData().subscribe(res =>{
    this.item= res;
    this.id_user=res.ID_user;
  });
}
 
  ngOnInit() {
    
    this.LoadData_current_user();
    //  this.user_tam.push(this.chaodonthanhvien.title.value);
    //console.log('Chao don thanh vien:',this.chaodonthanhvien),
    this.chaodonthanhvien = this.data;
    this.id_baidang=this.chaodonthanhvien._item.Id_BaiDang;
    this.title_user=this.chaodonthanhvien._item.title;
    this.noidung=this.chaodonthanhvien._item.NoiDung;

      
  this.user_tam.push(
   
    {
      
     
				hoten:this.title_user,
    })

    this.changeDetectorRefs.detectChanges();


    this._authservice.getAllNhanvien().subscribe((res=>{
      
        this.data_user=res.data;
     
        this.listUser= this.userCtrl.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this._filterStates(state) : this.data_user.slice())
        
        );
      this.changeDetectorRefs.detectChanges();
     
  
    
        }))
  
    
  }


}
