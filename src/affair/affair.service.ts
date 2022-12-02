import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AffairType } from 'src/affair-type/entities/affair-type.entity';
import { AppDataSource } from 'src/dataSource';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAffairDto } from './dto/create-affair.dto';
import { UpdateAffairDto } from './dto/update-affair.dto';
import { Affair } from './entities/affair.entity';
import _ from 'lodash';

@Injectable()
export class AffairService {
  constructor(
    @InjectRepository(Affair)
    private readonly affairRepository: Repository<Affair>,
    @InjectRepository(AffairType)
    private readonly affairTypeRepository: Repository<AffairType>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: number, createAffairDto: CreateAffairDto) {
    const affair = new Affair();
    affair.content = createAffairDto.content;
    affair.continuePeriod_min = createAffairDto.continuePeriod_min;
    affair.deadline = createAffairDto.deadline;
    affair.doAlarm = createAffairDto.doAlarm;
    affair.isImportant = createAffairDto.isImportant;
    affair.name = createAffairDto.name;
    affair.times = createAffairDto.times;
    affair.type = await this.affairTypeRepository.findOne({
      where: { id: createAffairDto.typeId },
    });

    const newItem = await this.affairRepository.save(affair);

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['affairs'],
    });
    user.affairs.push(affair);

    await this.userRepository.save(user);

    return newItem;
  }

  async findAll(query, userId?: number) {
    const qb = await AppDataSource.getRepository(Affair).createQueryBuilder(
      'affair',
    );

    qb.where('1 = 1');
    if (userId) {
      qb.andWhere('affair.userId = :userId', { userId });
    }

    if ('type' in query) {
      qb.andWhere('affair.name = :name', { name: query.affair });
    }

    if ('is_important' in query) {
      qb.andWhere('affair.isImportant = :isImportant', {
        isImportant: query.isImportant,
      });
    }

    qb.orderBy('affair.createtime', 'DESC');

    const count = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const affairs = await qb.leftJoinAndSelect('affair.type', 'type').getMany();

    console.log(affairs);

    return { affairs, count };
  }

  async findOne(id: number) {
    const res = await this.affairRepository.findOne({
      where: { id },
      relations: ['type'],
    });
    console.log(res);
    if (res === null) {
      throw new NotFoundException('Cannot find');
    } else {
      return res;
    }
  }

  async update(id: number, updateAffairDto: UpdateAffairDto) {
    const toUpdate = await this.affairRepository.findOne({ where: { id } });
    let updated = Object.assign(toUpdate, updateAffairDto);
    if (updateAffairDto.typeId) {
      const type = await this.affairTypeRepository.findOne({
        where: { id: updateAffairDto.typeId },
      });
      updated = Object.assign(updated, { type });
      delete updated.typeId;
    }

    const affair = await this.affairRepository.save(updated);
    return { affair };
  }

  async remove(id: number) {
    this.update(id, { deleted: true });
    //return this.affairRepository.delete(id);
  }
}
