import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';``
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'luutru',
        loadChildren: () =>
          import('./../Jee_Social_module/load-luu-tru/load-luu-tru.module').then((m) => m.LoadLuuTruModule),
      },
      {
        path: 'Home',
        loadChildren: () =>
          import('./../Jee_Social_module/page-home/page-home.module').then((m) => m.PageHomeModule),
      },
      {
        path: 'page_personal/:username/:id',
        loadChildren: () =>
          import('./../Jee_Social_module/Flow-Trang-ca-nhan/flow-canhan.module').then((m) => m.FlowCanhanModule),
      },
      // {
      //   path: 'builder',
      //   loadChildren: () =>
      //     import('./builder/builder.module').then((m) => m.BuilderModule),
      // },
      // {
			// 	path: 'mynews',
			// 	loadChildren: () => import('../Jee_Social_module/page-home/media/media.module').then(m => m.MediaModule)
			// },
      // {
      //   path: 'ecommerce',
      //   loadChildren: () =>
      //     import('../modules/e-commerce/e-commerce.module').then(
      //       (m) => m.ECommerceModule
      //     ),
      // },
      // {
      //   path: 'user-management',
      //   loadChildren: () =>
      //     import('../modules/user-management/user-management.module').then(
      //       (m) => m.UserManagementModule
      //     ),
      // },
      // {
      //   path: 'user-profile',
      //   loadChildren: () =>
      //     import('../modules/user-profile/user-profile.module').then(
      //       (m) => m.UserProfileModule
      //     ),
      // },
      // {
      //   path: 'ngbootstrap',
      //   loadChildren: () =>
      //     import('../modules/ngbootstrap/ngbootstrap.module').then(
      //       (m) => m.NgbootstrapModule
      //     ),
      // },
      // {
      //   path: 'wizards',
      //   loadChildren: () =>
      //     import('../modules/wizards/wizards.module').then(
      //       (m) => m.WizardsModule
      //     ),
      // },
      // {
      //   path: 'material',
      //   loadChildren: () =>
      //     import('../modules/material/material.module').then(
      //       (m) => m.MaterialModule
      //     ),
      // },
      {
        path: '',
        redirectTo: '/Home',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
