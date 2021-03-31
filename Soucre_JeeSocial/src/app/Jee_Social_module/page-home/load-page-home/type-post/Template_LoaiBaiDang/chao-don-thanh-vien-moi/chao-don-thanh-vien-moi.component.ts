import { GroupService } from './../../../../_services/group.service';
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
import { TypePostComponent } from '../../type-post.component';
import { trim } from 'lodash';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';
@Component({
  selector: 'kt-chao-don-thanh-vien-moi',
  templateUrl: './chao-don-thanh-vien-moi.component.html',
  styleUrls: ['./chao-don-thanh-vien-moi.component.scss']
})
export class ChaoDonThanhVienMoiComponent implements OnInit {
  tam:string
  removable = true;
  selectedTab: number = 0;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;
  congkhai='Công Khai';
  selectable = true;
  data_user:any;
  item_user=[];
  user_tam: any[] = [];
  listUser:Observable<any[]>;
  userCtrl=new FormControl();

  
id_group = new FormControl('');

public groupFilterCtrl: FormControl = new FormControl();


   item:any[]=[];
  lastUpdated: string;
  Time:Date;
  id_loaibaidang:number;
  htmlContent:string='';
  id:number;
  id_user:number;
  tieude:string="";

  noidung:string='';
  // title_user = new FormControl('');
  title_user:string;
  title:string;
  list_group:any[]=[];
  selectedd:number;
  
  // editor = ClassicEditor;

	
  @ViewChild('userInput', {static: false}) userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  constructor(
    private dialogRef:MatDialogRef<ChaoDonThanhVienMoiComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
    // private _authservice:AuthService,
    private _services:PageHomeService,
    // private  sharedService: SharedService,
    private layoutUtilsService: LayoutUtilsService,
    private dialogRef_all:MatDialogRef<TypePostComponent>,
    // private tokenStore:TokenStorage,
  private _service_gr:GroupService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }


  
  
  
  // test(){
  // 	this.datainput.push({ data:""});
  // 	console.log('Data',this.datainput)
  // }
  
  // Bắt đầu phần comment
  
  
  
private _normalizeValue(value: string): string {
  return value.toLowerCase().replace(/\s/g, '');
}

private _filterStates(value: string): any[] {
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

    console.log('user_tam:',this.user_tam);

  this.userInput.nativeElement.value = '';
  this.userCtrl.setValue(null);
 
 
  
  }
}


ItemBaiDang(): BaiDangModel {
  //  debugger


  //const controls = this.itemForm.controls;
  
  const item = new BaiDangModel();
  
    // Users: Array<BaiDangUser> = [];	// user.ID_User = this.item.ID_User;

    // var plainText = this.dulieu.value.replace(/<[^>]*>/g," ");
      // let myDate=new Date(this.lastUpdated);
      // let dateString =this.lastUpdated;
      //   let myDate=new Date('');
         
     
        item.id_loaibaidang=this.id_loaibaidang;
        for(let i=0;i<this.user_tam.length;i++){
         
          
          this.tieude=this.tieude+" "+this.user_tam[i].hoten+",";
      
            this.title=trim(this.tieude,",");
          


        }
        item.title=this.title;
        item.NoiDung=this.noidung;
        item.typepost='';
        // item.CreatedDate=myDate;
      //  item.CreatedBy=this.id_user;
        item.Id_Group=this.id_group.value;
       // item.UpdateDate=null;
       // item.UpdateBy=null
      
  this.changeDetectorRefs.detectChanges();
  return item;
}

AddBaiDang(item: BaiDangModel, withBack: boolean) {
  // this.loadingAfterSubmit = true;
  // debuggere
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



// getDataArray(){
//   this.tieude=this.user_tam[0].hoten;

// }
LoadData_current_user() {
  // debugger
  // this.tokenStore.getUserData().subscribe(res =>{
  //   this.item= res;
  //   this.id_user=res.ID_user;
  // });
}
LoadListGroup(){
  this._service_gr.Get_Social(this._service_gr.rt_getlist_group).subscribe(res =>{
        this.list_group=res.data;
  })
}

getDataShare(){
  this._service_gr.id_group$.subscribe(res=>{
    this.selectedd=Number(res);
  })
}
 

  ngOnInit() {
    this.id_loaibaidang=this.data.id_loaibaidang;
    this.getDataShare();
    this.groupFilterCtrl.setValue('');
    // this.getDataArray();
    this.LoadData_current_user();
  
    this.LoadListGroup();
  
    this._services.getAllNhanvien().subscribe((res=>{
    //  debugger
      this.data_user=res.data;
   
      this.listUser= this.userCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.data_user.slice())
      
      );
    this.changeDetectorRefs.detectChanges();
   

  
      }))

  }

  closeDilog()
  {
    this.dialogRef.close();
  }
}
