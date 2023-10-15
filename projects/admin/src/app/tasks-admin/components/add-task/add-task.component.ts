import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { UsersService } from '../../../manage-users/services/users.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  users: any[] = [];
  'newTaskForm': FormGroup;
  'fileName': string;
  'showUpdateImage': boolean = true;
  'formValues': any;
  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private toastr: ToastrService,
    private userService: UsersService,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public element: any,
    public dialog: MatDialog
  ) {
    this.newTaskForm = this.formBuilder.group({
      title: [
        this.element?.title || '',
        [Validators.required, Validators.minLength(5)],
      ],
      userId: [this.element?.userId?._id || '', Validators.required],
      image: [this.element?.image || '', Validators.required],
      description: [this.element?.description || '', Validators.required],
      deadline: [
        this.element
          ? new Date(
              this.element?.deadline.split('-').reverse().join('-')
            ).toISOString()
          : '',
        Validators.required,
      ],
    });
    this.formValues = this.newTaskForm.value;
    this.getUsersDataFromBehaviorSubject();
  }
  selectImage(event: any) {
    this.showUpdateImage = false;
    this.fileName = event.target.files[0].name;
    this.newTaskForm.patchValue({
      image: event.target.files[0],
    });
  }
  createTask() {
    let newDate = formatDate(
      this.newTaskForm.get('deadline')?.value,
      'dd-MM-YYYY',
      'en-US',
      ''
    );
    let formData = new FormData();
    Object.entries(this.newTaskForm.value).forEach(([key, value]: any) => {
      if (key == 'deadline') {
        formData.append(key, newDate);
      } else {
        formData.append(key, value);
      }
    });
    this.tasksService.createNewTask(formData).subscribe((res: any) => {
      this.toastr.success('Task Created Successfully');
      this.dialogRef.close(true);
    });
  }
  updateTask() {
    let newDate = formatDate(
      this.newTaskForm.get('deadline')?.value,
      'd-MM-YYYY',
      'en-US',
      ''
    );
    let formData = new FormData();
    Object.entries(this.newTaskForm.value).forEach(([key, value]: any) => {
      if (key == 'deadline') {
        formData.append(key, newDate);
      } else {
        formData.append(key, value);
      }
    });
    this.tasksService
      .updateTask(formData, this.element._id)
      .subscribe((res: any) => {
        this.toastr.success('Task Updated Successfully');
        this.dialogRef.close(true);
      });
  }
  closeDialog() {
    let isChanges = false;
    Object.keys(this.formValues).forEach((item: any) => {
      if (this.formValues[item] !== this.newTaskForm.value[item]) {
        isChanges = true;
      }
    });
    if (isChanges) {
      const dialogRef = this.dialog.open(ConfirmComponent, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe((result) => {});
    } else {
      this.dialogRef.close();
    }
  }
  getUsersDataFromBehaviorSubject() {
    this.userService.userData.subscribe((res) => {
      this.users = res.data;
    });
  }
}
