import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HorseModel } from 'src/app/core/models/management';
import { HorsesTableComponent } from './../../horses-table.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  constructor(
    private dialogRef: MatDialogRef<HorsesTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HorseModel) {
  }

  remove(): void {
    this.dialogRef.close(true);
  }

  dialogClose(): void {
    this.dialogRef.close(false);
  }

}
