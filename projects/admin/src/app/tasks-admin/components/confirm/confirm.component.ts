import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmComponent>
  ) {}
  confirm() {
    this.dialog.closeAll();
  }
  close() {
    this.dialogRef.close();
  }
}
