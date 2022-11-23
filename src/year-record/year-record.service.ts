import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Affair } from 'src/affair/entities/affair.entity';
import { AppDataSource } from 'src/dataSource';
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
  ) {}

  async create(createYearRecordDto: CreateYearRecordDto) {
    const yearRecord = new YearRecord();
    yearRecord.year = createYearRecordDto.year;
    yearRecord.affair = await this.affairRepository.findOne({
      where: { id: createYearRecordDto.affairId },
    });

    const newItem = await this.yearRecordRepository.save(yearRecord);

    return newItem;
  }

  async findAll(query) {
    const qb = await AppDataSource.getRepository(YearRecord).createQueryBuilder(
      'year_record',
    );

    qb.where('1 = 1');

    if ('year' in query) {
      qb.andWhere('year_record.year = :id', { id: query.year });
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

    console.log(yearRecords);

    return { yearRecords, count };
  }

  async findOne(id: number) {
    const res = await this.yearRecordRepository.findOne({
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

  async update(id: number, updateYearRecordDto: UpdateYearRecordDto) {
    return this.yearRecordRepository.update(id, updateYearRecordDto);
  }

  async remove(id: number) {
    return this.yearRecordRepository.delete(id);
  }
}
