import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Affair } from 'src/affair/entities/affair.entity';
import { AppDataSource } from 'src/dataSource';
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
  ) {}

  async create(createWeekRecordDto: CreateWeekRecordDto) {
    const record = new WeekRecord();
    record.year = createWeekRecordDto.year;
    record.month = createWeekRecordDto.month;
    record.week = createWeekRecordDto.week;
    record.affair = await this.affairRepository.findOne({
      where: { id: createWeekRecordDto.affairId },
    });

    const newItem = await this.weekRecordRepository.save(record);

    return newItem;
  }

  async findAll(query) {
    const qb = await AppDataSource.getRepository(WeekRecord).createQueryBuilder(
      'week_record',
    );

    qb.where('1 = 1');

    if ('year' in query) {
      qb.andWhere('week_record.year = :id', { id: query.year });
    }

    if ('month' in query) {
      qb.andWhere('week_record.month = :id', { id: query.month });
    }

    if ('week' in query) {
      qb.andWhere('week_record.week = :id', { id: query.week });
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
    return this.weekRecordRepository.update(id, updateWeekRecordDto);
  }

  async remove(id: number) {
    return this.weekRecordRepository.delete(id);
  }
}
