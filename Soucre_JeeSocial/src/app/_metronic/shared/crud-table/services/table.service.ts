import { TrangCaNhanModel } from './../../../../Jee_Social_module/page-home/_model/TrangCaNhan.model';
import { GroupMemberModel } from './../../../../Jee_Social_module/page-home/_model/group_Member.model';
import { GroupModel } from './../../../../Jee_Social_module/page-home/_model/group.model';
import { ImageModel } from './../../../../Jee_Social_module/page-home/_model/Img.model';
import { routes } from './../../../../app-routing.module';
import { MediaModel } from './../../../../Jee_Social_module/page-home/_model/media.model';
import { AuthModel } from './../../../../modules/auth/_models/auth.model';
// tslint:disable:variable-name
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { PaginatorState } from '../models/paginator.model';
import { ITableState, QueryParamsModelNew, QueryParamsModelNewLazy, QueryResultsModel, TableResponseModel } from '../models/table.model';
import { BaseModel } from '../models/base.model';
import { SortState } from '../models/sort.model';
import { GroupingState } from '../models/grouping.model';
import { environment } from '../../../../../environments/environment';

const DEFAULT_STATE: ITableState = {
  filter: {},
  paginator: new PaginatorState(),
  sorting: new SortState(),
  searchTerm: '',
  grouping: new GroupingState(),
  entityId: undefined
};

export abstract class TableService<T> {
  // Private fields
  private _items$ = new BehaviorSubject<T[]>([]);
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  private _isFirstLoading$ = new BehaviorSubject<boolean>(true);
  private _tableState$ = new BehaviorSubject<ITableState>(DEFAULT_STATE);
  private _errorMessage = new BehaviorSubject<string>('');
  private _subscriptions: Subscription[] = [];
  public currentUserSubject = new BehaviorSubject<any>(undefined);
  currentUser$: Observable<any>;
  // isLoading$: Observable<boolean>;
  public authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;



  API_Social = `${environment.apiUrl_Social}`;
  API_IDENTITY = `${environment.ApiIdentity}`;
  API_USERS_URL=`${environment.apiUrl_Social}`+'/user';
 API_USERS_URL_PB_NV =`${environment.apiUrl_Social}`+'/phongban_nv' ;//  đường dẫn api
  // InsertComnent(item:CommentModel):Observable<any>{
  //   const httpHeaders = this.httpUtils.getHTTPHeaders();
  //   return this.http.post<any>(API + '/addComment', item, { headers: httpHeaders });
  // }

  CheckFlow(id_canhan:number,routespst:string): any {
    const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
    return this.http.get<any>(url + `/CheckFlow?id_canhan=${id_canhan}`, { headers: httpHeaders });
  }


  InsertFlow(id_canhan:number,routespst:string): Observable<any> {
    const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
    return this.http.post<any>(url + `/addFlow?id_canhan=${id_canhan}`, { headers: httpHeaders });
  }

  
  DeleteFlow(id_canhan:number,routespst:string): Observable<any> {
    const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
    return this.http.delete<any>(url + `/DeleteFlow?id_canhan=${id_canhan}`, { headers: httpHeaders });
  }
  
  getFlow(id_canhan:number,routespst:string): any {
    const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
    return this.http.get<any>(url + `/getFlow?id_canhan=${id_canhan}`, { headers: httpHeaders });
  }
   

  getTrangCaNhanFlow(id_:number,routespst:string): any {
    const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
    return this.http.get<any>(url + `/getTrangCaNhanFlow?id_user=${id_}`, { headers: httpHeaders });
  }
  getBaiDangFlowTrangCaNhan(routespst:string): any {
    const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
    return this.http.get<any>(url + `/getDSBaiDangFlowTrangCaNhan`, { headers: httpHeaders });
  }

  getGioiThieuFlow(routespst:string): any {
    
    const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
    return this.http.get<any>(url + `/getGioiThieuFlow`, { headers: httpHeaders });
  }
  // begin serive trang cá nhân
  
  getdataEdit(id_:number,routespst:string): any {
    const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
    return this.http.get<any>(url + `/GetDataEDit?id_baidang=${id_}`, { headers: httpHeaders });
  }
  gettrangCaNhan(routespst:string):Observable<any> {
    const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
    return this.http.get<any>(url + `/getTrangCaNhan`, { headers: httpHeaders });
  }
  getBaiDangTrangCaNhan(queryParams: QueryParamsModelNewLazy,routespst:string): Observable<QueryResultsModel>{
    const httpHeaders = this.getHttpHeaders();
    const httpParams = this.getFindHTTPParams(queryParams);
    const url = this.API_Social+routespst;
    return this.http.get<any>(url + `/getDSBaiDangTrangCaNhan`, { headers: httpHeaders,params:  httpParams });
  }

  getGioiThieu(id_:number,routespst:string): any {
    const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
    return this.http.get<any>(url + `/getGioiThieu?id_user=${id_}`, { headers: httpHeaders });
  }
  getRanDomAnh(routespst:string): any {
    const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
    return this.http.get<any>(url + `/getRanDoomAnh`, { headers: httpHeaders });
  }

    ChangeAnhBia(id_:number,_item: ImageModel,routespst:string): Observable<boolean> {
      const httpHeaders = this.getHttpHeaders();
      const url = this.API_Social+routespst;
      return this.http.post<any>(url+`/UpdateAnhBia?id_canhan=${id_}`, _item,{ headers: httpHeaders });
  }

  ChiaSeBaiDang(id_user:number,id_bd:number,routespst:string): Observable<boolean> {
    const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
    return this.http.post<any>(url+`/ShareBaiDang?id_user=${id_user}&id_baidang=${id_bd}`,{ headers: httpHeaders });
    
}

DeleteBaiDangCaNhan(id_:number,routespst:string): Observable<any> {
  const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
  return this.http.delete<any>(url+`/deleteBaiDangChiaSe?id_baidangcanhan=${id_}`,{ headers: httpHeaders });
}

UpdateTieuSu(item:TrangCaNhanModel,routespst:string): Observable<any> {
  const httpHeaders = this.getHttpHeaders();
  const url = this.API_Social+routespst;
return this.http.post<any>(url + '/UpdateTrangCaNhan', item, { headers: httpHeaders });
}

postAvatar(_item: ImageModel,routespst:string): Observable<any> {


  const httpHeaders = this.getHttpHeaders();
  const url = this.API_Social+routespst;
return this.http.post<any>(url+`/UpdateAvatarUser`,_item,{ headers: httpHeaders });
  
}
// end trang cá nhân
  getBaiDang_Group(id_group:number,queryParams: QueryParamsModelNewLazy,routespst:string):any {
    const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
		const httpParams = this.getFindHTTPParams(queryParams);
		return this.http.get<any>(url+`/getDSBaiDang_In_Group?id_user&id_group=${id_group}`,{ headers: httpHeaders,params:  httpParams });
		
		
	}
  DeleteGroup(id_group:number,routespst:string):Observable<any>{
    const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
  return this.http.delete<any>(url + `/deleteGroup?id_group=${id_group}`,
  { headers: httpHeaders });
  }
  getlist_Usergroup(id_:number,routespst:string):any {
    //getDSBaiDang?id_user=6
    const httpHeaders = this.getHttpHeaders();
    const url = this.API_Social+routespst;
    return this.http.get<any>(url+`/getDSUser_Group?id_group=${id_}`,{ headers: httpHeaders });
    
    
  }
  findData_BaiDangGroup(id_group:number,queryParams: QueryParamsModelNew,routespst:string): Observable<QueryResultsModel> {
    const httpHeaders = this.getHttpHeaders();
    const httpParams = this.getFindHTTPParams(queryParams);
    const url = this.API_Social+routespst + `/BaidangGroup_Datasource?id_group=${id_group}`;
    return this.http.get<QueryResultsModel>(url, {
      headers: httpHeaders,
      params: httpParams
    });
  }
  public getPageSize(): Observable<string> {
    const size: string = "10";
    return of(size);
  }
  getList_User(id:number,queryParams: QueryParamsModelNew,routespst:string): Observable<QueryResultsModel>{
    const httpHeaders = this.getHttpHeaders();
    // const url=this.API_Social+routespst;
    const httpParams = this.getFindHTTPParams(queryParams);
        const url = this.API_Social+routespst+`/DataSource_Group?id_group=${id}`;
        return this.http.get<any>(url, { headers: httpHeaders,
          params: httpParams });
      }

  Update_quyen_Memmber(id_user:number,item:GroupMemberModel,routespst:string): Observable<any> {
    const httpHeaders = this.getHttpHeaders();
    const url=this.API_Social+routespst;
    return this.http.post<any>(url + `/Update_quyen_Memmber?id_user=${id_user}`, item, { headers: httpHeaders });
  }
  UpdateGroup(item:GroupModel,routespst:string): Observable<any> {
    const httpHeaders = this.getHttpHeaders();
    const url=this.API_Social+routespst;
    return this.http.post<any>(url + '/UpdateGroup', item, { headers: httpHeaders });
  }
  Delete_User_Group(id_gr:number,id_u:number,routespst:string): Observable<any> {
    const httpHeaders = this.getHttpHeaders();
    const url=this.API_Social+routespst;
    return this.http.delete<any>(url + `/Delete_User?id_group=${id_gr}&id_user=${id_u}`, { headers: httpHeaders });
  }
  InsertUserGroup(id_group:number,id_user:number,item:GroupMemberModel,routespst:string): Observable<any> {
    const httpHeaders = this.getHttpHeaders();
    const url=this.API_Social+routespst;
    return this.http.post<any>(url + `/addUserGroup?id_group=${id_group}&id_user=${id_user}`, item, { headers: httpHeaders });
  }
  InsertGroup(item:GroupModel,routespst:string): Observable<any> {
    const httpHeaders = this.getHttpHeaders();
    const url=this.API_Social+routespst;
    return this.http.post<any>(url + '/addGroup', item, { headers: httpHeaders });
  }
  getlistMyMedia(id_user:number):any {
    const httpHeaders = this.getHttpHeaders();
    return this.http.get<any>(this.API_Social+`/media/GetDS_MyMedia?id_usser=${id_user}`,{ headers: httpHeaders });
    
    
  }

 UpdateMedia(item:MediaModel):any {
  const httpHeaders = this.getHttpHeaders();
    return this.http.post<any>(this.API_Social+`/media/updateMedia`,item,{ headers: httpHeaders });
    
    
  }

  getlistMedia():any {
    const httpHeaders = this.getHttpHeaders();
    return this.http.get<any>(this.API_Social+'/media/GetDSMedia',{ headers: httpHeaders });
    
    
  }
  getlistIDMedia():any {
    const httpHeaders = this.getHttpHeaders();
    return this.http.get<any>(this.API_Social+'/media/GetIDMedia',{ headers: httpHeaders });
    
  }
 
  DeleteMedia(id_media:number):any {
   
    const httpHeaders = this.getHttpHeaders();
    return this.http.delete<any>(this.API_Social+`/media/deleteMedia?id_media=${id_media}`,{ headers: httpHeaders });
    
    
  }

 
  Get_Social(routePost:string):Observable<any> {
    const url = this.API_Social + routePost;
    const httpHeaders = this.getHttpHeaders();
    return this.http.get<any>(url,{ headers: httpHeaders });
  }

LoadMenu(routspst:string):Observable<any>
{
  const url = this.API_Social+routspst;

   return this.http.get<any>(url+'/GetMenu');
  
}
  getAllNhanvien():any {
        
    return this.http.get<any>(this.API_USERS_URL_PB_NV+'/GetDSNhanVien');
}
  Insert(item:any,routePost:string)
  {
    const url = this.API_Social + routePost;
    const httpHeaders = this.getHttpHeaders();
    return this.http.post<any>(url, item, { headers: httpHeaders });
  }
  getPhanLoaiBaiDang():any {
    const httpHeaders = this.getHttpHeaders();
    return this.http.get<any>(this.API_Social+`/PhanQuyen_Loai/PhanQuyenLoaiBaiDang`,{ headers: httpHeaders });
}

InsertBaiDang_KT(item:any): Observable<any> {
	const httpHeaders = this.getHttpHeaders();
	return this.http.post<any>(this.API_Social + '/baidang/addBaiDang_KT', item, { headers: httpHeaders });
}
//begin media

//  UpdateMedia(item:MediaModel):any {
//     const httpHeaders = this.getHttpHeaders();
//     return this.http.post<any>(this.API_LOAD_PAGE+`/updateMedia`,item,{ headers: httpHeaders });
    
    
//   }
GetDSKhenThuong(routes:string):any {
  const url=this.API_Social+routes;
  return this.http.get<any>(url);

}

getProFileUsers_change():any {
  const httpHeaders = this.getHttpHeaders();
  return this.http.get<any>(this.API_USERS_URL+`/GetDSUser_profile_change`,{ headers: httpHeaders });
}


parseFilter(data){
  var filter={
    keys:'',
    vals:''
  }
  let keys = [], values = [];
  Object.keys(data).forEach(function (key) {
    if (typeof data[key] !== 'string' || data[key] !== '') {
      keys.push(key);
      values.push(data[key]);
    }
  });
  if (keys.length > 0) {
    filter.keys= keys.join('|');
    filter.vals= values.join('|');
  }
  return filter;
}
getAllUsser_filter_Group(id_gr:number,filter: any,routerpst:string): Observable<any> {
  const httpHeaders = this.getHttpHeaders();
let params = this.parseFilter(filter);
 const url=this.API_Social+routerpst;
return this.http.get<any>(url + `/GetDSUser_filter_InGroup?id_gr=${id_gr}`, { headers: httpHeaders, params: params });
}

getAllChooseUsser_In_Group(id_g:number,filter: any,routerpst:string): Observable<any> {
  const httpHeaders = this.getHttpHeaders();
let params = this.parseFilter(filter);
const url=this.API_Social+routerpst;
return this.http.get<any>(url + `/GetDSUser_In_Group?id_group=${id_g}`, { headers: httpHeaders, params: params });
}



  // DeleteMedia(id_media:number):any {
   
  //   const httpHeaders = this.getHttpHeaders();
  //   return this.http.delete<any>(this.API_LOAD_PAGE+`/deleteMedia?id_media=${id_media}`,{ headers: httpHeaders });
    
    
  // }
  getlistMyMediaDetail(id_media:number):any {
    //getDSBaiDang?id_user=6
    const httpHeaders = this.getHttpHeaders();
    return this.http.get<any>(this.API_Social+`/media/GetDetailMedia?_idmedia=${id_media}`,{ headers: httpHeaders });
    
    
  }
  like_cmt(id:number, type:number): Observable<any> {
    const httpHeaders = this.getHttpHeaders();
    //const url = API_baidang + '/like?id=' + id + '&type=' + type;
    const url = this.API_Social + `/Comment/Comment_like?id=${id}&type=${type}`;
  
    return this.http.post<any>(url,null,{ headers: httpHeaders });
  }
  like_cmt_child(id:number, type:number): Observable<any> {
    const httpHeaders = this.getHttpHeaders();
    //const url = API_baidang + '/like?id=' + id + '&type=' + type;
    const url = this.API_Social  + `/Comment/CommentChild_like?id=${id}&type=${type}`;
  
    return this.http.post<any>(url,null,{ headers: httpHeaders });
  }
  // like bài đăng
  like(id:number, type:number,router:string): Observable<any> {

	
    const httpHeaders = this.getHttpHeaders();
    //const url = API_baidang + '/like?id=' + id + '&type=' + type;
  //	const url = API_baidang + `/Baidang_like?id=${id}&type=${type}`;
  
    //return this.http.post<any>(url);
  
    return this.http.post<any>(this.API_Social+router+ `/Baidang_like?id=${id}&type=${type}`,null,{headers: httpHeaders });	
  }
  getlist_like():any {
		return this.http.get<any>(this.API_Social+'/like/getDSLike');
		
  }

  public getUserData(): Observable<any> {
		const user: any = <any>localStorage.getItem('currentUser');
		return of(JSON.parse(user));
	}

  //end media
  // Getters
  updateSocial(item: any, routePost: string = ''): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const httpHeader = this.getHttpHeaders();
    const url = this.API_Social + routePost;
    return this.http.post<any>(url, item, { headers: httpHeader })
  }

  // DELETE
  deleteSocial(id: number, routePost: string = ''): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const httpHeader = this.getHttpHeaders();
    const url = this.API_Social + routePost;
    return this.http.delete<any>(url,{ headers: httpHeader })
    
  }
  DeleteComnent(id_cmt:number,routerpst:string):Observable<any>{
    const httpHeader = this.getHttpHeaders();
    const url = this.API_Social+routerpst;
	return this.http.delete<any>(url + `/deleteComment?id_cmt=${id_cmt}`,
	{ headers: httpHeader });
  }
  postWithFile(_item: ImageModel,routerpst:string): Observable<boolean> {
    const httpHeader = this.getHttpHeaders();
    const url = this.API_Social+routerpst;
    return this.http.post<any>(url,_item,{ headers: httpHeader });
      
}
UpdateWithFile(id_:number,_item: ImageModel,routerpst:string): Observable<boolean> {
  const httpHeader = this.getHttpHeaders();
  const url = this.API_Social+routerpst;
  return this.http.post<any>(url+`/File_Updatebaidang?id_baidang=${id_}`, _item,{ headers: httpHeader });
    
}


	DeleteBaidang(id_bd:number,routerpst:string):any{
    const httpHeader = this.getHttpHeaders();
    const url = this.API_Social+routerpst;
	return this.http.delete<any>(url + `/deleteBaiDang?id_baidang=${id_bd}`, 
	{ headers: httpHeader });
	}


  get items$() {
    return this._items$.asObservable();
  }
  get isLoading$() {
    return this._isLoading$.asObservable();
  }
  get isFirstLoading$() {
    return this._isFirstLoading$.asObservable();
  }
  get errorMessage$() {
    return this._errorMessage.asObservable();
  }
  get subscriptions() {
    return this._subscriptions;
  }
  // State getters
  get paginator() {
    return this._tableState$.value.paginator;
  }
  get filter() {
    return this._tableState$.value.filter;
  }
  get sorting() {
    return this._tableState$.value.sorting;
  }
  get searchTerm() {
    return this._tableState$.value.searchTerm;
  }
  get grouping() {
    return this._tableState$.value.grouping;
  }

  protected http: HttpClient;
  // API URL has to be overrided
  API_URL = `${environment.apiUrl}/endpoint`;
  constructor(http: HttpClient) {
    this.http = http;
  }

  public getAuthFromLocalStorage(): any {
    try {
      
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      if(authData)
      {
        this.currentUserSubject = new BehaviorSubject<any>(authData.user.customData);
      }
  
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  getAllUsers():any {
    const httpHeaders = this.getHttpHeaders();
    return this.http.get<any>(this.API_Social+'/user/GetDSUser',{ headers: httpHeaders});
}
  getHttpHeaders() {
    
    // const auth = this.getAuthFromLocalStorage();
    // var p = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   "Authorization": `Bearer ${auth!=null?auth.access_token:''}`
    // });
    // return p;
    const auth = this.getAuthFromLocalStorage();
    // console.log('auth.token',auth.access_token)
    let result = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+auth.access_token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return result;
  }
  getDataUser_LandingPage(routeFind: string = '', sso_token:string = ''): Observable<BaseModel>  {
    
    const url = this.API_IDENTITY + routeFind;
    const httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": sso_token 
    }); 
    return this.http.get<BaseModel>(url, { headers: httpHeader })
    .pipe(
      tap((res) => {
      }),
      catchError(err => {
        this._errorMessage.next(err);
        console.error('lỗi lấy data', err);
        return of({ id: undefined });
      })
     
    );
  }

  public setUserData(data: any): any {
		localStorage.setItem('currentUser', JSON.stringify(data));
		return this;
	}
  getDataUser_PageHome(routeFind: string = '', sso_token:string = ''): Observable<any>  {
    const url = this.API_IDENTITY + routeFind;
    const httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": sso_token 
    }); 
    return this.http.get<any>(url, { headers: httpHeader })
    .pipe(
      tap((res) => {localStorage.setItem(this.authLocalStorageToken, JSON.stringify(res));
     
        console.log('data',res)
        // this.currentUserSubject = new BehaviorSubject<any>(res.dât);
      }),
      catchError(err => {
        this._errorMessage.next(err);
        console.error('lỗi lấy data', err);
        return of({ id: undefined });
      })
     
    );
  }

  getFindHTTPParams(queryParams): HttpParams {
		let params = new HttpParams()
			//.set('filter',  queryParams.filter )
			.set('sortOrder', queryParams.sortOrder)
			.set('sortField', queryParams.sortField)
			.set('page', (queryParams.pageNumber + 1).toString())
			.set('record', queryParams.pageSize.toString());
		let keys = [], values = [];
		if (queryParams.more) {
			params = params.append('more', 'true');
		}
		Object.keys(queryParams.filter).forEach(function (key) {
			if (typeof queryParams.filter[key] !== 'string' || queryParams.filter[key] !== '') {
				keys.push(key);
				values.push(queryParams.filter[key]);
			}
		});
		if (keys.length > 0) {
			params = params.append('filter.keys', keys.join('|'))
				.append('filter.vals', values.join('|'));
		}
		return params;
	}
    //begin load page-home 
	getlistBaiDang(queryParams:QueryParamsModelNewLazy , routeFind: string = ''): Observable<QueryResultsModel> {
    const url = this.API_Social + routeFind;
    const httpHeader = this.getHttpHeaders();
    const httpParams = this.getFindHTTPParams(queryParams);
		return this.http.get<any>(url,{ headers: httpHeader,params:  httpParams });
		
	}
  logOutUser_PageHome(routeFind: string = ''): Observable<any>  {
    const url = this.API_IDENTITY + routeFind;
    // const httpHeader = this.getHttpHeaders(); 
    const auth = this.getAuthFromLocalStorage();
    console.log('logou',auth.access_token);
    const httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": auth.access_token 
    }); 
    return this.http.post<any>(url,null, { headers: httpHeader });
    // .pipe(
    //   tap((res) => { debugger }),
    //   catchError(err => {
    //     this._errorMessage.next(err);
    //     console.error('lỗi logout', err);
    //     return of({ id: undefined });
    //   })
     
   // );
  }
// 



	
  // CREATE
  // server should return the object with ID
  create(item: BaseModel): Observable<BaseModel> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this.http.post<BaseModel>(this.API_URL, item).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('CREATE ITEM', err);
        return of({ id: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // READ (Returning filtered list of entities)
  find(tableState: ITableState): Observable<TableResponseModel<T>> {
    const url = this.API_URL + '/find';
    this._errorMessage.next('');
    return this.http.post<TableResponseModel<T>>(url, tableState).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('FIND ITEMS', err);
        return of({ items: [], total: 0 });
      })
    );
  }

  getItemById(id: number): Observable<BaseModel> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `${this.API_URL}/${id}`;
    return this.http.get<BaseModel>(url).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('GET ITEM BY IT', id, err);
        return of({ id: undefined });
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // UPDATE
  update(item: BaseModel): Observable<any> {
    const url = `${this.API_URL}/${item.id}`;
    this._isLoading$.next(true);
    this._errorMessage.next('');
    return this.http.put(url, item).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('UPDATE ITEM', item, err);
        return of(item);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // UPDATE Status
  updateStatusForItems(ids: number[], status: number): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const body = { ids, status };
    const url = this.API_URL + '/updateStatus';
    return this.http.put(url, body).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('UPDATE STATUS FOR SELECTED ITEMS', ids, status, err);
        return of([]);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // DELETE
  delete(id: any): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = `${this.API_URL}/${id}`;
    return this.http.delete(url).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('DELETE ITEM', id, err);
        return of({});
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  // delete list of items
  deleteItems(ids: number[] = []): Observable<any> {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const url = this.API_URL + '/deleteItems';
    const body = { ids };
    return this.http.put(url, body).pipe(
      catchError(err => {
        this._errorMessage.next(err);
        console.error('DELETE SELECTED ITEMS', ids, err);
        return of([]);
      }),
      finalize(() => this._isLoading$.next(false))
    );
  }

  public fetch() {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request = this.find(this._tableState$.value)
      .pipe(
        tap((res: TableResponseModel<T>) => {
          this._items$.next(res.items);
          this.patchStateWithoutFetch({
            paginator: this._tableState$.value.paginator.recalculatePaginator(
              res.total
            ),
          });
        }),
        catchError((err) => {
          this._errorMessage.next(err);
          return of({
            items: [],
            total: 0
          });
        }),
        finalize(() => {
          this._isLoading$.next(false);
          const itemIds = this._items$.value.map((el: T) => {
            const item = (el as unknown) as BaseModel;
            return item.id;
          });
          this.patchStateWithoutFetch({
            grouping: this._tableState$.value.grouping.clearRows(itemIds),
          });
        })
      )
      .subscribe();
    this._subscriptions.push(request);
  }

  public setDefaults() {
    this.patchStateWithoutFetch({ filter: {} });
    this.patchStateWithoutFetch({ sorting: new SortState() });
    this.patchStateWithoutFetch({ grouping: new GroupingState() });
    this.patchStateWithoutFetch({ searchTerm: '' });
    this.patchStateWithoutFetch({
      paginator: new PaginatorState()
    });
    this._isFirstLoading$.next(true);
    this._isLoading$.next(true);
    this._tableState$.next(DEFAULT_STATE);
    this._errorMessage.next('');
  }

  // Base Methods
  public patchState(patch: Partial<ITableState>) {
    this.patchStateWithoutFetch(patch);
    this.fetch();
  }

  public patchStateWithoutFetch(patch: Partial<ITableState>) {
    const newState = Object.assign(this._tableState$.value, patch);
    this._tableState$.next(newState);
  }
 
}
