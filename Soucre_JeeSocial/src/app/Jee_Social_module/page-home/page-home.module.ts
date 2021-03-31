import { ActionNotificationComponent } from './../../_metronic/partials/content/crud/action-natification/action-notification.component';
import { ThongdiepService } from './thong-diep/_service_TD/thongdiep.service';
import { LayoutUtilsService } from './../../_metronic/core/utils/layout-utils.service';
import { DeleteEntityDialogComponent } from './../../_metronic/partials/content/crud/delete-entity-dialog/delete-entity-dialog.component';
import { AlertComponent } from './../../_metronic/partials/content/crud/alert/alert.component';
import { PopoverModule } from 'ngx-smart-popover';


import { FlexLayoutModule } from '@angular/flex-layout';

import { PageHomeComponent } from './page-home.component';
import { NgModule } from '@angular/core';

import { PageHomeRoutingModule } from './page-home-routing.module';
import { LoadPagePersonalComponent } from './load-page-personal/load-page-personal.component';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbDropdownModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { LoadPageHomeComponent } from './load-page-home/load-page-home.component';
import { TypePostComponent } from './load-page-home/type-post/type-post.component';
import { TinNhanhComponent } from './load-page-home/type-post/Template_LoaiBaiDang/tin-nhanh/tin-nhanh.component';
import { KhenThuongComponent } from './load-page-home/type-post/Template_LoaiBaiDang/khen-thuong/khen-thuong.component';
import { TinTucNoiBoComponent } from './load-page-home/type-post/Template_LoaiBaiDang/tin-tuc-noi-bo/tin-tuc-noi-bo.component';
import { ChaoDonThanhVienMoiComponent } from './load-page-home/type-post/Template_LoaiBaiDang/chao-don-thanh-vien-moi/chao-don-thanh-vien-moi.component';
import { ThongBaoComponent } from './load-page-home/type-post/Template_LoaiBaiDang/thong-bao/thong-bao.component';
import { BaidangEditComponent } from './load-page-home/_component/home-edit/baidang-edit/baidang-edit.component';
import { CommentEditDialogComponent } from './load-page-home/_component/comment-edit-dialog/comment-edit-dialog.component';
import { TinNhanhEditComponent } from './load-page-home/_component/home-edit/tin-nhanh-edit/tin-nhanh-edit.component';
import { ChaoDonThanhvienEditComponent } from './load-page-home/_component/home-edit/chao-don-thanhvien-edit/chao-don-thanhvien-edit.component';
import { KhenThuongEditComponent } from './load-page-home/_component/home-edit/khen-thuong-edit/khen-thuong-edit.component';
import { DeXuatComponent } from './load-page-home/type-post/Template_LoaiBaiDang/de-xuat/de-xuat.component';
import { DeXuatEditComponent } from './load-page-home/_component/home-edit/de-xuat-edit/de-xuat-edit.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { RouterModule } from '@angular/router';
import { ContentLeftComponent } from './content-left/content-left.component';
import { ThongDiepComponent } from './thong-diep/thong-diep.component';
import { UserRightComponent } from './user-right/user-right.component';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MediaComponent } from './load-page-home/media/media.component';
import { MediaTinvanbanComponent } from './load-page-home/media/media-tinvanban/media-tinvanban.component';
import { MediaDetailComponent } from './load-page-home/media/media-detail/media-detail.component';
import { ColorPickerComponent } from './load-page-home/media/color-picker/color-picker.component';
import { ClickColorDirective } from './load-page-home/type-post/Template_LoaiBaiDang/khen-thuong/click-color.directive';
import { GroupViewComponent } from './Group/group-view/group-view.component';
import { CreateGroupComponent } from './Group/create-group/create-group.component';
import { EditGroupComponent } from './Group/edit-group/edit-group.component';
import { ChooseUserComponent } from './Group/choose-user/choose-user.component';
import { InsertThanhvienComponent } from './Group/insert-thanhvien/insert-thanhvien.component';
import { VaiTroGroupComponent } from './Group/vai-tro-group/vai-tro-group.component';
import { ChooseUserInGroupComponent } from './Group/choose-user-in-group/choose-user-in-group.component';
import { QuanlygroupComponent } from './Group/quanlygroup/quanlygroup.component';
import { EditQuyenComponent } from './Group/edit-quyen/edit-quyen.component';
import { DanhSachThanhVienComponent } from './Group/danh-sach-thanh-vien/danh-sach-thanh-vien.component';
import { PopoverTriggerDirective } from './trang-ca-nhan/popover-trigger.directive';
import { TrangCaNhanComponent } from './trang-ca-nhan/trang-ca-nhan/trang-ca-nhan.component';
import { BaidangTrangcanhanComponent } from './trang-ca-nhan/baidang-trangcanhan/baidang-trangcanhan.component';
import { GioithieuComponent } from './trang-ca-nhan/gioithieu/gioithieu.component';
import { EditTieusuComponent } from './trang-ca-nhan/edit-tieusu/edit-tieusu.component';
import { UpdateAvtarComponent } from './trang-ca-nhan/update-avtar/update-avtar.component';
import { TrangCaNhanService } from './_services/trang-ca-nhan.service';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
const MY_FORMATS_EDIT: any = {
	parse: {
		dateInput: 'D/MM/YYYY'
	},
	display: {
		dateInput: 'DD/MM/YYYY',
		monthYearLabel: 'MMMM Y',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM Y'
	}
}
@NgModule({
  declarations: [
    UpdateAvtarComponent,
    EditTieusuComponent,
    TrangCaNhanComponent,
    BaidangTrangcanhanComponent,
    GioithieuComponent,
    PopoverTriggerDirective,
    DanhSachThanhVienComponent,
    ActionNotificationComponent,
    InsertThanhvienComponent,
    VaiTroGroupComponent,
    ChooseUserInGroupComponent,
    QuanlygroupComponent,
    EditQuyenComponent,
    GroupViewComponent,
	 CreateGroupComponent,
	 EditGroupComponent,
	 ChooseUserComponent,
    ClickColorDirective,
    ColorPickerComponent,
    MediaComponent,
    DeleteEntityDialogComponent,
    AlertComponent,
    PageHomeComponent,
    LoadPagePersonalComponent,
    LoadPageHomeComponent,
    TinTucNoiBoComponent,
    ChaoDonThanhVienMoiComponent, ThongBaoComponent,
    BaidangEditComponent,
    CommentEditDialogComponent,
    TinNhanhEditComponent,
    ChaoDonThanhvienEditComponent,
    KhenThuongEditComponent,
    DeXuatComponent,
    DeXuatEditComponent,
    TypePostComponent, TinNhanhComponent, KhenThuongComponent, TinTucNoiBoComponent, ChaoDonThanhVienMoiComponent, ThongBaoComponent, ContentLeftComponent, ThongDiepComponent, UserRightComponent, MediaTinvanbanComponent, MediaDetailComponent,
  ],
  entryComponents: [TypePostComponent,  TinNhanhComponent, KhenThuongComponent,MediaComponent,MediaTinvanbanComponent,
    EditGroupComponent,
    UpdateAvtarComponent,
    EditTieusuComponent,
    ActionNotificationComponent,
    EditQuyenComponent,
    InsertThanhvienComponent,
    VaiTroGroupComponent,
    TinTucNoiBoComponent,
    ChaoDonThanhVienMoiComponent, ThongBaoComponent,
    BaidangEditComponent,
    CommentEditDialogComponent,
    TinNhanhEditComponent,
    ChaoDonThanhvienEditComponent,
    KhenThuongEditComponent,
    DeXuatComponent,
    DeXuatEditComponent,
  //   EditGroupComponent,
  //   EditQuyenComponent,
  //   InsertThanhvienComponent,
  //   VaiTroGroupComponent,
  //   MediaDetailComponent,
  //   EditChatUserComponent,
  // DeleteChatUserComponent
    // ChatboxComponent
    // DeletechatComponent,
    // EditMessComponent
  
  
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'vi' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue:MY_FORMATS_EDIT},
    LayoutUtilsService ,
    ThongdiepService ,
    TrangCaNhanService
    // {provide: PERFECT_SCROLLBAR_CONFIG},
    //  {useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
  ],
  imports: [
    MatPaginatorModule,
    CommonModule,
    PageHomeRoutingModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
     InfiniteScrollModule,
    NgbModule,
    // MdePopoverModule,
    // PickerModule,
   NgxMatSelectSearchModule,
    MatChipsModule,
    MatSelectModule,
     PopoverModule,
      CommonModule,
   
      MatCardModule,
      MatIconModule,
    MatButtonModule,
    CKEditorModule,
    HttpClientModule,
      MatMenuModule,
      MatInputModule,
      MatTableModule,
      MatAutocompleteModule,
      MatRadioModule,
      // AngularEditorModule ,
      MatNativeDateModule,
      MatProgressBarModule,
      MatDatepickerModule,
      MatCardModule,
      MatPaginatorModule,
      MatSortModule,
      MatCheckboxModule,
      MatProgressSpinnerModule,
      MatSnackBarModule,
      MatTabsModule,
      MatTooltipModule,
      MatDialogModule,
      MatCardModule,
      MatBadgeModule,
      // EditorModule,
      // ng-bootstrap modules
      NgbDropdownModule,
      // NgbTabsetModule,
    NgbTooltipModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule 
    // PortletModule,
    // PickerModule,
  
    
  ]
})
export class PageHomeModule { }
