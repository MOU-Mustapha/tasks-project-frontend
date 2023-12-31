import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    ListTasksComponent,
    TaskDetailsComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    NgxPaginationModule,
    SharedModule,
    MaterialModule
  ]
})
export class TasksModule { }
