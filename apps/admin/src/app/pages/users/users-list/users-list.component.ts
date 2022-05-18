import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '@eshop/users';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  deleteUser(userId: string){}

  updateUser(userId: string) {}

  private _getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users
    })
  }

}
