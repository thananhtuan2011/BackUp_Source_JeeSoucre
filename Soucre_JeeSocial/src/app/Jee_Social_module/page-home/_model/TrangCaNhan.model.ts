import { BaseModel } from './../../../_metronic/shared/crud-table/models/base.model';



export class TrangCaNhanModel extends BaseModel {

   
	// Id_BaiDang: number;
    id_canhan:number;
		
    id_user:number;
		
    tieusu:string;
anhbia:string;
		
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];
	clear() {
		this.id_canhan=0;
		this.id_user = 0;
	
		this.tieusu = null;
        this.anhbia =null;
      
	}
}