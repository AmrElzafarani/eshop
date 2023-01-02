import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '@eshop/users';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  totalUsers = 0;
  usersPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(userId: string){
    console.log(userId)
  }

  updateUser(userId: string) {
    console.log(userId)

  }

  private _getUsers() {
    this.usersService.getUsers(this.usersPerPage, this.currentPage).subscribe((users) => {
      this.users = users.message;
      this.totalUsers = users.total
    })
  }

  handlePagination(pageData:any) {
    this.currentPage = pageData.page + 1
    this.usersPerPage = pageData.rows
    this._getUsers();
  }

}
