import { Injectable } from '@angular/core';

import { User } from 'src/app/models/users/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      firstName: 'Kinan',
      lastName: 'Mohrez',
      email: 'kinan.mohrez@example.com',
      role: 'ADMIN',
      enabled: true,
    },
    {
      id: 2,
      firstName: 'Anna',
      lastName: 'Schmidt',
      email: 'anna.schmidt@example.com',
      role: 'MANAGER',
      enabled: true,
    },
    {
      id: 3,
      firstName: 'David',
      lastName: 'Müller',
      email: 'david.mueller@example.com',
      role: 'MEMBER',
      enabled: false,
    },
  ];

  public getUsers(): User[] {
    return [...this.users];
  }

  public getUserById(id: number): User | undefined {
    return this.users.find((user: User) => user.id === id);
  }

  public createUser(user: User): void {
    const nextId =
      Math.max(...this.users.map((currentUser: User) => currentUser.id), 0) + 1;

    this.users.push({
      ...user,
      id: nextId,
    });
  }

  public updateUser(user: User): void {
    const userIndex = this.users.findIndex(
      (currentUser: User) => currentUser.id === user.id,
    );

    if (userIndex === -1) {
      return;
    }

    this.users[userIndex] = {
      ...user,
    };
  }

  public deleteUser(id: number): void {
    this.users = this.users.filter((user: User) => user.id !== id);
  }
}
