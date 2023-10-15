import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    SharedModule,
    MaterialModule,
    NgxPaginationModule,
  ],
})
export class ManageUsersModule {}
