import { GroupingState } from './grouping.model';
import { PaginatorState } from './paginator.model';
import { SortState } from './sort.model';

export interface ITableState {
  filter: {};
  paginator: PaginatorState;
  sorting: SortState;
  searchTerm: string;
  grouping: GroupingState;
  entityId: number | undefined;
}

export class QueryParamsModel {
	// fields
	filter: any;
	sortOrder: string; // asc || desc
	sortField: string;
	pageNumber: number;
	pageSize: number;

	// constructor overrides
	constructor(_filter: any,
		           _sortOrder: string = 'asc',
		           _sortField: string = '',
		           _pageNumber: number = 0,
		           _pageSize: number = 10) {
		this.filter = _filter;
		this.sortOrder = _sortOrder;
		this.sortField = _sortField;
		this.pageNumber = _pageNumber;
		this.pageSize = _pageSize;
	}
}
export class QueryParamsModelNew {
  // fields
  filter: any;
  sortOrder: string; // asc || desc
  sortField: string;
  pageNumber: number;
  pageSize: number;
  more: boolean;

  // constructor overrides
  constructor(_filter: any,
    _sortOrder: string = 'asc',
    _sortField: string = '',
    _pageNumber: number = 0,
    _pageSize: number = 10,
    _more: boolean = false) {
    this.filter = _filter;
    this.sortOrder = _sortOrder;
    this.sortField = _sortField;
    this.pageNumber = _pageNumber;
    this.pageSize = _pageSize;
    this.more = _more;
  }
}
	
export class QueryParamsModelNewLazy {
  // fields
  filter: any;
  sortOrder: string; // asc || desc
  sortField: string;
  pageNumber: number;
  pageSize: number;
  more: boolean;

  // constructor overrides
  constructor(_filter: any,
    _sortOrder: string = 'asc',
    _sortField: string = '',
    _pageNumber: number,
    _pageSize: number,
    _more: boolean = false) {
    this.filter = _filter;
    this.sortOrder = _sortOrder;
    this.sortField = _sortField;
    this.pageNumber = _pageNumber;
    this.pageSize = _pageSize;
    this.more = _more;
  }
}

export class QueryResultsModel {
	// fields
	// items: any[];
	// totalCount: number;
	// errorMessage: string;
	data: any[];
	page: any;
	items: any[];
	totalCount: number;
	errorMessage: string;
	status: number;
	Visible:boolean;

	constructor(_items: any[] = [], _totalCount: number = 0, _errorMessage: string = '') {
		this.items = _items;
		this.totalCount = _totalCount;
	}
}

export interface TableResponseModel<T> {
  items: T[];
  total: number;
}

export interface ICreateAction {
  create(): void;
}

export interface IEditAction {
  edit(id: number): void;
}

export interface IDeleteAction {
  delete(id: number): void;
}

export interface IDeleteSelectedAction {
  grouping: GroupingState;
  ngOnInit(): void;
  deleteSelected(): void;
}

export interface IFetchSelectedAction {
  grouping: GroupingState;
  ngOnInit(): void;
  fetchSelected(): void;
}

export interface IUpdateStatusForSelectedAction {
  grouping: GroupingState;
  ngOnInit(): void;
  updateStatusForSelected(): void;
}

