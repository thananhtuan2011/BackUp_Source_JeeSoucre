import { GroupService } from './../_services/group.service';
import { QueryParamsModelNew, QueryResultsModel } from './../../../_metronic/shared/crud-table/models/table.model';
import { BaseDataSource } from './../../../_metronic/shared/crud-table/models/_base.datasource';

import { BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
// import { DashboardService } from '../dashboard.service';


export class QuanLyBaiDangGroupDataSource extends BaseDataSource {
	entitySubject = new BehaviorSubject<any[]>([]);
    loadingSubject = new BehaviorSubject<boolean>(false);
	constructor(private _service: GroupService) {
		super();
	}

	
	

	loadList_BaiDang(id_gr:number,queryParams: QueryParamsModelNew) {
		this._service.lastFilter$.next(queryParams);
		this.loadingSubject.next(true);
		
		this._service.findData_BaiDangGroup(id_gr,queryParams,this._service.rt_findData_BaiDangGroup)
			.pipe(
				tap(resultFromServer => {
					this.entitySubject.next(resultFromServer.data);
					var totalCount = resultFromServer.page.TotalCount || (resultFromServer.page.AllPage * resultFromServer.page.Size);
					this.paginatorTotalSubject.next(totalCount);
				}),
				catchError(err => of(new QueryResultsModel([], err))),
				finalize(() => this.loadingSubject.next(false))
			).subscribe(res => {
			});
	}
}
