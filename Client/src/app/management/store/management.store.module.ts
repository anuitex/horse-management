/*-------------VENDORS-------------------*/
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/store';
import { ManagementEffects } from './management.effects';
import { ManagementReducer } from './management.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ReducerNodesEnum.management, ManagementReducer),
    EffectsModule.forFeature([ManagementEffects]),
  ]
})
export class ManagementStoreModule { }
