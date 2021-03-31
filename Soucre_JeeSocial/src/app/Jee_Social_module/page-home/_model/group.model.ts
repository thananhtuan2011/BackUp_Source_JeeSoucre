import { BaseModel } from './../../../_metronic/shared/crud-table/models/base.model';


export class GroupModel extends BaseModel {

   
	// Id_BaiDang: number;
             id_group:number;
		
			ten_group:string;
		
			avatar_group:string;
			CreatedDate:Date;
			CreatedBy:number;
			UpdatedDate:Date;
			UpdatedBy:number;
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];
	
}