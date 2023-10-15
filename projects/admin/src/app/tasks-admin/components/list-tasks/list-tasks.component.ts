import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { UsersService } from '../../../manage-users/services/users.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  'users': any[] = [];
  'status': any[] = [{ name: 'Complete' }, { name: 'In-Progress' }];
  displayedColumns: string[] = [
    'position',
    'title',
    'username',
    'deadline',
    'status',
    'actions',
  ];
  dataSource: any[] = [];
  'timeOut': any;
  page: number = 1;
  'total': number;
  filtration: any = {
    page: this.page,
    limit: 10,
  };
  constructor(
    private tasksService: TasksService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private userService: UsersService
  ) {
    this.getUsersDataFromBehaviorSubject();
  }
  ngOnInit(): void {
    this.getTasks();
    this.getAllUsers();
  }
  getTasks() {
    this.tasksService.getAllTasks(this.filtration).subscribe((res: any) => {
      this.dataSource = this.getUserName(res.tasks);
      this.total = res.totalItems;
    });
  }
  getUserName(data: any[]) {
    let newTasks = data.map((task) => {
      return {
        ...task,
        username: task.userId.username,
      };
    });
    return newTasks;
  }
  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '800px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTasks();
      }
    });
  }
  delete(id: number) {
    this.tasksService.deleteTask(id).subscribe((res: any) => {
      this.getTasks();
      this.toastr.success('Task Deleted Successfully');
    });
  }
  update(element: any) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '800px',
      data: element,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTasks();
      }
    });
  }
  getAllUsers() {
    this.userService.getUsers();
  }
  getUsersDataFromBehaviorSubject() {
    this.userService.userData.subscribe((res) => {
      this.users = res.data;
    });
  }
  keywordSearch(event: any) {
    this.filtration.keyword = event.target.value;
    this.page = 1;
    this.filtration.page = 1;
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.getTasks();
    }, 1000);
  }
  userSearch(event: any) {
    this.filtration.userId = event.value;
    this.page = 1;
    this.filtration.page = 1;
    this.getTasks();
  }
  statusSearch(event: any) {
    this.filtration.status = event.value;
    this.page = 1;
    this.filtration.page = 1;
    this.getTasks();
  }
  date(event: any, type: string) {
    let date = formatDate(event.target.value, 'dd-MM-YYYY', 'en-US', '');
    this.filtration[type] = date;
    this.page = 1;
    this.filtration.page = 1;
    if (type === 'toDate' && this.filtration.toDate !== '01-01-1970') {
      this.getTasks();
    }
  }
  changePage(event: any) {
    this.page = event;
    this.filtration.page = event;
    this.getTasks();
  }
}
