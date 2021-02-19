import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BaseResponseModel } from 'src/app/core/models';
import { RequestUpdateHorsesModel } from 'src/app/core/models/management';
import { ManagementService } from 'src/app/core/services/management.service';
import { WebSocketService } from 'src/app/core/services/web-socket.service';
import { errorAction } from 'src/app/store/errors/error.actions';
import { RequestCreateHorseModel } from './../../core/models/management/request/request-create-horse.model';
import { RequestSearchHorseModel } from './../../core/models/management/request/request-search-horse.model';
import { ResponseSearchHorsesModel } from './../../core/models/management/response/response-search-horses.model';
import * as managementActions from './management.actions';

@Injectable()
export class ManagementEffects {
  constructor(private actions$: Actions,
    private webSocketService: WebSocketService,
    private managementService: ManagementService) { }

  @Effect()
  searchHorse$ = this.actions$.pipe(
    ofType(managementActions.searchHorseAction),
    switchMap((action) => {
      const model: RequestSearchHorseModel = action.req
      return this.managementService.search(model).pipe(
        map((data: ResponseSearchHorsesModel) => {
          return managementActions.searchHorseSuccessAction({ res: data });
        }),
        catchError(error => {
          return of(errorAction(error))
          return throwError(error);
        })
      );
    })
  );

  @Effect()
  editHorse$ = this.actions$.pipe(
    ofType(managementActions.editHorseAction),
    switchMap((action) => {
      const model: RequestUpdateHorsesModel = action
      return this.managementService.edit(model).pipe(
        map((data: BaseResponseModel) => {
          return managementActions.editHorseSuccessAction({ res: data });
        }),
        catchError(error => {
          return of(errorAction(error))
        })
      );
    })
  );

  @Effect()
  addHorse$ = this.actions$.pipe(
    ofType(managementActions.createHorseAction),
    switchMap((action) => {
      const model: RequestCreateHorseModel = action
      return this.managementService.create(model).pipe(
        map((data: BaseResponseModel) => {
          return managementActions.createHorseSuccessAction({ res: data });
        }),
        catchError(error => {
          return of(errorAction(error))
        })
      );
    })
  );

  @Effect()
  deleteHorse$ = this.actions$.pipe(
    ofType(managementActions.deleteHorseAction),
    switchMap((action) => {
      const id: string = action.horseId
      return this.managementService.delete(id).pipe(
        map((data: BaseResponseModel) => {
          return managementActions.deleteHorseSuccessAction({ res: data });
        }),
        catchError(error => {
          return of(errorAction(error))
        })
      );
    })
  );

  @Effect()
  getTransactions$ = this.actions$.pipe(ofType(managementActions.connectAction),
    map((action: any) => action.payload),
    switchMap(payload =>
      this.webSocketService.setupSocketConnection().pipe(
        map(
          result => {
            const  {type, ...res} =  result
            return managementActions.connectSuccessAction(res)
          }
        )
      )));
}
