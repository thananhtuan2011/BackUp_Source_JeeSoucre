import { BaiDangModel } from './../../../../_model/BaiDang.model';
import { PageHomeService } from './../../../../_services/page-home.service';
import { LayoutUtilsService, MessageType } from './../../../../../../_metronic/core/utils/layout-utils.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';

import { DatePipe } from '@angular/common';
import * as moment from 'moment'; 
import { FormControl } from '@angular/forms';
 import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'kt-baidang-edit',
  templateUrl: './baidang-edit.component.html',
  styleUrls: ['./baidang-edit.component.scss']
})
export class BaidangEditComponent implements OnInit {
 item=[];
 item_tmp:any;
 tieude:string;
  id_:number;
 dulieu:any;
 editor = ClassicEditor;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef:MatDialogRef<BaidangEditComponent>,
    public _services:PageHomeService ,
    private changeDetectorRefs: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
    ){ }


    CloseDia(data=undefined)
    {
      this.dialogRef.close(data);
    }
    Item_baidang(): BaiDangModel {
   
    
      const item = new BaiDangModel();
      var plainText = this.dulieu.value.replace(/<[^>]*>/g," ");
      item.Id_BaiDang=this.id_;
      item.title= this.tieude;
      item.NoiDung= plainText;
   
      this.changeDetectorRefs.detectChanges();
      return item;
    }
    Update_servicesBaidang(item:BaiDangModel,withBack:boolean){

      this._services.updateSocial(item,this._services.rt_update_baidang).subscribe(res=>{
        if (res && res.status === 1) {
          this.CloseDia(res.data);
          // this.dulieu_cmt.setValue("");
          // this.loadDataList();
        
           //  this.dataSource.loadListBaiDang();
          
           
          //  alert('Update Thành Công !');
             }
             else {
               this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
             }
      })
  }
  submit(){
    let it_cbd=this.Item_baidang();
    this.Update_servicesBaidang(it_cbd,false);
    

  }
    

  ngOnInit() {
  
     this.item.push(this.data._item)
  
     this.tieude=this.item[0].title;
  
      this.dulieu= new FormControl(this.item[0].NoiDung);
    this.id_=this.item[0].Id_BaiDang;
     
  }
  
  // ttconfig: AngularEditorConfig = {
  
  //   editable: true,
  //   spellcheck: true,
  //   height: '15rem',
  //   minHeight: '5rem',
  //   placeholder: 'Nhập Nội Dung...',
  //   translate: 'no',
   
 
  //   defaultParagraphSeparator: 'p',
  //   defaultFontName: 'Arial',
  
  //   toolbarHiddenButtons: [
  //     ['bold']
  //     ],
  //   customClasses: [
  //     {
  //       name: "quote",
  //       class: "quote",
  //     },
  //     {
  //       name: 'redText',
  //       class: 'redText'
  //     },
  //     {
  //       name: "titleText",
  //       class: "titleText",
  //       tag: "h1",
  //     },
  //   ]
  // };


}
