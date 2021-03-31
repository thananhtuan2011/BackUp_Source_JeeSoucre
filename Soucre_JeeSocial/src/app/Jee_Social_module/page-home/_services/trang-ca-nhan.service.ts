import { TrangCaNhanModel } from './../_model/TrangCaNhan.model';
import { TableService } from '../../../_metronic/shared/crud-table';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { environment } from './../../../../environments/environment';
const API = environment.apiUrl_Social+'trangcanhan';
// const API_Flow = environment.Apiroot+'flow';
@Injectable(
  
)
export class TrangCaNhanService extends TableService<TrangCaNhanModel> implements OnDestroy  {


  constructor(@Inject(HttpClient) http) {
    super(http);
  }
    API_URL = `/trangcanhan`;
  public rt_API_TrangCaNhan: string = this.API_URL;



   
  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
