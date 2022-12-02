import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Affair } from 'src/affair/entities/affair.entity';
import { AppDataSource } from 'src/dataSource';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMonthRecordDto } from './dto/create-month-record.dto';
import { UpdateMonthRecordDto } from './dto/update-month-record.dto';
import { MonthRecord } from './entities/month-record.entity';

@Injectable()
export class MonthRecordService {
  constructor(
    @InjectRepository(MonthRecord)
    private readonly monthRecordRepository: Repository<MonthRecord>,

    @InjectRepository(Affair)
    private readonly affairRepository: Repository<Affair>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: number, createMonthRecordDto: CreateMonthRecordDto) {
    const record = new MonthRecord();
    record.year = createMonthRecordDto.year;
    record.month = createMonthRecordDto.month;
    record.affair = await this.affairRepository.findOne({
      where: { id: createMonthRecordDto.affairId },
    });

    const newItem = await this.monthRecordRepository.save(record);

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['monthRecords'],
    });
    user.monthRecords.push(record);

    await this.userRepository.save(user);

    return newItem;
  }

  async findAll(query, userId?: number) {
    const qb = await AppDataSource.getRepository(
      MonthRecord,
    ).createQueryBuilder('month_record');

    qb.where('1 = 1');
    if (userId) {
      qb.andWhere('month_record.userId = :userId', { userId });
    }

    if ('year' in query) {
      qb.andWhere('month_record.year = :year', { year: query.year });
    }

    if ('month' in query) {
      qb.andWhere('month_record.month = :month', { month: query.month });
    }

    if ('affairId' in query) {
      qb.andWhere('month_record.affairId = :id', { id: query.affairId });
    }

    qb.orderBy('month_record.createtime', 'DESC');

    const count = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const records = await qb
      .leftJoinAndSelect('month_record.affair', 'affair')
      .getMany();

    return { records, count };
  }

  async findOne(id: number) {
    const res = await this.monthRecordRepository.findOne({
      where: { id },
      relations: ['affair'],
    });
    if (res === null) {
      throw new NotFoundException('Cannot find');
    } else {
      return res;
    }
  }

  async update(id: number, updateMonthRecordDto: UpdateMonthRecordDto) {
    const toUpdate = await this.monthRecordRepository.findOne({
      where: { id },
    });
    let updated = Object.assign(toUpdate, updateMonthRecordDto);
    if (updateMonthRecordDto.affairId) {
      const affair = await this.monthRecordRepository.findOne({
        where: { id: updateMonthRecordDto.affairId },
      });
      updated = Object.assign(updated, { affair });
      delete updated.affairId;
    }

    const record = await this.monthRecordRepository.save(updated);
    return { record };
  }

  async remove(id: number) {
    return this.monthRecordRepository.delete(id);
  }
}
