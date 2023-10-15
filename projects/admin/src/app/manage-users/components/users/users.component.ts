import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { changeUserStatus } from '../../../models/interfaces';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'username',
    'email',
    'assignedTasks',
    'actions',
  ];
  'dataSource': any;
  'page': number = 1;
  'total': number;
  filtration: any = {
    page: this.page,
    limit: 10,
    name: '',
  };
  'timeOut': any;
  constructor(
    private userService: UsersService,
    private taostr: ToastrService
  ) {
    this.getUsersDataFromBehaviorSubject();
  }
  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getUsers(this.filtration);
  }
  getUsersDataFromBehaviorSubject() {
    this.userService.userData.subscribe((res: any) => {
      this.dataSource = res.data;
      this.total = res.total;
    });
  }
  changePage(event: any) {
    this.page = event;
    this.getAllUsers();
  }
  deleteUser(element: any) {
    if (element.assignedTasks === 0) {
      this.userService.deleteUser(element._id).subscribe((res: any) => {
        this.taostr.success('User Deleted Successfully');
        this.getAllUsers();
      });
    } else {
      this.taostr.info(
        'This User Have Tasks To Do',
        'You Can Not Delete This User'
      );
    }
  }
  changeUserStatus(element: any) {
    if (element.assignedTasks === 0) {
      const model: changeUserStatus = {
        id: element._id,
        status: element.status,
      };
      this.userService.changeUserStatus(model).subscribe((res: any) => {
        this.taostr.success('Status Changed Successfully');
        this.getAllUsers();
      });
    } else {
      this.taostr.info(
        'This User Have Tasks To Do',
        'You Can Not Change The Status'
      );
    }
  }
  search(event: any) {
    this.filtration.name = event.target.value;
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.getAllUsers();
    }, 1000);
  }
}
