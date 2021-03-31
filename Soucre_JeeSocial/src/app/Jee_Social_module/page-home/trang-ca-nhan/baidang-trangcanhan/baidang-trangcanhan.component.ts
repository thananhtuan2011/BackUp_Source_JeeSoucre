import { QueryParamsModelNewLazy } from './../../../../_metronic/shared/crud-table/models/table.model';
import { AuthService } from './../../../../modules/auth/_services/auth.service';
import { LayoutUtilsService, MessageType } from './../../../../_metronic/core/utils/layout-utils.service';
import { PageHomeService } from './../../_services/page-home.service';


import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { PopoverContentComponent } from 'ngx-smart-popover';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { concatMap, delay, first } from 'rxjs/operators';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TrangCaNhanService } from '../../_services/trang-ca-nhan.service';
import { CommentService } from '../../_services/comment.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TypePostComponent } from '../../load-page-home/type-post/type-post.component';
import { CommentModel } from '../../_model/comment.model';
import { ImageModel } from '../../_model/Img.model';
import { CommentEditDialogComponent } from '../../load-page-home/_component/comment-edit-dialog/comment-edit-dialog.component';
import { BaiDangModel } from '../../_model/BaiDang.model';
import { BaidangEditComponent } from '../../load-page-home/_component/home-edit/baidang-edit/baidang-edit.component';
import { TinNhanhEditComponent } from '../../load-page-home/_component/home-edit/tin-nhanh-edit/tin-nhanh-edit.component';
import { DeXuatEditComponent } from '../../load-page-home/_component/home-edit/de-xuat-edit/de-xuat-edit.component';
import { ChaoDonThanhvienEditComponent } from '../../load-page-home/_component/home-edit/chao-don-thanhvien-edit/chao-don-thanhvien-edit.component';
import { KhenThuongEditComponent } from '../../load-page-home/_component/home-edit/khen-thuong-edit/khen-thuong-edit.component';
import { ThongBaoModel } from '../../_model/ThongBao.model';




@Component({
  selector: 'kt-baidang-trangcanhan',
  templateUrl: './baidang-trangcanhan.component.html',
  styleUrls: ['./baidang-trangcanhan.component.scss']
})
export class BaidangTrangcanhanComponent implements OnInit {

  item_11:any[]=[];
  data: any[] = [];
 
 
//  data: any[] = [];
  filter: any = {};
  cmt:any[]=[];
  // dataSource: BaiDangDataSource;
  @ViewChild("keyword", { static: true }) keyword: ElementRef;
  
	// listResult = new Subject();
	example: string = `<div>this is another div <br/> Đây là inser</div>`
	// Public properties
	ItemData: any = {};
	nameimg:any;
	FormControls: FormGroup;
	hasFormErrors: boolean = false;
	disBtnSubmit: boolean = false;
	loadingSubject = new BehaviorSubject<boolean>(true);
	loading$: Observable<boolean>;
	viewLoading: boolean = false;
	isChange: boolean = false;
	isZoomSize: boolean = false;
	LstDanhMucKhac: any[] = [];
	public datatreeDonVi: BehaviorSubject<any[]> = new BehaviorSubject([]);
	private componentSubscriptions: Subscription;

	ListDonViCon: any[] = [];
	ListVanBan: any[] = [];
	datasource: any;

	ListAttachFile: any[] = [];
	ListYKien: any[] = [];
	AcceptInterval: boolean = true;
	NguoiNhan: string = '';
	//NguoiNhans:any[]=[{FullName:'người 1'},{FullName:'người 2'}];

	Comment: string = '';
	AttachFileComment: any[] = [];
	fileControl: FormControl;
	setting: any = {
		ACCEPT_DINHKEM: '',
		MAX_SIZE: 0
  };
  listTrangCaNhan:any[]=[];
	files: any = {};
	//reload: boolean = true;
	UserData: any = {};
	emotions: any = {};
	accounts: any = {};
	icons: any[] = [];
	id_user:number;
	list_icon: any[] = [];
	public anchors;
	//tag username
	@ViewChild('myPopoverC', { static: true }) myPopover: PopoverContentComponent;
	selected: any[] = [];
	listUser: any[] = [];
	options: any = {};
	@ViewChild('matInput', { static: true }) matInput: ElementRef;
	@ViewChild('hiddenText', { static: true }) textEl: ElementRef;
	CommentTemp: string = '';
	indexxxxx: number = -1;
	@ViewChild('myPopoverB', { static: true }) myPopoverU: PopoverContentComponent;
  it: any = {};
  tt:boolean=true;
  isShow=true;
  isShowForm=false;
  id_baidang_cmt:number;
  filesAmount: File = null;
  id_bd_cmt:number;
	item:any;
  dulieu_cmt = new FormControl('');
  edit_dulieu_cmt=new FormControl('');
  base64Image: string;
  listDataEdit:any[]=[];
  list_baidang:any[]=[];
  image: any;
	ListMedia:any[]=[];
  dulieu_cmt_child:string=''
  @Input() ID_QuyTrinh: any;
  listKhenThuong:any[] = [];

  listTT_user:any[] = [];
  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    
    public _services_canhan: TrangCaNhanService,
     public _services: PageHomeService,
    private _service_cmt:CommentService,
    private sanitized: DomSanitizer,
	public dialog: MatDialog,
	// private tokenStore:TokenStorage,
	private layoutUtilsService: LayoutUtilsService,
	private translate: TranslateService,
	// private _service_thongbao:ThongbaoService,
	// private _service_file:UploadfileService,
	private auth:AuthService,

	private http: HttpClient
  ) { }



// height: number = 300;
// onScroll($event) {
// 	let _scroll = 300;
// 	let _height = _scroll + $event.currentTarget.scrollTop;
// 	this.height = _height;
// }


//  @HostListener('window:scroll', ['$event']) 
 






	


	filterConfiguration(): any {
		return this.filter;
  }

 
          
        //	Popup thêm mới, chỉnh sửa
        addLeave() {
          // const leavePersonalModel = new LeavePersonalCBCCModel();
          // leavePersonalModel.clear(); // Set all defaults fields
          // this.EditLeave(leavePersonalModel);
          const dialogRef = this.dialog.open(TypePostComponent,{
            data:{  },
			panelClass:'no-padding'
          });
          
          dialogRef.afterClosed().subscribe(res => {
            if (!res) {
			
              this.loadDataList();
           this.changeDetectorRefs.detectChanges();
            }
            else {
				
               this.loadDataList();
              this.changeDetectorRefs.detectChanges();
            }
          });
          
            
          
         
        }
       

	InsertMedia()
	{

	}

    LoadData() {
      // debugger
      this._services.getUserData().subscribe(res =>{
        this.item_11= res;
      });
    }
//   Thêm comment trong bài đăng


  layIDBaiDang(id_baidang_cmt:number){
	 
		this.id_bd_cmt=id_baidang_cmt;
	console.log('id_baidangcmt',id_baidang_cmt);

  }
Item_cmt(): CommentModel {
	//debugger
	const item = new CommentModel();

			item.ID_BaiDang=this.id_bd_cmt;
			item.NoiDung_cmt=this.dulieu_cmt.value;
		
			item.typepost=1;
			// item.CreatedDate
		
	
	this.changeDetectorRefs.detectChanges();
	return item;
}




// Bắt đầu phần comment
AddComment(item:CommentModel,withBack:boolean,id_baidang:number){
	this._service_cmt.Insert(item,this._service_cmt.rt_insert_cmt).subscribe(res=>{
		if (res && res.status === 1) {
			this.dulieu_cmt.setValue("");
			console.log(res.data);
			let index_tam=this.list_baidang.findIndex(x=>x.Id_baidang_canhan===id_baidang)
			let index=this.list_baidang[index_tam].DataBaiDang.findIndex(x=>x.Id_BaiDang===id_baidang)
		
			// this.loadDataList();
			this.list_baidang[index_tam].DataBaiDang[index].Coment.push(res.data[0]);
	
			// this.dialogRef.close();
		   //  this.dataSource.loadListBaiDang();
			
				 }
				 else {
					this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 999999999, true, false, 3000, 'top', );
				 }
				 this.changeDetectorRefs.detectChanges();
	})
	
}
Item_hinh_cmt(): ImageModel {
     
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
	  
	  
		



			CommentInsert(id:number)
			{

				let it_cmt=this.Item_cmt();
				this.AddComment(it_cmt,false,id);
				if(this.nameimg!=null ||this.nameimg!=" ")
				{
				}
			}


			Item_cmt_child(id_cmt:number): CommentModel {
				
				const item = new CommentModel();
			
						
						item.NoiDung_cmt=this.dulieu_cmt_child;
						item.id_cmt_parent=id_cmt;
						item.typepost=1;
						// item.CreatedDate
					
				
				this.changeDetectorRefs.detectChanges();
				return item;
			}
			
			
			
AddComment_Child(item:CommentModel,withBack:boolean){

	this._service_cmt.Insert(item,this._service_cmt.rt_insert_cmt_child).subscribe(res=>{
		if (res && res.status === 1) {
			this.dulieu_cmt.setValue("");

			let vitribd;
			let vitricmt;
			let vitricmt_child;
		//	let index_tam=this.list_baidang.findIndex(x=>x.Id_BaiDang===id_baidang)
			for(let i=0;i<this.list_baidang.length;i++)
			{
				
			
				for(let j=0;j<this.list_baidang[i].DataBaiDang.length;j++)
				{
					
						let index=this.list_baidang[i].DataBaiDang[j].Coment.findIndex(x=>x.id_cmt===item.id_cmt_parent);
						if(index>=0)
						{
							vitribd=j;
							vitricmt=index;
							this.list_baidang[i].DataBaiDang[vitribd].Coment[vitricmt].Comment_child.push(res.data[0]);
						
							this.changeDetectorRefs.detectChanges();
						}
						

					
					}

				}
				}
			
	})
}


			CommentInsert_chill(ID_:number)
			{		
				let it_cmt=this.Item_cmt_child(ID_);
				this.AddComment_Child(it_cmt,false);
				this.dulieu_cmt_child='';
				
				//this.ThongBaotInsert();
				// this.loadDataList();
			}



			// delete_like_cmt(id_cmt:number){
			// 	this._service_cmt.Delete_Like_Comnent(id_cmt).subscribe(res => {
			// 		this.changeDetectorRefs.detectChanges();
			// 	})
			// }

		// xóa cmt
			deleteComment(id:number)
			{
				
					//this.delete_like_cmt(id);
					this.changeDetectorRefs.detectChanges();
				this._service_cmt.DeleteComnent(id,this._service_cmt.rt_delete_cmt).subscribe(res => {
					let vitribd;
					let vitricmt;
					let vitri;
				for(let i=0; i<this.list_baidang.length;i++)
				{

					for(let j=0;j<this.list_baidang[i].DataBaiDang.length;j++)
					{
						
							let index=this.list_baidang[i].DataBaiDang[j].Coment.findIndex(x=>x.id_cmt===id);
							if(index>=0)
							{
								vitri=i;
								vitribd=j;
								vitricmt=index;
								this.list_baidang[vitri].DataBaiDang[vitribd].Coment.splice(vitricmt,1);
							
								this.changeDetectorRefs.detectChanges();
							}
							
						
	
						
						}
					}
					this.changeDetectorRefs.detectChanges();
				})
				
			}
			// id_cmt:number,noidung:string, id_user:number
			// update comment
			Update_Comment(item,index,indexc=-1) {
				var data = Object.assign({}, item);
				// var data = Object.assign({}, item);
				const dialogRef = this.dialog.open(CommentEditDialogComponent, { data:data,
					
					width: '500px' });
				dialogRef.afterClosed().subscribe(res => {
					if (res) {
						item.comment = res.comment
						let vitri;
						let vitribd;
						let vitricmt;
				for(let i=0;i<this.list_baidang.length;i++) {


						for(let j=0;j<this.list_baidang[i].DataBaiDang.length;j++)
					{
						
							let index=this.list_baidang[i].DataBaiDang[j].Coment.findIndex(x=>x.id_cmt===item.id_cmt);
							if(index>=0)
							{
								vitri=i;
								vitribd=j;
								vitricmt=index;
								var tam = Object.assign({}, res[0]);
								this.list_baidang[vitri].DataBaiDang[vitribd].Coment.splice(vitricmt,1,tam);

							
								this.changeDetectorRefs.detectChanges();
							}
						}
							
						}
						this.changeDetectorRefs.detectChanges();
					}
					else
					{
						// this.loadDataList();
						this.changeDetectorRefs.detectChanges();
					}
				});
			}
			// xóa cmt trong bài đăng đó để xóa bài đăng

			deleteComment_child(id:number)
			{
				
				
					this.changeDetectorRefs.detectChanges();
					let vitri;
					let vitribd;
					let vitricmt;
				this._service_cmt.DeleteComnent(id,this._service_cmt.rt_delete_cmt).subscribe(res => {
			for(let k=0;k<this.list_baidang.length;k++){

					for(let j=0;j<this.list_baidang[k].DataBaiDang.length;j++)
					{
						for(let i = 0; i<this.list_baidang[k].DataBaiDang[j].Coment.length; i++)
						{
							
								
							let index=this.list_baidang[k].DataBaiDang[j].Coment[i].Comment_child.findIndex(x=>x.id_cmt===id);
							
							if(index>=0)
							{
								vitri=k;
								vitribd=j;
								vitricmt=i
								this.list_baidang[k].DataBaiDang[j].Coment[i].Comment_child.splice(index,1);
							}
						}
					}
	
						
						}
					
				})
				
			}
			Update_Comment_Child(item,index,indexc=-1) {
				var data = Object.assign({}, item);
				// var data = Object.assign({}, item);
				const dialogRef = this.dialog.open(CommentEditDialogComponent, { data:data,
					
					width: '500px' });
				dialogRef.afterClosed().subscribe(res => {
					if (res) {
						item.comment = res.comment
						let vitribd;
							let vitricmt;
							let vitri;
			for(let i=0; i<this.list_baidang.length;i++)
			{

						
						for(let j=0;j<this.list_baidang[i].DataBaiDang.length;j++)
					{
						

						let index_tam=this.list_baidang[i].DataBaiDang[j].Coment.findIndex(x=>x.id_cmt===res[0].id_cmt_parent);
						if(index_tam>=0)
						{
							vitribd=j;
							vitricmt=index_tam;
							vitri=i;
							this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Comment_child.splice(index,1,res[0]);
						
							this.changeDetectorRefs.detectChanges();
						}
					
						}
					}
						this.changeDetectorRefs.detectChanges();
					}
					else
					{
					
						this.changeDetectorRefs.detectChanges();
					}
				});
			}
			// xóa like trong cmt
		
		// delete_cmt_BaiDang(id_baidang:number)
		// {
		
		
		// 	this._services.Delete_cmt_Baidang(id_baidang).subscribe(res => {
			
		// 	})
		// 	this.changeDetectorRefs.detectChanges();
			

		
		// }

	
				like_cmt_child(id_cmt:number,type:number)
				{
					let vitri;
					let vitribd;
					let vitricmt;
					let vitricmt_child;
				this._service_cmt.like_cmt_child(id_cmt,type).subscribe(res =>{
				
					if (res) {
						for(let k=0;k<this.list_baidang.length;k++) 
					{		
						for(let j=0;j<this.list_baidang[k].DataBaiDang.length;j++)
						{
							for(let i = 0; i<this.list_baidang[k].DataBaiDang[j].Coment.length; i++)
							{
								
								let index=this.list_baidang[k].DataBaiDang[j].Coment[i].Comment_child.findIndex(x=>x.id_cmt===id_cmt);
								
								if(index>=0)
								{
									vitri=k;
									vitribd=j;
									vitricmt=i
									vitricmt_child=index;
									// this.list_baidang[j].Coment[i].Comment_child[vitricmt_child].push(res.data[0]);
									// this.changeDetectorRefs.detectChanges();
								
							
								}
								
							
							}
						}
					}
						// console.log('vitri bd',vitribd)
						// 		console.log('vitri cmt',vitricmt)
							
						// 		console.log('id cmt',id_cmt)
						if(this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_child===null)
						{
							this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_child=Object.assign(res.data[0].Like_child);
						}
						else
	
						{
						
						
							if(type===0)
							{
								//delete this.list_baidang[index].Like;
								this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_child=null;
							}
							else
	
							{
								delete this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_child;
								this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_child= Object.assign(res.data[0].Like_child);
							}
							
							
							
						}
						if(this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_Comment_child===null)
						{
							//this.list_baidang[index].Like_BaiDang.push(res.data[0].Like_BaiDang);
							this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_Comment_child=res.data[0].Like_Comment_child.slice();
						}
						else
	
						{
							// 		debuggerlet index_like=this.list_baidang[index].Like_BaiDang[0].findIndex(x=>x.ID_like===type);
	
							this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_Comment_child=null;
							if(res.data[0].Like_Comment_child.length>0)
							{
								// this.list_baidang[index].Like_BaiDang.push(res.data[0].Like_BaiDang[0]);
								this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_Comment_child=res.data[0].Like_Comment_child.slice();
							}
							else
	
							{
								this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Comment_child[vitricmt_child].Like_Comment_child=[];
							}
							
						}
					
						
						this.changeDetectorRefs.detectChanges();
					}
					else
					{
						
						this.changeDetectorRefs.detectChanges();
					}
				})
	
				}
		like_cmt(id_cmt:number,type:number)
		{
			let vitri;
			let vitribd;
			let vitricmt;
		this._service_cmt.like_cmt(id_cmt,type).subscribe(res =>{
		
			if (res) {
		for(let k=0;k<this.list_baidang.length;k++) 
			{

				
				for(let j=0;j<this.list_baidang[k].DataBaiDang.length;j++)
				{
					for(let i = 0; i<this.list_baidang[k].DataBaiDang[j].Coment.length; i++)
					{
						let index=this.list_baidang[k].DataBaiDang[j].Coment.findIndex(x=>x.id_cmt===id_cmt);
						if(index>=0)
						{
							vitri=k;
							vitribd=j;
							vitricmt=index;
						}
					
					}
				}
			}
				
				
				
				if(this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Like===null)
				{
					this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Like=Object.assign(res.data[0].Like);
				}
				else

				{
				
				
					if(type===0)
					{
						//delete this.list_baidang[index].Like;
						this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Like=null;
					}
					else

					{
						delete this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Like;
						this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Like= Object.assign(res.data[0].Like);
					}
					
					
					
				}
				if(this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Like_Comment===null)
				{
					//this.list_baidang[index].Like_BaiDang.push(res.data[0].Like_BaiDang);
					this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Like_Comment=res.data[0].Like_Comment.slice();
				}
				else

				{
					// 		debuggerlet index_like=this.list_baidang[index].Like_BaiDang[0].findIndex(x=>x.ID_like===type);

					this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Like_Comment=null;
					if(res.data[0].Like_Comment.length>0)
					{
						// this.list_baidang[index].Like_BaiDang.push(res.data[0].Like_BaiDang[0]);
						this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Like_Comment=res.data[0].Like_Comment.slice();
					}
					else

					{
						this.list_baidang[vitri].DataBaiDang[vitribd].Coment[vitricmt].Like_Comment=[];
					}
					
				}
				
			
				
				this.changeDetectorRefs.detectChanges();
			
			}
			else
			{
				
				this.changeDetectorRefs.detectChanges();
			}
		})
			
		}



	
		

creaFormDelete(id_baidang:number)
		{
			const _title = this.translate.instant('Xóa Bài Đăng');
			const _description = this.translate.instant('Bạn có muốn xóa không ?');
			const _waitDesciption = this.translate.instant('Dữ liệu đang được xóa');
			const _deleteMessage = this.translate.instant('Xóa thành công !');
	
			const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
			dialogRef.afterClosed().subscribe(res => {
				if (!res) {
					return;
		}
	
	

		
	
				this._services.DeleteBaidang(id_baidang,this._services.rt_deletebaidang).subscribe(res => {
					let index_tap=this.list_baidang.findIndex(x=>x.Id_baidang_canhan==id_baidang);
					let vi=this.list_baidang[index_tap].DataBaiDang.findIndex(x=>x.Id_BaiDang==id_baidang);
				this.list_baidang[index_tap].DataBaiDang.splice(vi, 1);
						
				this.changeDetectorRefs.detectChanges();
					if (res && res.status === 1) {
						this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete, 4000, true, false, 3000, 'top');
					}
					else {
						this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 9999999999, true, false, 3000, 'top' );
					}
				
					
				});
			});
		 }

	

		
		 
		 UpdateBaiDang_CKeditor(id_:number,index, indexc = -1) {
			 
			//debugger
			let index_tap=this.list_baidang.findIndex(x=>x.Id_baidang_canhan===id_);
			this.item=( this.list_baidang[index_tap].DataBaiDang.find(x => x.Id_BaiDang ==id_));
		
				
			 var _item = new BaiDangModel;
			let saveMessageTranslateParam = '';
			 _item = this.item;
			// saveMessageTranslateParam += _item. > 0 ? 'JeeHR.capnhatthanhcong' : 'JeeHR.themthanhcong';
			// const _saveMessage = this.translate.instant(saveMessageTranslateParam);
			// const _messageType = _item.id_row > 0 ? MessageType.Update : MessageType.Create;
			const dialogRef = this.dialog.open(BaidangEditComponent, {
				width: '550px',
				height:'510px',
				data: {_item} })
			
			dialogRef.afterClosed().subscribe(res => {
			
				if (res) {
				
					var tam=Object.assign(res[0]);
					// let vi=this.list_baidang.findIndex(x=>x.Id_BaiDang==item.Id_BaiDang);
					this.list_baidang[index_tap].DataBaiDang.splice(index, 1,tam);
					this.changeDetectorRefs.detectChanges();
					// this.layoutUtilsService.showActionNotification(_saveMessage, 4000, );
				}
				else
				{
					var tam=Object.assign(res[0]);
					// let vi=this.list_baidang.findIndex(x=>x.Id_BaiDang==item.Id_BaiDang);
					this.list_baidang[index_tap].DataBaiDang.splice(index, 1,tam);
					this.changeDetectorRefs.detectChanges();
				}
			});
		}
	
			// Update bài đăng tin nhanh

			Update_BAIDANG(item,index,indexc=-1) {
				//	debugger
					var data = Object.assign({}, item);
					// var data = Object.assign({}, item);
					const dialogRef = this.dialog.open(TinNhanhEditComponent, { data:data,
						
						width: '550px' });
					dialogRef.afterClosed().subscribe(res => {
						if (res) {
							item.tinnhanh = res.tinnhanh
							// this.loadDataList();
							var tam=Object.assign(res[0]);
							let index_tap=this.list_baidang.findIndex(x=>x.Id_baidang_canhan===item.Id_BaiDang);
						
								this.list_baidang[index_tap].DataBaiDang.splice(index, 1,tam);
								this.changeDetectorRefs.detectChanges();
							
						
							
						}
						else
						{
							var tam=Object.assign(res[0]);
							this.list_baidang.splice(index, 1,tam);
							this.changeDetectorRefs.detectChanges();
							
						}
					});
				}
				Update_BAIDANG_7(item,index,indexc=-1) {
					//debugger
					var data = Object.assign({}, item);
					// var data = Object.assign({}, item);
					const dialogRef = this.dialog.open(DeXuatEditComponent, { data:data,
						
						width: '550px',
							height:'500px', });
					dialogRef.afterClosed().subscribe(res => {
						if (res) {
							var tam=Object.assign(res[0]);
							let index_tap=this.list_baidang.findIndex(x=>x.Id_baidang_canhan===item.Id_BaiDang);
						
							this.list_baidang[index_tap].DataBaiDang.splice(index, 1,tam);
						this.changeDetectorRefs.detectChanges();
						
						}
						else
						{
							var tam=Object.assign(res[0]);
							let index_tap=this.list_baidang.findIndex(x=>x.Id_baidang_canhan===item.Id_BaiDang);
						
								this.list_baidang[index_tap].DataBaiDang.splice(index, 1,tam);
							this.changeDetectorRefs.detectChanges();
							
						}
					});
				}

	
			Update_BAIDANG_4(id_:number,index, indexc = -1) {
				//	debugger
				let index_tap=this.list_baidang.findIndex(x=>x.Id_baidang_canhan===id_);
				this.item=( this.list_baidang[index_tap].DataBaiDang.find(x => x.Id_BaiDang ==id_));
			
					
				var _item = new BaiDangModel;
			   let saveMessageTranslateParam = '';
				_item = this.item;
			  
			   const dialogRef = this.dialog.open(ChaoDonThanhvienEditComponent, {
				width: '500px',
				height:'500px',
				   data: {_item} })
			   
			   dialogRef.afterClosed().subscribe(res => {
   
				   if (res) {
					  
				
					
					var tam=Object.assign(res[0]);
					let index_tap=this.list_baidang.findIndex(x=>x.Id_baidang_canhan===id_);
						
					this.list_baidang[index_tap].DataBaiDang.splice(index, 1,tam);
					this.changeDetectorRefs.detectChanges();
					  
				   }
				   else
				   {
				
					var tam=Object.assign(res[0]);
					let index_tap=this.list_baidang.findIndex(x=>x.Id_baidang_canhan===id_);
						
					this.list_baidang[index_tap].DataBaiDang.splice(index, 1,tam);
					
				   }
			   });
			}

		
			UpdateBaiDang_2(id_:number,index,indexc=-1) {
		 
			
				let index_tap=this.list_baidang.findIndex(x=>x.Id_baidang_canhan===id_);
				this.item=( this.list_baidang[index_tap].DataBaiDang.find(x => x.Id_BaiDang ==id_));
					
				 var _item = new BaiDangModel;
				let saveMessageTranslateParam = '';
				 _item = this.item;
				// saveMessageTranslateParam += _item. > 0 ? 'JeeHR.capnhatthanhcong' : 'JeeHR.themthanhcong';
				// const _saveMessage = this.translate.instant(saveMessageTranslateParam);
				// const _messageType = _item.id_row > 0 ? MessageType.Update : MessageType.Create;
				const dialogRef = this.dialog.open(KhenThuongEditComponent, {
					width: '650px',
						height:'500px',
					data: {_item} })
				
				dialogRef.afterClosed().subscribe(res => {
					if (res) {
					
						var tam=Object.assign(res[0]);
						let index_tap=this.list_baidang.findIndex(x=>x.Id_baidang_canhan===id_);
						
					this.list_baidang[index_tap].DataBaiDang.splice(index, 1,tam);
						this.changeDetectorRefs.detectChanges();
					}
					else
					{
						var tam=Object.assign(res);
						let index_tap=this.list_baidang.findIndex(x=>x.Id_baidang_canhan===id_);
						
					this.list_baidang[index_tap].DataBaiDang.splice(index, 1,tam);
						this.changeDetectorRefs.detectChanges();
					}
				});
			}

			
				 
				  
				 

		like(id:number,type:number) {
			//debugger
			let index_tap=this.list_baidang.findIndex(x=>x.Id_baidang_canhan===id);
			this._services.like(id,type,this._services.rt_like_baidang).subscribe(res => {
				if (res && res.status == 1) {
					
					let index=this.list_baidang[index_tap].DataBaiDang.findIndex(x=>x.Id_BaiDang===id);
					
					if(this.list_baidang[index_tap].DataBaiDang[index].Like===null)
					{
						this.list_baidang[index_tap].DataBaiDang[index].Like=Object.assign(res.data[0].Like);
					}
					else

					{
					
					
						if(type===0)
						{
							//delete this.list_baidang[index].Like;
							this.list_baidang[index_tap].DataBaiDang[index].Like=null;
						}
						else

						{
							delete this.list_baidang[index_tap].DataBaiDang[index].Like;
							this.list_baidang[index_tap].DataBaiDang[index].Like = Object.assign(res.data[0].Like);
						}
						
						this.list_baidang[index_tap].DataBaiDang[index].Like_BaiDang
					
					}
					if(this.list_baidang[index_tap].DataBaiDang[index].Like_BaiDang===null)
					{
						//this.list_baidang[index].Like_BaiDang.push(res.data[0].Like_BaiDang);
						this.list_baidang[index_tap].DataBaiDang[index].Like_BaiDang=res.data[0].Like_BaiDang.slice();
					}
					else

					{
						// 		debuggerlet index_like=this.list_baidang[index].Like_BaiDang[0].findIndex(x=>x.ID_like===type);

						this.list_baidang[index_tap].DataBaiDang[index].Like_BaiDang=null;
						if(res.data[0].Like_BaiDang.length>0)
						{
							// this.list_baidang[index].Like_BaiDang.push(res.data[0].Like_BaiDang[0]);
							this.list_baidang[index_tap].DataBaiDang[index].Like_BaiDang=res.data[0].Like_BaiDang.slice();
						}
						else

						{
							this.list_baidang[index_tap].DataBaiDang[index].Like_BaiDang=[];
						}
						
					}
					
					this.changeDetectorRefs.detectChanges();
				}
			})
					this.changeDetectorRefs.detectChanges();
				}
		
		

		

//   lấy list like (haha, love.....)

		GetListLike()
		{
			this._services.getlist_like().subscribe(res => {
				this.list_icon=res.data;
				this.changeDetectorRefs.detectChanges();

			})
		}


	//	_services_canhan.getBaiDangTrangCaNhan

// load  dữ liệu bài đăng (cmt,like) bằng datasource để realtime
pageSize:number;
  loadDataList() {

	const queryParams1 = new QueryParamsModelNewLazy(
	
		'',
		'',
		'',
		this.pageSize=0,
		2,
		false,
	
		// pageNumber: number;
		// pageSize: number;
		// more: boolean;
		
	);
this._services_canhan.getBaiDangTrangCaNhan(queryParams1,this._services_canhan.rt_API_TrangCaNhan).subscribe((res) => {
	
			this.data= res.data;
			console.log('Page',this.pageSize);
			this.list_baidang=this.data.slice();
	console.log('Dữ liệu bài đăng trang ca nhan',this.list_baidang);
	
			
		     this.changeDetectorRefs.detectChanges();
	})
  }

  loadDataListLayzy(page:number) {

	const queryParams1 = new QueryParamsModelNewLazy(
	
		'',
		'',
		'',
		page,
		2,
		false,
	
		// pageNumber: number;
		// pageSize: number;
		// more: boolean;
		
	);
	this._services_canhan.getBaiDangTrangCaNhan(queryParams1,this._services_canhan.rt_API_TrangCaNhan).subscribe((res) => {
			//this.data.push(res.data);
			if(res.data!=null){
				for(let i = 0; i < res.data.length; i++)
				{

				this.list_baidang.push(res.data[i]);
				 this.changeDetectorRefs.detectChanges();
				}
			}
			else

			{
				
					return;
			}
			
	})
  }
 
  
GetCurrentUser() {
	// debugger
	this._services.getUserData().subscribe(res =>{
	//   this.item= res;
	  this.id_user=res.Id;
	});
   
  }
  // bài đăng loại 2 







  change() {
	this.loadDataList();
	//get user current
	
	this.changeDetectorRefs.detectChanges();
  }
  loadTTuser()
  {
	  this.auth.getProFileUsers_change().subscribe(res =>{	

		  this.listTT_user=res.data;
		  this.changeDetectorRefs.detectChanges();
		 
	  })
  }
  LoadTrangCaNhan()
  {
      this._services_canhan.gettrangCaNhan(this._services_canhan.rt_API_TrangCaNhan).subscribe(res=>{
        this.listTrangCaNhan=res.data;
        this.changeDetectorRefs.detectChanges();
      })
  }
  ngOnInit() {
	this.GetCurrentUser();
    this.LoadData();
    this.LoadTrangCaNhan();
    // this.dataSource = new BaiDangDataSource (this._services);
   //get list bài đăng
   this.loadDataList();
   //get user current
  
   // get list icons
   this.GetListLike();
   //get list nhân viên được khen thưởng
   this.loadTTuser();

//    this.loadInitPost();
  //  this.loadcmt();
  
  }



	/**
	 * On destroy
	 */
	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}

		// if (this.interval) {
		// 	clearInterval(this.interval);
		// }

		this.AcceptInterval = false;
	}



	/**
	 * Create form
	 */
	createForm() {
	

		for (var i = 0; i < this.ListYKien.length; i++) {
			this.ListAttachFile.push([])
		
		}
	}

	GetListAttach(ind: number): any {
		return this.ListAttachFile[ind];
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.FormControls.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
	onSubmit(type: boolean) {
		let ArrDVC: any[] = [];
		for (var i = 0; i < this.ListDonViCon.length; i++) {
			if (this.ListDonViCon[i].check) {
				ArrDVC.push(this.ListDonViCon[i]);
			}
		}
		if (type) {
			//this.dialogRef.close(ArrDVC);
		}
		else {
			//this.dialogRef.close();
		}
	}

	ShowOrHideComment(invit:number,ind: number,idbd:number) {
		var x = document.getElementById("ykchild" +invit+ ind+idbd);
		//var a = document.getElementById("btnHideyk" + ind);
		//var b = document.getElementById("btnShowyk" + ind);
		if (!x.style.display || x.style.display === "none") {
			x.style.display = "block";
			//a.style.display = "block";
			//b.style.display = "none";
		} else {
			x.style.display = "none";
			//a.style.display = "none";
			//b.style.display = "block";
		}
		console.log('ind:',ind);
		return x.style.display;
	}
	




	// selectFile_PDF(ind) {
	// 	if (ind == -1) {
	// 		let f = document.getElementById("PDFInpdd");
	// 		f.click();
	// 	}
	// 	else {
	// 		let f = document.getElementById("PDFInpdd" + ind);
	// 		f.click();
	// 	}

	// }
	DeleteFile_PDF(index,isDevMode)
	{

	}
	onSelectFile_PDF(event,index) {

		setTimeout(() => {
			
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
				console.log(this.image);
					this.changeDetectorRefs.detectChanges();
			  
				  }
				}
			
			  reader.readAsDataURL(filesAmount);
			}, 100);
			
		
			 } 
	
	
	
			 CloseIMG()
			 {
			   this.image=null;
			   this.nameimg=null;
			 
			 }

			
		  
		
		  
// pareseHtml_img(str)
// {	
// 	const result = `<img src="${str}" width="200" height="100">`;
// 	return result;
// }
	parseHtml(str) {
		var html = str;
		var reg = /@\w*(\.[A-Za-z]\w*)|\@[A-Za-z]\w*/gm
		var reg1 = /\:[A-Za-z]\w*\:/gm
		var match = html.match(reg);
		if (match != null) {
			for (var i = 0; i < match.length; i++) {
				var key = match[i] + '';
				var username = key.slice(1);
				if (this.accounts[key]) {
					// var re = `<span class="url inline-tag" data-username="${username}">${this.accounts[key]}</span>`;
					// html = html.replace(key, re);
				}
			}
		}
		match = html.match(reg1);
		if (match != null) {
			for (var i = 0; i < match.length; i++) {
				var key = match[i] + '';
				if (this.emotions[key]) {
					// var re = `<img src="${this.emotions[key]}" />`;
					// html = html.replace(key, re);
				}
			}
		}
			// setTimeout(() => {
			// 	this.ngAfterViewInit();
			// }, 10)
		//return html;
		return this.sanitized.bypassSecurityTrustHtml(html)
	}
	
	remove(item, index, indexc = -1) {
		
	}

	
	//#region tag username
	getOptions() {
		var options: any = {
			showSearch: false,
			keyword: this.getKeyword(),
			data: this.listUser.filter(x => this.selected.findIndex(y => x.id_nv == y.id_nv) < 0),
		};
		return options;
	}
	getKeyword() {
		let i = this.CommentTemp.lastIndexOf('@');
		if (i >= 0) {
			let temp = this.CommentTemp.slice(i);
			if (temp.includes(' '))
				return '';
			return this.CommentTemp.slice(i);
		}
		return '';
	}
	list_rep:any[]=[];

	reply(id_u:number,index, indexc = -1)
	{ 
		
		// this._service_cmt.TagName(id_u).subscribe(res=>{
		// 		this.list_rep=res.data;	
		// 		this.dulieu_cmt_child="@"+this.list_rep[0].Username;
		// 		this.changeDetectorRefs.detectChanges();

		// })

	
	
	}


	XoaBaiDangCaNhan(idbd_canhan:number)

	{

		
		const _title = this.translate.instant('Xóa Bài Đăng');
			const _description = this.translate.instant('Bạn có muốn xóa không ?');
			const _waitDesciption = this.translate.instant('Dữ liệu đang được xóa');
			const _deleteMessage = this.translate.instant('Xóa thành công !');
	
			const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
			dialogRef.afterClosed().subscribe(res => {
				if (!res) {
					return;
		}
		//debugger
		// xóa cmt trong bài đăng
	
				this._services_canhan.DeleteBaiDangCaNhan(idbd_canhan,this._services_canhan.rt_API_TrangCaNhan).subscribe(res => {
					// this.loadDataList();
					let index_tap=this.list_baidang.findIndex(x=>x.Id_baidang_canhan==idbd_canhan);
					let vi=this.list_baidang[index_tap].DataBaiDang.findIndex(x=>x.Id_BaiDang==idbd_canhan);
				this.list_baidang[index_tap].DataBaiDang.splice(vi, 1);
						
				this.changeDetectorRefs.detectChanges();
					if (res && res.status === 1) {
						this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete, 4000, true, false, 3000, 'top');
					}
					else {
						this.layoutUtilsService.showActionNotification(res.error.message, MessageType.Read, 9999999999, true, false, 3000, 'top' );
					}
				

				});
			});
		 
	}
	
	onScroll(event) {

		this.pageSize+=1;
		this.loadDataListLayzy(this.pageSize);
	}
}
