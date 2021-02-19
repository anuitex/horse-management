/*-------------VENDORS-------------------*/
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

/*-------------ENUMS-------------------*/
import { ReducerNodesEnum } from 'src/app/store';

/*-------------REDUCERS-------------------*/
import { ErrorsReducer } from './errors.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ReducerNodesEnum.appErrors, ErrorsReducer),
  ]
})
export class ErrorsStoreModule { }
