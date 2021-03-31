import { TableService } from '../../../_metronic/shared/crud-table';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { MediaModel } from '../_model/media.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommentService extends TableService<MediaModel> implements OnDestroy { 
  API_URL = `/Comment`;
  public rt_insert_cmt: string = this.API_URL + '/addComment';
  public rt_insert_cmt_child: string = this.API_URL + '/addComment_chill';
  public rt_delete_cmt: string = this.API_URL;
  public rt_Update: string = this.API_URL + '/UpdateComment';
  constructor(@Inject(HttpClient) http) {
    super(http);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
