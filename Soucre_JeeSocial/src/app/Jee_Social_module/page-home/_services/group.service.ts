import { GroupModel } from './../_model/group.model';
import { QueryParamsModel, TableService } from '../../../_metronic/shared/crud-table';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends  TableService<GroupModel> implements OnDestroy {
  id_group$=new BehaviorSubject<number>(0);
  lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
  API_URL = `/Group`;
  API_URL_user = `/user`;
  constructor(@Inject(HttpClient) http) {
    super(http);
  }
  public rt_getlist_group: string = this.API_URL + '/getDSGroup';
  public rt_random_user: string = this.API_URL_user + '/GetrandomDSUser';
  public rt_insert_group: string = this.API_URL;
  public rt_UpdateGroup: string = this.API_URL;
  public rt_getList_User: string = this.API_URL;
  public rt_findData_BaiDangGroup: string = this.API_URL;
  public rt_getlist_Usergroup: string = this.API_URL;
  public rt_DeleteGroup: string = this.API_URL;
  
  

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
