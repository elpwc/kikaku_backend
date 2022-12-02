import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Affair } from 'src/affair/entities/affair.entity';
import { AppDataSource } from 'src/dataSource';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDayRecordDto } from './dto/create-day-record.dto';
import { UpdateDayRecordDto } from './dto/update-day-record.dto';
import { DayRecord } from './entities/day-record.entity';

@Injectable()
export class DayRecordService {
  constructor(
    @InjectRepository(DayRecord)
    private readonly dayRecordRepository: Repository<DayRecord>,

    @InjectRepository(Affair)
    private readonly affairRepository: Repository<Affair>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: number, createDayRecordDto: CreateDayRecordDto) {
    const record = new DayRecord();
    record.year = createDayRecordDto.year;
    record.month = createDayRecordDto.month;
    record.week = createDayRecordDto.week;
    record.day = createDayRecordDto.day;
    record.startTime = createDayRecordDto.startTime;
    record.endTime = createDayRecordDto.endTime;
    record.affair = await this.affairRepository.findOne({
      where: { id: createDayRecordDto.affairId },
    });

    const newItem = await this.dayRecordRepository.save(record);

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['dayRecords'],
    });
    user.dayRecords.push(record);

    await this.userRepository.save(user);

    return newItem;
  }

  async findAll(query, userId?: number) {
    const qb = await AppDataSource.getRepository(DayRecord).createQueryBuilder(
      'day_record',
    );

    qb.where('1 = 1');
    if (userId) {
      qb.andWhere('day_record.userId = :userId', { userId });
    }

    if ('year' in query) {
      qb.andWhere('day_record.year = :year', { year: query.year });
    }

    if ('month' in query) {
      qb.andWhere('day_record.month = :month', { month: query.month });
    }

    if ('week' in query) {
      qb.andWhere('day_record.week = :week', { week: query.week });
    }

    if ('day' in query) {
      qb.andWhere('day_record.day = :day', { week: query.day });
    }

    if ('affairId' in query) {
      qb.andWhere('day_record.affairId = :id', { id: query.affairId });
    }

    qb.orderBy('day_record.createtime', 'DESC');

    const count = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const records = await qb
      .leftJoinAndSelect('day_record.affair', 'affair')
      .getMany();

    return { records, count };
  }

  async findOne(id: number) {
    const res = await this.dayRecordRepository.findOne({
      where: { id },
      relations: ['affair'],
    });
    if (res === null) {
      throw new NotFoundException('Cannot find');
    } else {
      return res;
    }
  }

  async update(id: number, updateDayRecordDto: UpdateDayRecordDto) {
    const toUpdate = await this.dayRecordRepository.findOne({
      where: { id },
    });
    let updated = Object.assign(toUpdate, updateDayRecordDto);
    if (updateDayRecordDto.affairId) {
      const affair = await this.dayRecordRepository.findOne({
        where: { id: updateDayRecordDto.affairId },
      });
      updated = Object.assign(updated, { affair });
      delete updated.affairId;
    }

    const record = await this.dayRecordRepository.save(updated);
    return { record };
  }

  async remove(id: number) {
    return this.dayRecordRepository.delete(id);
  }
}
