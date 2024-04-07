import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prsima.service';
import { Optional } from 'typescript-optional';
import { UserMapper } from '../mapper/user.mapper';
import { User } from '../model/user';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findById(id: number): Promise<Optional<User>> {
    const userEntity = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });
    return Optional.ofNullable(
      userEntity ? UserMapper.toDomain(userEntity) : null,
    );
  }

  async fechtByIds(ids: number[]) {
    const userEntities = await this.prismaService.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return UserMapper.toDomainList(userEntities);
  }
}
