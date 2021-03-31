import { PageHomeService } from './../../../../../../Jee_Social_module/page-home/_services/page-home.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../../core';
import { UserModel } from '../../../../../../modules/auth/_models/user.model';
import { AuthService } from '../../../../../../modules/auth/_services/auth.service';
@Component({
  selector: 'app-user-dropdown-inner',
  templateUrl: './user-dropdown-inner.component.html',
  styleUrls: ['./user-dropdown-inner.component.scss'],
})
export class UserDropdownInnerComponent implements OnInit {
  extrasUserDropdownStyle: 'light' | 'dark' = 'light';
  user$: Observable<UserModel>;
  listTTUser:any[]=[];

  constructor(private layout: LayoutService,
     private auth: AuthService,
     private _service:PageHomeService
     
     ) {}

     getDataUser()
     {
       this.auth.getProFileUsers_change().subscribe(res=>{
        this.listTTUser=res.data[0];
        console.log('listTTUsser',res.data);
       })
     }

  ngOnInit(): void {
    this.extrasUserDropdownStyle = this.layout.getProp(
      'extras.user.dropdown.style'
    );
    this.user$ = this.auth.currentUserSubject.asObservable();
    // this.getDataUser();
  }

  logout() {
    this.auth.logout();
    //document.location.reload();
  }
}
