import { BaseModel } from './../../../_metronic/shared/crud-table/models/base.model';


export class ThongBaoModel extends BaseModel {

   
	// Id_BaiDang: number;
    id_thongbao:number;
		
    title:string;
    id_bd:number;
    id_cmt	:number;
    create_tb_by:number;
    timetb:Date;
			
    // Users: Array<BaiDangUser> = [];
	// Follower: Array<TopicUserModel> = [];
	// Attachments: Array<FileUploadModel> = [];
	
}