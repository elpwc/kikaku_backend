import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Affair } from 'src/affair/entities/affair.entity';
import { AppDataSource } from 'src/dataSource';
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
  ) {}

  async create(createMonthRecordDto: CreateMonthRecordDto) {
    const record = new MonthRecord();
    record.year = createMonthRecordDto.year;
    record.month = createMonthRecordDto.month;
    record.affair = await this.affairRepository.findOne({
      where: { id: createMonthRecordDto.affairId },
    });

    const newItem = await this.monthRecordRepository.save(record);

    return newItem;
  }

  async findAll(query) {
    const qb = await AppDataSource.getRepository(
      MonthRecord,
    ).createQueryBuilder('month_record');

    qb.where('1 = 1');

    if ('year' in query) {
      qb.andWhere('month_record.year = :id', { id: query.year });
    }

    if ('month' in query) {
      qb.andWhere('month_record.month = :id', { id: query.month });
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

    console.log(records);

    return { records, count };
  }

  async findOne(id: number) {
    const res = await this.monthRecordRepository.findOne({
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

  async update(id: number, updateMonthRecordDto: UpdateMonthRecordDto) {
    return this.monthRecordRepository.update(id, updateMonthRecordDto);
  }

  async remove(id: number) {
    return this.monthRecordRepository.delete(id);
  }
}
