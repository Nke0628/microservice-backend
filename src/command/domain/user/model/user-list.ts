import { User } from './user';

export class UserList {
  private userList: User[];

  constructor(userList: User[]) {
    this.userList = userList;
  }

  get getList(): User[] {
    return this.userList;
  }
}
