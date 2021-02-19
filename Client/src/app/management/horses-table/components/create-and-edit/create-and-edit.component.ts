import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Sex } from 'src/app/core/enums';
import { BaseResponseModel } from 'src/app/core/models';
import {
  RequestCreateHorseModel, RequestUpdateHorsesModel
} from 'src/app/core/models/management';
import { fadeDownItem } from 'src/app/shared/animation/animated-ngif';
import * as horseActions from "../../../store/management.actions";
import * as horseSelectors from "../../../store/management.selectors";
import { HorsesTableComponent } from './../../horses-table.component';

type FormGroupHorseTyped = FormGroupTyped<RequestUpdateHorsesModel | RequestCreateHorseModel>;
interface SexOptionItem {
  value: Sex;
  title: string;
}

const SEX_OPTIONS: SexOptionItem[] = [
  { value: Sex.Female, title: Sex[Sex.Female] },
  { value: Sex.Male, title: Sex[Sex.Male] }
];
const PREGNANT_OPTIONS = [
  { value: true, title: "Yes" },
  { value: false, title: "No" }
];
// @AutoUnsubscribe()

@Component({
  selector: 'app-create-and-edit',
  templateUrl: './create-and-edit.component.html',
  styleUrls: ['./create-and-edit.component.scss'],
  animations: [fadeDownItem]

})
export class CreateAndEditComponent implements OnInit, OnDestroy {
  startDate: Date;
  formGroupHorse: FormGroupHorseTyped;
  submitted: boolean;
  stateViewPassword: boolean;
  sexOptions: SexOptionItem[];
  pregnantOptions;
  subscriptionsStore: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store,
    private toaster: ToastrService,
    private dialogRef: MatDialogRef<HorsesTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestUpdateHorsesModel | undefined,
  ) {
    this.subscriptionsStore = new Subscription();
    this.initializationSelects()
    this.buildForm();
  }


  ngOnInit(): void {
    if (this.getEditHorse) {
      this.setHorseEdit(this.data);
    }
    this.startDate = new Date(new Date().getFullYear() - 40, 0, 1);
    this.sexOptions = SEX_OPTIONS;
    this.pregnantOptions = PREGNANT_OPTIONS;
  }

  get formControl(): { [key: string]: AbstractControl } { return this.formGroupHorse.controls; }
  get getEditHorse(): boolean { return Boolean(this.data); }
  get getIsFemale(): boolean { return this.formControl.sex.value === Sex.Female }

  private get isFormValid(): boolean {
    this.submitted = true;
    return this.formGroupHorse.valid;
  }

  private initializationSelects(): void {
    this.subscriptionsStore.add(this.store$.pipe(select(horseSelectors.horseCreatedSelector))
      .subscribe((res: BaseResponseModel) => {
        if (res?.isSuccessful) {
          this.dialogRef.close(true);
          this.toaster.success(res.message)
        }
      }
      ));
    this.subscriptionsStore.add(this.store$.pipe(select(horseSelectors.horseEditedSelector))
      .subscribe((res: BaseResponseModel) => {
        if (res?.isSuccessful) {
          this.dialogRef.close(true);
          this.toaster.success(res.message)
        }
      }
      ));
  }

  private clearValidation(): void {
    if (this.formControl.sex.value === Sex.Male) {
      this.submitted = true;
      this.formControl.pregnant.setErrors(null);
      this.formControl.dueDate.setValidators(null);
      this.formControl.dueDate.setErrors(null);
    }
    if (!this.formControl.pregnant.value) {
      this.formControl.dueDate.setValidators(null);
      this.formControl.dueDate.setErrors(null);
    }
  }

  create(): void {
    this.setTouchedFormControls();
    this.clearValidation();

    if (!this.isFormValid) return;

    let requestModel: RequestCreateHorseModel = {
      name: this.setFirstLetterUppercase(this.formControl.name.value),
      dateOfBirth: this.formControl.dateOfBirth.value,
      sex: this.formControl.sex.value,
      pregnant: this.formControl.pregnant.value,
      dueDate: this.formControl.dueDate.value
    };
    this.store$.dispatch(horseActions.createHorseAction(requestModel))
  }

  edit(): void {
    this.setTouchedFormControls();
    this.clearValidation();

    if (!this.isFormValid) return;

    let requestModel: RequestUpdateHorsesModel = {
      id: this.data.id,
      name: this.setFirstLetterUppercase(this.formControl.name.value),
      dateOfBirth: this.formControl.dateOfBirth.value,
      sex: this.formControl.sex.value,
      pregnant: this.formControl.pregnant.value,
      dueDate: this.formControl.dueDate.value
    };
    this.store$.dispatch(horseActions.editHorseAction(requestModel));

  }

  showPassword(): void {
    this.stateViewPassword = !this.stateViewPassword;
  }

  dialogClose(): void {
    this.dialogRef.close(false);
  }

  private buildForm(): void {
    this.formGroupHorse = this.formBuilder.group({
      name: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      pregnant: [null, [Validators.required]],
      dueDate: [null, [Validators.required]]
    }) as FormGroupHorseTyped;
  }

  private setHorseEdit(data: RequestUpdateHorsesModel): void {
    if (this.getEditHorse) {
      this.formGroupHorse.controls.name.setValue(data.name);
      this.formGroupHorse.controls.dateOfBirth.setValue(new Date(data.dateOfBirth));
      this.formGroupHorse.controls.sex.setValue(data.sex);
      this.formGroupHorse.controls.pregnant.setValue(data.pregnant);
      this.formGroupHorse.controls.dueDate.setValue(data.dueDate);
    }
  }

  private setTouchedFormControls(): void {
    this.formGroupHorse.markAllAsTouched();
  }

  private setFirstLetterUppercase(value: string): string {
    return value.charAt(0).toLocaleUpperCase() + value.substring(1).toLocaleLowerCase();
  }

  ngOnDestroy(): void {
    //is required for auto unsubscribe
  }
}
