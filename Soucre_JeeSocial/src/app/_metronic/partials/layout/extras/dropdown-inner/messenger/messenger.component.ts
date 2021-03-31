
import { AfterViewInit, ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'kt-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit,AfterViewInit {

	
	Test:any[];

	Acti:any[] = [
	  {id: 1, acti: 'true'},
  ];
  
  public canSendMessage: Boolean;
  	// Public properties

	// Set icon class name
	@Input() icon = '';

  @Input() pulse: boolean;

  @Input() pulseLight: boolean;
  
	@Input() iconType: '' | 'warning';

	// Set true to icon as SVG or false as icon class
	@Input() useSVG: boolean;

	// Set bg image path
	@Input() bgImage: string;

	// Set skin color, default to light
	@Input() skin: 'light' | 'dark' = 'light';

	@Input() gridNavSkin: 'light' | 'dark' = 'light';

	id_user_current:number;
	listTT_user:any[]=[];
	item:any[]=[];
	searchText;
	list_userchat:any[]=[];
	constructor(

	
		private _ngZone: NgZone,

	) {
		
   
	}



	

  

  
	ngAfterViewInit(): void {
	}

	/**
	 * On init
	 */
	ngOnInit(): void {
	
	}

	onSVGInserted(svg) {
		svg.classList.add('kt-svg-icon', 'kt-svg-icon--success', 'kt-svg-icon--lg');
	}
}
