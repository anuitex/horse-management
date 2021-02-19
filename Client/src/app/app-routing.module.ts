//Vendors
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//Constants
import { RoutesConstants } from 'src/app/shared/constants';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    children: [
      {
        path: RoutesConstants.MANAGEMENT_INDEX,
        loadChildren: () => import('src/app/management/management.module').then(m => m.ManagementModule)
      },
      {
        path: RoutesConstants.INDEX,
        redirectTo: RoutesConstants.MANAGEMENT_INDEX,
        pathMatch: 'full'
      },
      { path: '**', redirectTo: RoutesConstants.MANAGEMENT_INDEX },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
