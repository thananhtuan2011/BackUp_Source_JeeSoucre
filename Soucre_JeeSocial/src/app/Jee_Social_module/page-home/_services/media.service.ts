import { TableService } from '../../../_metronic/shared/crud-table';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { MediaModel } from '../_model/media.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MediaService extends TableService<MediaModel> implements OnDestroy { 
  API_URL = `/media`;
  public rt_loadmedia: string = this.API_URL + '/GetDSMedia';
  constructor(@Inject(HttpClient) http) {
    super(http);
  }
  

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
