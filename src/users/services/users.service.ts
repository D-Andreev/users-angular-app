import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://jsonplaceholder.typicode.com/users';
  }

  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }

  obfuscateEmail(users: User[], userId: number): User[] {
    return users.map(user => {
      if (user.id !== userId) {
        return user;
      }

      const emailSplit = user.email.split('@');
      if (!emailSplit || emailSplit.length < 2) {
        return user;
      }

      const obfuscatedEmail = '*'.repeat(emailSplit[0].length - 1) + '@' + emailSplit[1];

      user.email = obfuscatedEmail;
      return user;
    });
  }
}
