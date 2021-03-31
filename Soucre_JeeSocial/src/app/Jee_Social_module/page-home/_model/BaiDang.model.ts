import { BaseModel } from './../../../_metronic/shared/crud-table';

export class BaiDangModel extends BaseModel {
	Id_BaiDang: number;
	id_loaibaidang: number;
	Id_Group:number;
	title: string;
	NoiDung: string;
	typepost: string;
	CreatedDate:Date;
	CreatedBy: number;
     id_khenthuong: number;
    UpdateDate:Date;
    UpdateBy:number;
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];

}