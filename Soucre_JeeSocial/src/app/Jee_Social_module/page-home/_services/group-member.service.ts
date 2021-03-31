import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { TableService } from '../../../_metronic/shared/crud-table';
import { GroupMemberModel } from '../_model/group_Member.model';

@Injectable({
  providedIn: 'root'
})
export class GroupMemberService  extends  TableService<GroupMemberModel> implements OnDestroy {

  constructor(@Inject(HttpClient) http) {
    super(http);
  }
  API_URL = `/GroupMember`;
  public rt_getAllUsser_filter_Group: string = this.API_URL;
  public rt_getAllChooseUsser_In_Group: string = this.API_URL;
  public rt_insert_MemberGroup: string = this.API_URL;
  public rt_delete_memberGroup: string = this.API_URL;
  public rt_Update_quyen_Memmber: string = this.API_URL;
  // Update_quyen_Memmber
  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
