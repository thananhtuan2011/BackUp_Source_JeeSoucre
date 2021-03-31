import { BaseModel } from './../../../_metronic/shared/crud-table/models/base.model';
import { environment } from './../../../../environments/environment';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize, tap } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthModel } from '../_models/auth.model';
import { AuthHTTPService } from './auth-http';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TableService } from '../../../_metronic/shared/crud-table/services/table.service';
import { DOCUMENT } from '@angular/common';
import jwt_decode from "jwt-decode";
const redirectUrl = environment.redirectUrl
@Injectable({
  providedIn: 'root',
})

export class AuthService  extends TableService<any> implements OnDestroy {
  // private fields
  API_IDENTITY = `${environment.ApiIdentity}`;
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  // private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  // private _errorMessage = new BehaviorSubject<string>('');
  // public fields
  currentUser$: Observable<UserModel>;
  // isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;
  public ldp_loadDataUser: string = '/user/me';
  public ldp_logOutUser: string = '/user/logout';

  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  constructor(
    @Inject(HttpClient) http,private router: Router, private authHttpService: AuthHTTPService,@Inject(DOCUMENT) private document: Document,
  ) {
    super(http);
     this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<any>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    //  this.isLoading$ = this.isLoadingSubject.asObservable();
    
    // const subscr = this.getUserByToken().subscribe();
    // this.unsubscribe.push(subscr);
  }

  // public methods
  login(email: string, password: string): Observable<any> {
    // debugger
    // var resultLogin;
    // this.isLoadingSubject.next(true);
  
    // return this.authHttpService.login(email, password).pipe(
    //   map((auth: any) => {
    //     debugger
    //     const result = this.setAuthFromLocalStorage(auth);
    //     resultLogin = auth.data;
    //     console.log('data',auth);
    //     // localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth.data.accessToken));
    //     // localStorage.setItem('User',JSON.stringify(resultLogin));
    //     // console.log('TT',resultLogin)
    //     // this.getUserByToken(resultLogin);
    //     // this.getUserByToken(resultLogin);
    //     this.getUserByToken(resultLogin);
    //     return auth;
     
    //   }),
    //   //  switchMap(() => this.getUserByToken(resultLogin)),
    //   catchError((err) => {
    //     console.error('err', err);
    //     return of(undefined);
    //   }),
    //   finalize(() => this.isLoadingSubject.next(false))
    // );
    return ;
  }

  // public setUserData(data: any): any {
	// 	localStorage.setItem('currentUser', JSON.stringify(data));
	// 	return this;
	// }
  // getUserByToken(): Observable<any> {
  //   debugger
  //   const auth = this.getAuthFromLocalStorage();
  //   if (!auth || !auth.access_token) {
  //     return of(undefined);
  //   }
  //   this.isLoadingSubject.next(true);
  //   return this.authHttpService.getUserByToken__Social(auth.access_token).pipe(
  //     map((res: any) => {
  //       if (res) {
  //         this.currentUserSubject = new BehaviorSubject<any>(res.user.customData);
  //         this.setUserData(res.user.customData);
  //         console.log('currentUserSubject',res.user.customData)
  //       } else {
  //         this.logout();
  //       }
  //       return res.user.customData;
  //     }),
  //     finalize(() => this.isLoadingSubject.next(false))
  //   );
  // }

  getcurrentUserSubject(item:any):Observable<any>

  {
    return this.currentUserSubject = new BehaviorSubject<any>(item);
  }
  getUserByToken(): Observable<any> {
     const auth = this.getAuthFromLocalStorage();
    // console.log('getUserByToken',item);
    
    if (!auth || !auth.accessToken) {
       return of(undefined);
     
    }
    // var p=localStorage.getItem('User');
    var p=auth.user.customData;
    // this.currentUserSubject = new BehaviorSubject<any>(auth.user.customData);
    this.isLoadingSubject.next(true);
 
    if (p) {
      this.currentUserSubject = new BehaviorSubject<any>(p);
    
    } else {
      this.logout();   
    }
  }

  // getHttpHeaders(){
  //   const auth = this.getAuthFromLocalStorage();
  //   var p = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //      "Authorization": `Bearer ${auth.accessToken}`
  //    });
  //    return p;
  // }


  // logout() {
  //   debugger
  //   localStorage.removeItem(this.authLocalStorageToken);
  //   // this.router.navigate(['/auth/login'], {
  //   //   queryParams: {},
  //   // });

  //     this.router.navigate(['https://portal.jee.vn/sso?redirectUrl=http://localhost:4200/Home'], {
  //     queryParams: {},
  //   });
  // }
  decoded: any;
  isTokenExpired(token?: string): boolean {
    const auth = this.getAuthFromLocalStorage();
    if (auth === null) return false;

    if (!token) token = auth.access_token;
    if (!token) return false;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return date.valueOf() > new Date().valueOf();
  }

  getTokenExpirationDate(token: string): Date {
    // token = atob(token);
    this.decoded = jwt_decode(token);

    if (this.decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(this.decoded.exp);
    return date;
  }
  logout() { 
    const currentUser = this.getAuthFromLocalStorage();
    if(currentUser &&this.isTokenExpired())
    {

  
   this.logOutUser_PageHome(this.ldp_logOutUser).subscribe(res=>{

   
      localStorage.removeItem(this.authLocalStorageToken); 

      // Chuyển hướng người dùng đến Single Sign On
      this.document.location.href = redirectUrl 
      + document.location.protocol +'//'
      + document.location.hostname + ':' 
      + document.location.port;
   
     
   })
  }

  else
  {
    this.document.location.href = redirectUrl 
    + document.location.protocol +'//'
    + document.location.hostname + ':' 
    + document.location.port;
  }
  
  }

 
  //  return auth;
    // this.isLoadingSubject.next(true);
    // return this.authHttpService.getUserByToken(auth.accessToken).pipe(
    //   map((user: any) => {
    //     if (user) {
    //       this.currentUserSubject = new BehaviorSubject<any>(user);
    //     } else {
    //       this.logout();
    //     }
    //     return user;
    //   }),
    //   finalize(() => this.isLoadingSubject.next(false))
    // );
  //}

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.pass)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  // private setAuthFromLocalStorage(auth: any): boolean {
  //   debugger
  //   console.log("SetAuth", auth);
  //   // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
  //   if (auth.data && auth.data.accessToken) {      
  //     localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth.data.accessToken));
  //     var q = JSON.stringify(auth);

  //     setTimeout(()=>{
  //       window.localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth.data.accessToken));
  //       console.log("SetAuth", localStorage, this.authLocalStorageToken);
  //     });
  //     // localStorage.setItem(this.authLocalStorageToken, q);      
  //     // setTimeout(()=>{
  //     //   window.localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth.data.accessToken));
  //     //   console.log("SetAuth", localStorage, this.authLocalStorageToken);
  //     // });
  //     return true;
  //   }
  //   return false;
  // }

  
  // getDataUser_PageHome(routeFind: string = '', sso_token:string = ''): Observable<BaseModel>  {
    
  //   const url = this.API_IDENTITY + routeFind;
  //   const httpHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     "Authorization": sso_token 
  //   }); 
  //   return this.http.get<BaseModel>(url, { headers: httpHeader })
  //   .pipe(
  //     tap((res) => {localStorage.setItem(this.authLocalStorageToken, JSON.stringify(res));
  //     }),
    
  //     catchError(err => {
  //       this._errorMessage.next(err);
  //       console.error('lỗi lấy data', err);
  //       return of({ id: undefined });
  //     })
     
  //   );
  // }

  // public getAuthFromLocalStorage(): any {
    
  //   try {
  //     const authData = JSON.parse(
  //       localStorage.getItem(this.authLocalStorageToken)
  //     );
  //     return authData;
  //   } catch (error) {
  //     console.error(error);
  //     return undefined;
  //   }
  // }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
