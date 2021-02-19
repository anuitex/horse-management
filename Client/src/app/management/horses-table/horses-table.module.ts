import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { RoutesConstants } from 'src/app/shared/constants';
import { CreateAndEditComponent } from './components/create-and-edit/create-and-edit.component';
import { HorsesTableComponent } from './horses-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SexPipe } from 'src/app/shared/pipes/sex.pipe';
import { DeleteComponent } from './components/delete/delete.component';


const COMPONENTS = [
  CreateAndEditComponent,
  DeleteComponent,
  HorsesTableComponent
]

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: HorsesTableComponent
  }
];

const MATERIALS = [
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatIconModule,
  ReactiveFormsModule,
  FormsModule,
  MatPaginatorModule,
  MatDialogModule,
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatSelectModule
]

@NgModule({
  declarations: [
    COMPONENTS,
    SexPipe

  ],
  imports: [
    MATERIALS,
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class HorsesTableModule { }
