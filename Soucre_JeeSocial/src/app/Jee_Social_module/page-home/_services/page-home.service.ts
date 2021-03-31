import { TableService } from '../../../_metronic/shared/crud-table';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BaiDangModel } from '../_model/BaiDang.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageHomeService extends TableService<BaiDangModel> implements OnDestroy {
  API_URL = `/baidang`;
  API_Menu=`/menu`
  public rt_loadmenu: string = this.API_Menu;
  public rt_loadbaidang: string = this.API_URL + '/getDSBaiDang';
  public rt_addbaidang: string = this.API_URL + '/addBaiDang'
  public rt_deletebaidang: string = this.API_URL;
  public rt_like_baidang: string = this.API_URL;
  public rt_update_baidang: string = this.API_URL + '/UpdateBaiDang';
  public rt_load_idKhenThuong: string ='/khenthuong/GetDSKhenThuong';
  public rt_file_image: string = this.API_URL + '/File_baidang'
  public rt_update_file_image: string = this.API_URL;
  public rt_getBaiDang_Group: string = this.API_URL;
  
  constructor(@Inject(HttpClient) http) {
    super(http);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
