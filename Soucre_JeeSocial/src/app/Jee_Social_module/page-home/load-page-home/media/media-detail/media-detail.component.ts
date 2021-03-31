import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MediaService } from '../../../_services/media.service';


@Component({
  selector: 'app-media-detail',
  templateUrl: './media-detail.component.html',
  styleUrls: ['./media-detail.component.scss']
})
export class MediaDetailComponent implements OnInit {

  id_memdia:number;
  listmedia:any[]=[];
  media: any = {};
  listid_media:any[]=[];
  i:number=0;
  sort=false;
  sort_right=true;
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _service_media:MediaService,
      private changeDetectorRefs: ChangeDetectorRef,
    ) { }
  
  
    LoadData()
  
    {
      this._service_media.getlistMyMediaDetail(this.media).subscribe(res=>{
        this.listmedia=res.data;
        // this.i=this.listmedia[0].id_media;
        // this.sort=true;
        this.changeDetectorRefs.detectChanges();
      })
    }
    getId_Media()
    {
      
      this._service_media.getlistIDMedia().subscribe(res=>{
        this.listid_media=res.data;
    
        this.changeDetectorRefs.detectChanges();
      })
    }
  
    LoadSort()
    {    
        if(this.i>= this.listid_media.length-1)
        {this.sort_right=false;
            return;
        }
        else
  
        {
          this.i+=1;
          this._service_media.getlistMyMediaDetail(this.listid_media[this.i].id_media).subscribe(res=>{
            this.listmedia=res.data;
            this.sort=true;
            this.changeDetectorRefs.detectChanges();
          })
        }
          
    
    }
    BackSort()
    {  
     
      if((this.i)<=0)
      {  this.sort=false;
        this.sort_right=true;
          return;
        
      }
      else
  
      {
        this.i-=1;
        this._service_media.getlistMyMediaDetail(this.listid_media[this.i].id_media).subscribe(res=>{
          this.listmedia=res.data;
          this.sort_right=true;
          this.changeDetectorRefs.detectChanges();
        })
      }
         
    
    }
    ngOnInit() {
      this.media=this.data.id_media;
      this.changeDetectorRefs.detectChanges();
      this.LoadData();
      this.getId_Media();
     
    }
  

}
