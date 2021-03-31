import { environment } from '../../../../../environments/environment';

import { LuotXemModel } from '../../_model/luotxem.model';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TableService } from '../../../../_metronic/shared/crud-table';
import { Observable } from 'rxjs';
 const API = environment.apiUrl_Social+'/thongdiep' ;
@Injectable(

)
export class ThongdiepService extends TableService<any> implements OnDestroy {

  
  
  constructor(@Inject(HttpClient) http) {
    super(http);
  }
  getHTTPHeaders() {
    
      const auth = this.getAuthFromLocalStorage();
      // console.log('auth.token',auth.access_token)
      let result = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':auth.access_token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      return result;
    }
    GetDSKhenThuong_Top2():any {
      return this.http.get<any>(API+'/GetRanDomTop2KhenThuong');
  
    }
    
//     postWithFile_ThongDiep(_item: ImageModel): Observable<boolean> {
//       const httpHeaders = this.httpUtils.getHTTPHeaders();
//       return this.http.post<any>(API+'/File_ThongDiep', _item,{ headers: httpHeaders });
        
//   }


//   File_Updatethongdiep(id_:number,_item: ImageModel): Observable<boolean> {
//     const httpHeaders = this.httpUtils.getHTTPHeaders();
//     return this.http.post<any>(API+`/File_Updatethongdiep?id_thongdiep=${id_}`, _item,{ headers: httpHeaders });
      
// }
    getDSThongDiep(): any {
      const httpHeaders = this.getHTTPHeaders();
      return this.http.get<any>(API + '/getDSThongDiep', { headers: httpHeaders });
    }

    CheckGhim(): any {
      const httpHeaders = this.getHTTPHeaders();
      return this.http.get<any>(API + `/CheckGhim`, { headers: httpHeaders });
    }

    getDSThongDiepDetail(id_:number): any {
      const httpHeaders = this.getHTTPHeaders();
      return this.http.get<any>(API + `/getDSThongDiepDetail?id_td=${id_}`, { headers: httpHeaders });
    }
    getrandomDSThongDiep(): any {
      const httpHeaders = this.getHTTPHeaders();
      return this.http.get<any>(API + '/getRanDomDSThongDiep', { headers: httpHeaders });
    }
  
    getrandomDSLuotXem(id_:number): any {
      const httpHeaders = this.getHTTPHeaders();
      return this.http.get<any>(API + `/getDSLuotXem?id_thongdiep=${id_}`, { headers: httpHeaders });
    }

   CountLuotXem(id_:number): any {
      const httpHeaders = this.getHTTPHeaders();
      return this.http.get<any>(API + `/CountLuotXem?id_thongdiep=${id_}`, { headers: httpHeaders });
    }
   
    
    update_Ghim(id_user:number,id_thongdiep:number): Observable<any> {
      const httpHeaders = this.getHTTPHeaders();
      const url = API + `/UpdateGhim?id_user=${id_user}&id_thongdiep=${id_thongdiep}`;
      return this.http.post<any>(url, { headers: httpHeaders });
    }
    update_ThongDiep(item): Observable<any> {
      const httpHeaders = this.getHTTPHeaders();
      const url = API + '/UpdateThongDiep';
      return this.http.post<any>(url, item, { headers: httpHeaders });
    }
// InsertThongDiep(item:ThongDiepCEOModel): Observable<any> {
// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
// 	return this.http.post<any>(API + '/addThongDiep', item, { headers: httpHeaders });
// }

// Insertluotxem(item:LuotXemModel): Observable<any> {
// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
// 	return this.http.post<any>(API + '/addLuotXem', item, { headers: httpHeaders });
// }

// InsertGhim(id_user:number,id_thongdiep:number): Observable<any> {
//   const httpHeaders = this.httpUtils.getHTTPHeaders();
//   return this.http.post<any>(API + `/addGhim?id_user=${id_user}&id_thongdiep=${id_thongdiep}`, { headers: httpHeaders });
// }

// DeleteThongDiep(id_td:number): Observable<any> {
// 	const httpHeaders = this.httpUtils.getHTTPHeaders();
// 	return this.http.delete<any>(API + `/DeleteThongDiep?id_thongdiep=${id_td}`, { headers: httpHeaders });
// }

// addGhim(id_user:number,id_thongdiep:number): Observable<any> {
//   const httpHeaders = this.httpUtils.getHTTPHeaders();
//   return this.http.post<any>(API + `/addTBLGhim?id_user=${id_user}&id_thongdiep=${id_thongdiep}`, { headers: httpHeaders });
// }

// DeleteGhim(id_user:number,id_thongdiep:number): Observable<any> {
//   const httpHeaders = this.httpUtils.getHTTPHeaders();
//   return this.http.delete<any>(API + `/DeleteGhim?id_user=${id_user}&id_thongdiep=${id_thongdiep}`, { headers: httpHeaders });
// }
ngOnDestroy() {
  this.subscriptions.forEach(sb => sb.unsubscribe());
}

}
