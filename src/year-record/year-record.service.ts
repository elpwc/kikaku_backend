import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Affair } from 'src/affair/entities/affair.entity';
import { AppDataSource } from 'src/dataSource';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateYearRecordDto } from './dto/create-year-record.dto';
import { UpdateYearRecordDto } from './dto/update-year-record.dto';
import { YearRecord } from './entities/year-record.entity';

@Injectable()
export class YearRecordService {
  constructor(
    @InjectRepository(YearRecord)
    private readonly yearRecordRepository: Repository<YearRecord>,
    @InjectRepository(Affair)
    private readonly affairRepository: Repository<Affair>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: number, createYearRecordDto: CreateYearRecordDto) {
    const yearRecord = new YearRecord();
    yearRecord.year = createYearRecordDto.year;
    yearRecord.affair = await this.affairRepository.findOne({
      where: { id: createYearRecordDto.affairId },
    });

    const newItem = await this.yearRecordRepository.save(yearRecord);

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['yearRecords'],
    });
    user.yearRecords.push(yearRecord);

    await this.userRepository.save(user);

    return newItem;
  }

  async findAll(query) {
    const qb = await AppDataSource.getRepository(YearRecord).createQueryBuilder(
      'year_record',
    );

    qb.where('1 = 1');

    if ('year' in query) {
      qb.andWhere('year_record.year = :year', { year: query.year });
    }

    if ('affairId' in query) {
      qb.andWhere('year_record.affairId = :id', { id: query.affairId });
    }

    qb.orderBy('year_record.createtime', 'DESC');

    const count = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const yearRecords = await qb
      .leftJoinAndSelect('year_record.affair', 'affair')
      .getMany();

    return { yearRecords, count };
  }

  async findAllByUserId(userId: number, query) {
    const qb = await AppDataSource.getRepository(YearRecord).createQueryBuilder(
      'year_record',
    );

    qb.where('1 = 1');
    if (userId) {
      qb.andWhere('year_record.userId = :userId', { userId });
    }
    if ('year' in query) {
      qb.andWhere('year_record.year = :year', { year: query.year });
    }

    if ('affairId' in query) {
      qb.andWhere('year_record.affairId = :id', { id: query.affairId });
    }

    qb.orderBy('year_record.createtime', 'DESC');

    const count = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const yearRecords = await qb
      .leftJoinAndSelect('year_record.affair', 'affair')
      .getMany();

    return { yearRecords, count };
  }

  async findOne(id: number) {
    const res = await this.yearRecordRepository.findOne({
      where: { id },
      relations: ['affair'],
    });
    if (res === null) {
      throw new NotFoundException('Cannot find');
    } else {
      return res;
    }
  }

  async update(id: number, updateYearRecordDto: UpdateYearRecordDto) {
    const toUpdate = await this.yearRecordRepository.findOne({ where: { id } });
    let updated = Object.assign(toUpdate, updateYearRecordDto);
    if (updateYearRecordDto.affairId) {
      const affair = await this.yearRecordRepository.findOne({
        where: { id: updateYearRecordDto.affairId },
      });
      updated = Object.assign(updated, { affair });
      delete updated.affairId;
    }

    const record = await this.yearRecordRepository.save(updated);
    return { record };
  }

  async remove(id: number) {
    return this.yearRecordRepository.delete(id);
  }
}
