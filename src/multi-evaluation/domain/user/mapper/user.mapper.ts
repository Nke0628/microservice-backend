import { User as UserEntity } from '@prisma/client';
import { User } from '../model/user';
import { UserList } from '../model/user-list';

export class UserMapper {
  public static toDomain(userEntity: UserEntity): User {
    return new User(userEntity.id, userEntity.name);
  }
  public static toDomainList(userEntities: UserEntity[]): UserList {
    const userList = userEntities.map((userEntity) => {
      return this.toDomain(userEntity);
    });
    return new UserList(userList);
  }
}
