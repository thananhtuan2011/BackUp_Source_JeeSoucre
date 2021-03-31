import { BaseModel } from './../../../_metronic/shared/crud-table/models/base.model';

export class MediaModel extends BaseModel {

 
	// Id_BaiDang: number;
    ID_media:number;
		
    createdby:number;
    template:string;
    hinhanh	:string;
    base64:string;
    title:string;
    createdate:Date;
			
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];

}