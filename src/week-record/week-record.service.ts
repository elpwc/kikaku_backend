import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Affair } from 'src/affair/entities/affair.entity';
import { AppDataSource } from 'src/dataSource';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWeekRecordDto } from './dto/create-week-record.dto';
import { UpdateWeekRecordDto } from './dto/update-week-record.dto';
import { WeekRecord } from './entities/week-record.entity';

@Injectable()
export class WeekRecordService {
  constructor(
    @InjectRepository(WeekRecord)
    private readonly weekRecordRepository: Repository<WeekRecord>,

    @InjectRepository(Affair)
    private readonly affairRepository: Repository<Affair>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: number, createWeekRecordDto: CreateWeekRecordDto) {
    const record = new WeekRecord();
    record.year = createWeekRecordDto.year;
    record.month = createWeekRecordDto.month;
    record.week = createWeekRecordDto.week;
    record.affair = await this.affairRepository.findOne({
      where: { id: createWeekRecordDto.affairId },
    });

    const newItem = await this.weekRecordRepository.save(record);

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['weekRecords'],
    });
    user.weekRecords.push(record);

    await this.userRepository.save(user);

    return newItem;
  }

  async findAll(query, userId?: number) {
    const qb = await AppDataSource.getRepository(WeekRecord).createQueryBuilder(
      'week_record',
    );

    qb.where('1 = 1');
    if (userId) {
      qb.andWhere('week_record.userId = :userId', { userId });
    }

    if ('year' in query) {
      qb.andWhere('week_record.year = :year', { year: query.year });
    }

    if ('month' in query) {
      qb.andWhere('week_record.month = :month', { month: query.month });
    }

    if ('week' in query) {
      qb.andWhere('week_record.week = :week', { week: query.week });
    }

    if ('affairId' in query) {
      qb.andWhere('week_record.affairId = :id', { id: query.affairId });
    }

    qb.orderBy('week_record.createtime', 'DESC');

    const count = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const records = await qb
      .leftJoinAndSelect('week_record.affair', 'affair')
      .getMany();

    console.log(records);

    return { records, count };
  }

  async findOne(id: number) {
    const res = await this.weekRecordRepository.findOne({
      where: { id },
      relations: ['affair'],
    });
    console.log(res);
    if (res === null) {
      throw new NotFoundException('Cannot find');
    } else {
      return res;
    }
  }

  async update(id: number, updateWeekRecordDto: UpdateWeekRecordDto) {
    const toUpdate = await this.weekRecordRepository.findOne({ where: { id } });
    let updated = Object.assign(toUpdate, updateWeekRecordDto);
    if (updateWeekRecordDto.affairId) {
      const affair = await this.weekRecordRepository.findOne({
        where: { id: updateWeekRecordDto.affairId },
      });
      updated = Object.assign(updated, { affair });
      delete updated.affairId;
    }

    const record = await this.weekRecordRepository.save(updated);
    return { record };
  }

  async remove(id: number) {
    return this.weekRecordRepository.delete(id);
  }
}
