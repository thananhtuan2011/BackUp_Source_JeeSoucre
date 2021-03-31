import { BaseDataSource } from './../../../_metronic/shared/crud-table/models/_base.datasource';

import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { GroupService } from '../_services/group.service';
import { QueryParamsModelNew, QueryResultsModel } from '../../../_metronic/shared/crud-table';


export class GroupDataSource extends BaseDataSource {
	[x: string]: any;
	constructor( private _service:GroupService,) {
       
		super();
	}

	
	
	 loadList(id:number) {
	// 	// this._service.lastFilter$.next(queryParams);
	
	// 	// this.loadingSubject.next(true);
		
	// 	// this._service.getList(id)
	// 	// 	.pipe(
	// 	// 		tap((resultFromServer:any) => {
	// 	// 			this.entitySubject.next(resultFromServer.Data);
	// 	// 			// var totalCount = resultFromServer.page.TotalCount || (resultFromServer.page.AllPage * resultFromServer.page.Size);
	// 	// 			// this.paginatorTotalSubject.next(totalCount);
	// 	// 		}),
	// 	// 		// catchError(err => of(new QueryResultsModel([], err))),
	// 	// 		finalize(() => this.loadingSubject.next(false))
	// 	// 	).subscribe(res => {
	// 	// 	});
			
 }


 loadList_User(id:number,queryParams: QueryParamsModelNew) {
    this._service.lastFilter$.next(queryParams);
    this.loadingSubject.next(true);
    
    this._service.getList_User(id,queryParams,this._service.rt_getList_User)
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
