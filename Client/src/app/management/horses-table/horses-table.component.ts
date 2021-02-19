import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
//Enums
import { Sex } from 'src/app/core/enums';
import { BaseResponseModel } from 'src/app/core/models';
//Models
import {
  HorseModel,
  RequestSearchHorseModel,
  RequestUpdateHorsesModel,
  ResponseSearchHorsesModel,
} from 'src/app/core/models/management';
//Providers
import { SubscriptionsProvider } from 'src/app/core/providers/subscription.provider';
//Services
import { WebSocketService } from 'src/app/core/services/web-socket.service';
//Store
import * as horseActions from '../store/management.actions';
import * as horseSelectors from '../store/management.selectors';
//Components
import { CreateAndEditComponent } from './components/create-and-edit/create-and-edit.component';
import { DeleteComponent } from './components/delete/delete.component';


const PAGE_SIZE_OPTIONS: number[] = [7, 20, 40];
const COLUMNS: string[] = ['name', 'heartsRate', 'dateOfBirth', 'sex', 'pregnant', 'dueDate', 'actions'];

@AutoUnsubscribe()

@Component({
  selector: 'app-horses-table',
  templateUrl: './horses-table.component.html',
  styleUrls: ['./horses-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorsesTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private horseHeartRate: string[];
  private subscriptionsStore: Subscription;

  dataSource: MatTableDataSource<HorseModel>;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  totalItems: number;
  searchInputValue: string;
  displayedColumns: string[];
  isDataEmpty: boolean;
  constructor(
    private store$: Store,
    private dialog: MatDialog,
    private toaster: ToastrService,
    private readonly webSocketService: WebSocketService,
    private readonly subscriptionsProvider: SubscriptionsProvider,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptionsStore = new Subscription();
    this.initializationSelects();
    this.initializationVariables();
  }

  ngOnInit(): void {
    this.store$.dispatch(horseActions.connectAction())
    this.search();
    this.changeDetectorRef.detectChanges()

  }

  private initializationVariables(): void {
    this.displayedColumns = COLUMNS;
    this.horseHeartRate = [];
    this.dataSource = new MatTableDataSource<HorseModel>();
    this.dataSource.paginator = this.paginator;
    this.subscriptionsProvider.setSearchSubscription().subscribe(() => {
      this.paginator.firstPage()
      this.search();
    });
  }

  private initializationSelects(): void {
    this.subscriptionsStore.add(this.store$.pipe(select(horseSelectors.horseManagementTableSelector))
      .subscribe((data: ResponseSearchHorsesModel) => {
        this.initialAfterGet(data)
      }
      ));
    this.subscriptionsStore.add(this.store$.pipe(select(horseSelectors.getHeartSelector))
      .subscribe((data) => {
        if (!data) return;
        Object.keys(data)?.forEach(id => {
          this.dataSource.data = this.dataSource.data?.map(arrayElement => {
            if (arrayElement.id === id) {
              arrayElement = { ...arrayElement, heartsRate: data[id].heart[data[id].heart.length - 1], isWarning: data[id].warning };
              console.log(arrayElement.heartsRate);
              if (arrayElement.pregnant && arrayElement.isWarning) {
                this.toaster.warning(`pay attention to ${arrayElement.name}`)
              }
            }
            return arrayElement;
          });
        })
      }));

    this.subscriptionsStore.add(this.store$.pipe(select(horseSelectors.horseDeletedSelector))
      .subscribe((res: BaseResponseModel) => {
        if (res?.isSuccessful) {
          this.toaster.success(res.message);
          this.search();
        }
      }));
  }

  getNotActive(element: HorseModel): boolean{
    return !this.horseHeartRate.includes(element.id)
  }

  getHorsesHeartRate(id: string): void {
    this.horseHeartRate.push(id)
    this.webSocketService.sendMessage({ items: this.horseHeartRate })
  }

  getValueColumnsForMale(element: HorseModel): HorseModel {
    if (element.sex === Sex.Female) {
      return { ...element, pregnant: element.pregnant ? "Yes" : "No", dueDate: element.pregnant && element.dueDate ? element.dueDate : "-" };

    }
    return { ...element, pregnant: "-", dueDate: "-" }
  }



  getHearRate(element: ResponseSearchHorsesModel): void {

  }

  searchInput(value: string): void {
    this.subscriptionsProvider.searchNext(value);
  }


  search(): void {
    let requestModel: RequestSearchHorseModel = this.completionModelBeforeGet();
    this.store$.dispatch(horseActions.searchHorseAction({ req: requestModel }));
  }

  openDialogHorse(horse?: RequestUpdateHorsesModel): void {
    const horseModel: RequestUpdateHorsesModel = { ...horse };

    const dialogRef = this.dialog.open(CreateAndEditComponent, {
      width: '32%',
      data: horse ? horseModel : undefined
    });

    dialogRef.afterClosed().subscribe((resultDialog) => {
      if (!resultDialog) return;

      this.search();
    });
  }

  deleteHorse(horse: HorseModel): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '32%',
      data: horse
    });
    dialogRef.afterClosed().subscribe((resultDialog) => {
      if (!resultDialog) return;
      this.store$.dispatch(horseActions.initialState());
      this.store$.dispatch(horseActions.deleteHorseAction({ horseId: horse.id }))
    });
  }

  private completionModelBeforeGet(): RequestSearchHorseModel {
    let model: RequestSearchHorseModel = {
      page: this.paginator.pageIndex + 1,
      pageSize: this.paginator.pageSize || this.pageSizeOptions[0],
    };
    return model;
  }

  private initialAfterGet(data: ResponseSearchHorsesModel): void {
    if (data == null) {
      return;
    }
    this.isDataEmpty = data.isDataEmpty;
    this.dataSource.data = data.items;
    this.totalItems = data.total;
    this.paginator.length = data.total;

    setInterval(() => {

    }, 3000)
  }

  ngOnDestroy() {
    this.webSocketService.disconnect();
  }


}
