import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prsima.service';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findById(id: number) {
    const userEntity = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });
    return UserMapper.toDomain(userEntity);
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
