import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppDataSource } from 'src/dataSource';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAffairTypeDto } from './dto/create-affair-type.dto';
import { UpdateAffairTypeDto } from './dto/update-affair-type.dto';
import { AffairType } from './entities/affair-type.entity';

@Injectable()
export class AffairTypeService {
  constructor(
    @InjectRepository(AffairType)
    private readonly affairTypeRepository: Repository<AffairType>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: number, createAffairTypeDto: CreateAffairTypeDto) {
    const newItem = await this.affairTypeRepository.save(createAffairTypeDto);

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['affairTypes'],
    });
    user.affairTypes.push(newItem);

    await this.userRepository.save(user);

    return newItem;
  }

  async findAll(query) {
    const qb = await AppDataSource.getRepository(AffairType).createQueryBuilder(
      'affairType',
    );

    qb.where('1 = 1');

    qb.orderBy('affairType.createtime', 'DESC');

    const count = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const affairTypes = await qb.getMany();

    return { affairTypes, count };
  }

  async findAllByUserId(userId: number, query) {
    const qb = await AppDataSource.getRepository(AffairType).createQueryBuilder(
      'affairType',
    );

    qb.where('1 = 1');
    if (userId) {
      qb.andWhere('affairType.userId = :userId', { userId });
    }

    qb.orderBy('affairType.createtime', 'DESC');

    const count = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const affairTypes = await qb.getMany();

    return { affairTypes, count };
  }

  findOne(id: number) {
    return this.affairTypeRepository.findOne({ where: { id } });
  }

  update(id: number, updateAffairTypeDto: UpdateAffairTypeDto) {
    return this.affairTypeRepository.update(id, updateAffairTypeDto);
  }

  remove(id: number) {
    return this.affairTypeRepository.delete(id);
  }
}
