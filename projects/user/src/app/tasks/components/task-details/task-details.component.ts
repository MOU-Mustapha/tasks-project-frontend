import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  'taskId': string;
  'taskDetails': any;
  constructor(
    private tasksService: TasksService,
    private acRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.acRoute.params.subscribe((param) => {
      this.taskId = param['id'];
    });
  }
  ngOnInit(): void {
    this.getTaskDetails();
  }
  getTaskDetails() {
    this.tasksService.taskDetails(this.taskId).subscribe((res: any) => {
      this.taskDetails = res.tasks;
    });
  }
  complete() {
    const model: object = {
      id: this.taskId,
    };
    this.tasksService.changeTaskToComplete(model).subscribe((res: any) => {
      this.toastr.success('Task Completed Successfully');
      this.router.navigate(['/tasks']);
    });
  }
}
