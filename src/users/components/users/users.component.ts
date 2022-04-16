import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers()
      .subscribe((data: User[]) =>
        this.users = data
      );
  }

  onRemove(userId: number) {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    this.users.splice(userIndex, 1);
  }

  obfuscateEmail(userId: number) {
    this.users = this.usersService.obfuscateEmail(this.users, userId);
  }
}
