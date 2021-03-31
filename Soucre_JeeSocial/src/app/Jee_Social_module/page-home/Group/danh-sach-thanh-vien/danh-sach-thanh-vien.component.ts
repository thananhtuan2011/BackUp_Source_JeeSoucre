import { GroupMemberService } from './../../_services/group-member.service';
import { LayoutUtilsService, MessageType } from './../../../../_metronic/core/utils/layout-utils.service';
import { GroupService } from './../../_services/group.service';

import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { merge, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { GroupDataSource } from '../group.datasource';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EditQuyenComponent } from '../edit-quyen/edit-quyen.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { QueryParamsModelNew } from '../..../../../../../_metronic/shared/crud-table';


@Component({
  selector: 'kt-danh-sach-thanh-vien',
  templateUrl: './danh-sach-thanh-vien.component.html',
  styleUrls: ['./danh-sach-thanh-vien.component.scss']
})
export class DanhSachThanhVienComponent implements OnInit {

  dataSource: GroupDataSource;
  displayedColumns: string[] = ['Username','create_date','quyen_group'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// Selection
	// selection = new SelectionModel<DepartmentModel>(true, []);
	// productsResult: DepartmentModel[] = [];
	id_menu: number = 60702;
	//=================PageSize Table=====================
	pageSize: number;
	flag: boolean = true;
  keyword: string = '';
  listUser:any[]=[];
  tam:string;
  item_11:any[]=[];
  id_phong:number;
  @Input() id_g: any;
  constructor(

    private service:GroupService,
	private service_group_member:GroupMemberService,
    private changeDetectorRefs: ChangeDetectorRef,
    // private  sharedService: SharedService,
    private layoutUtilsService: LayoutUtilsService,
    // private tokenStorage:TokenStorage,
    private route:ActivatedRoute,
	private translate: TranslateService,
	public dialog: MatDialog,

  ) { }


  Update_Quyen(item,index,indexc=-1) {
	var data = Object.assign({}, item);
	// var data = Object.assign({}, item);
	
	const dialogRef = this.dialog.open(EditQuyenComponent, { data:data,
		
		width: '500px' });
	dialogRef.afterClosed().subscribe(res => {
		if (res) {
			item.quyen = res.quyen
			this.loadDataList();
			this.changeDetectorRefs.detectChanges();
		}
		else
		{
			this.loadDataList();
			this.changeDetectorRefs.detectChanges();
		}
	});
}
  getData(){
    
    // this.sharedService.id_phongban.subscribe(sharedata => this.tam = sharedata)

    // this.id_phong=Number(this.tam );
   
  }
  public getPageSize(): Observable<string> {
	const size: string = "10";
	return of(size);
}
  LoadData() {
    // debugger
    this.service.getUserData().subscribe(res =>{
      this.item_11= res;
    });
    }
  ngOnInit() {

     
    this.route.params.subscribe(params => {
    
      this.id_g =+params.id_group;
      this.changeDetectorRefs.detectChanges();
    });
    this.LoadData();
		this.getPageSize().subscribe(res => {
			this.pageSize = +res;
		});
		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

		/* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => {
					this.loadDataList();
				})
			)
			.subscribe();
		// Init DataSource
		this.dataSource = new GroupDataSource(this.service);
		this.dataSource.entitySubject.subscribe(res =>{});
		this.loadDataList();
	}

	ngOnChanges() {
		if (this.dataSource)
			this.loadDataList();
	}

	loadDataList() {
		const queryParams = new QueryParamsModelNew(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		this.dataSource.loadList_User(this.id_g ,queryParams);
		setTimeout(x => {
			this.loadPage();
		}, 500)
	}
	loadPage() {
		var arrayData = [];
		this.dataSource.entitySubject.subscribe(res => arrayData = res);
		if (arrayData !== undefined && arrayData.length == 0) {
			var totalRecord = 0;
			this.dataSource.paginatorTotal$.subscribe(tt => totalRecord = tt)
			if (totalRecord > 0) {
				const queryParams1 = new QueryParamsModelNew(
					this.filterConfiguration(),
					this.sort.direction,
					this.sort.active,
					this.paginator.pageIndex = this.paginator.pageIndex - 1,
					this.paginator.pageSize
				);
        this.dataSource.loadList_User(this.id_g,queryParams1);
			}
			else {
				const queryParams1 = new QueryParamsModelNew(
					this.filterConfiguration(),
					this.sort.direction,
					this.sort.active,
					this.paginator.pageIndex = 0,
					this.paginator.pageSize
				);
				this.dataSource.loadList_User(this.id_g,queryParams1);
			}
		}
	}
	
	filterConfiguration(): any {

		let filter: any = {};
		if (this.keyword)
			filter.UserName = this.keyword;
		// filter.HOTEN = "My";
		return filter;
	}

	XuatFile(item: any) {
		var linkdownload = item.Link;
		window.open(linkdownload);

  }
  



  

	getHeight(): any {
		let obj = window.location.href.split("/").find(x => x == "wework");
		if (obj) {
			let tmp_height = 0;
			tmp_height = window.innerHeight - 197;
			return tmp_height + 'px';
		} else {
			let tmp_height = 0;
			tmp_height = window.innerHeight - 140;
			return tmp_height + 'px';
		}
	}
	quickEdit(item) {
		this.layoutUtilsService.showActionNotification("Updating");
	}
	updateStage(item) {
		this.layoutUtilsService.showActionNotification("Updating");
	}

}
