import { HorsesTableModule } from './horses-table/horses-table.module';
import { ManagementLayoutComponent } from './../shared/layouts/management-layout/management-layout.component';
//Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//Constants
import { RoutesConstants } from 'src/app/shared/constants';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ManagementLayoutComponent,
    children: [
      {
        path: RoutesConstants.MANAGEMENT_HORSE_INDEX,
        loadChildren: () => import('src/app/management/horses-table/horses-table.module').then(m => m.HorsesTableModule)
      },
      {
        path: RoutesConstants.INDEX,
        redirectTo: RoutesConstants.MANAGEMENT_HORSE_INDEX,
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
