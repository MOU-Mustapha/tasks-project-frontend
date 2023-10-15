import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksAdminRoutingModule } from './tasks-admin-routing.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AddTaskComponent, ListTasksComponent, ConfirmComponent],
  imports: [
    CommonModule,
    TasksAdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
  ],
})
export class TasksAdminModule {}
