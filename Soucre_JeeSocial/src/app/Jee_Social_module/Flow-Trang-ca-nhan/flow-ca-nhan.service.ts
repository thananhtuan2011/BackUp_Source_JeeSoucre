import { environment } from './../../../environments/environment';

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableService } from '../../_metronic/shared/crud-table';
// const API= environment.Apiroot+'trangcanhan'

@Injectable(
 
)
export class FlowCaNhanService extends TableService<any> implements OnDestroy {  

 
  constructor(@Inject(HttpClient) http) {
    super(http);
  }
  API_URL = `/flow`;
  public rt_flow: string = this.API_URL;
    
  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
    // getRanDomAnh(): any {
    //   const httpHeaders = this.httpUtils.getHTTPHeaders();
    //   return this.http.get<any>(API_canhan + `/getRanDoomAnh`, { headers: httpHeaders });
    // }
  
   

// UpdateTieuSu(item:TrangCaNhanModel): Observable<any> {
//   const httpHeaders = this.httpUtils.getHTTPHeaders();
//   return this.http.post<any>(API + '/UpdateTrangCaNhan', item, { headers: httpHeaders });
// }
}
