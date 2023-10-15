import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'title',
    'user',
    'deadLineDate',
    'status',
    'actions',
  ];
  'dataSource': any;
  'page': number = 1;
  'userData': any;
  selectedStatus: string = 'In-Progress';
  'total': number;
  constructor(
    private tasksService: TasksService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getUserTotalItems();
    this.getUserTasks();
  }
  getUserTotalItems() {
    let param = {
      page: '',
      limit: '',
      status: this.selectedStatus,
    };
    this.tasksService
      .getUserTasks(JSON.parse(localStorage.getItem('userId')!), param)
      .subscribe((res: any) => {
        this.total = res.tasks.length;
      });
  }
  getUserTasks() {
    let param = {
      page: this.page,
      limit: 8,
      status: this.selectedStatus,
    };
    this.tasksService
      .getUserTasks(JSON.parse(localStorage.getItem('userId')!), param)
      .subscribe(
        (res: any) => {
          this.dataSource = res.tasks;
        },
        (err) => {
          this.dataSource = [];
        }
      );
  }
  changePage(event: any) {
    this.page = event;
    this.getUserTasks();
  }
  complete(id: string) {
    const model: object = {
      id,
    };
    this.tasksService.changeTaskToComplete(model).subscribe((res: any) => {
      this.getUserTotalItems();
      this.getUserTasks();
      this.toastr.success('Task Completed Successfully');
    });
  }
}
