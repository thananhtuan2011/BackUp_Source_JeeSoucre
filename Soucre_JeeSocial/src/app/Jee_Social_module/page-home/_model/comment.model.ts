
import { BaseModel } from './../../../_metronic/shared/crud-table';
export class CommentModel extends BaseModel {
	// Id_BaiDang: number;
			id_cmt:number;
			ID_BaiDang:number;
			NoiDung_cmt:string;
			id_cmt_parent:number
			typepost:number;
			CreatedDate:Date;
			CreatedBy:number;
			UpdatedDate:Date;
			UpdatedBy:number;
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];

}