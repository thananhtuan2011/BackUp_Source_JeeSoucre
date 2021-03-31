import { PageHomeService } from './../_services/page-home.service';
import { AuthService } from './../../../modules/auth/_services/auth.service';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-user-right',
  templateUrl: './user-right.component.html',
  styleUrls: ['./user-right.component.scss']
})
export class UserRightComponent implements OnInit {
  constructor(private authservice: AuthService,
    private _service:PageHomeService,
    private changeDetectorRefs: ChangeDetectorRef,
	private dialog:MatDialog,
    // private _dataService: DataService,

    
    ) {
	
	 }
	// ngAfterViewChecked(): void {
	// 	console.log(this.s.nativeElement); // throws an error
	// }
	 
	 scrollTop = 200;
	
	
	
	@ViewChild('scroll', { static: true }) public scroll: ElementRef<any>;
	 isShowForm=false;
	 isShowForm2=false;
	 isShowForm3=false;
	 id_user_chat1:number;
	 id_user_chat2:number;
	 id_user_chat3:number;
  Test: any[];
  item:any[]=[];
  list_messenger:any[]=[];
  list_messenger2:any[]=[];
  list_messenger3:any[]=[];
  itemuser: any[] = [];
  id_send:number =0;
  id_nhan:number=0;
  id_nhan2:number=0;
  id_nhan3:number=0;
  AttachFileComment: any[] = [];
  base64Image: string;
  nameimg:any;
  image: any;
  id_user_current:number;
  listTT_user:any[]=[];
  listTT_user_receive:any[]=[];

  @ViewChild('matInput', { static: true }) matInput: ElementRef;

  listUser:Observable<any[]>;
 userControl =new FormControl();
  id_user_:number;
  isLoading = false;
  result_list: any;
  id_user_chat:number;
  list_chat:any[]=[];
  public canSendMessage: Boolean;
  user_chat1:any[]=[];
  user_chat2:any[]=[];
  user_chat3:any[]=[];
noidung:string="";
active = 1;
 

	
	//duyet cac phan tu
	private _normalizeValue(value: string): string {
		return value.toLowerCase().replace(/\s/g, '');
	}

	private _filterStates(value: string): any[] {
		// debugger
		//	const filterValue = value.toLowerCase();
		const filterValue = this._normalizeValue(value);
		return this.itemuser.filter(state => this._normalizeValue(state.Username).includes(filterValue));
  }


 
  
     
 

	
  
  
	
	getCurrentUser() 
	{
	  this._service.getUserData().subscribe(res =>{
	   
		  this.item= res;
		  this.id_user_current=res.Id;
	 
  
	  });
	}

	loadTTuser()
	{
	  this.authservice.getProFileUsers_change().subscribe(res =>{	
	
		this.listTT_user=res.data;
		this.changeDetectorRefs.detectChanges();
	  
	  })
	}

	loadTTUserNhan()
	{
		// this.authservice.getProFileUsers_change(this.id_nhan).subscribe(res =>{	
	
		// 	this.listTT_user_receive=res.Data;
		// 	this.changeDetectorRefs.detectChanges();
		  
		//   })
	}

	loadTT()
	{
		this._service.getAllUsers().subscribe(res => {
			//  console.log(res);
			this.itemuser = res.data;
		console.log('user',this.itemuser );
				this.listUser= this.userControl.valueChanges
				.pipe(
				  startWith(''),
				  map(state => state ? this._filterStates(state) : this.itemuser.slice())
				
				);
			
				this.changeDetectorRefs.detectChanges();
	  
		  })
	
   


	}

	  
  ngOnInit() {
    

	
	this.getCurrentUser();
this.loadTT();
	



  }
  
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  // set = 'twitter';
  set = 'facebook';
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
        this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    console.log(this.noidung)
    const { noidung } = this;
    console.log(noidung);
    console.log(`${event.emoji.native}`)
    const text = `${noidung}${event.emoji.native}`;

	this.noidung = text;

    // this.showEmojiPicker = false;
  }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }
  onBlur() {
    console.log('onblur')
  }
  
 
	
	
	
	

}
