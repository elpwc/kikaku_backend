import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AffairType } from 'src/affair-type/entities/affair-type.entity';
import { AppDataSource } from 'src/dataSource';
import { Repository } from 'typeorm';
import { CreateAffairDto } from './dto/create-affair.dto';
import { UpdateAffairDto } from './dto/update-affair.dto';
import { Affair } from './entities/affair.entity';

@Injectable()
export class AffairService {
  constructor(
    @InjectRepository(Affair)
    private readonly affairRepository: Repository<Affair>,
    @InjectRepository(AffairType)
    private readonly affairTypeRepository: Repository<AffairType>,
  ) {}

  async create(createAffairDto: CreateAffairDto) {
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

    return newItem;
  }

  async findAll(query) {
    const qb = await AppDataSource.getRepository(Affair).createQueryBuilder(
      'affair',
    );

    qb.where('1 = 1');

    if ('type' in query) {
      qb.andWhere('affair.name = :id', { id: query.affair });
    }

    if ('is_important' in query) {
      qb.andWhere('affair.isImportant = :id', { id: query.isImportant });
    }

    qb.orderBy('affair.created', 'DESC');

    const count = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const affairs = await qb.getMany();

    return { affairs, count };
  }

  async findOne(id: number) {
    return this.affairRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAffairDto: UpdateAffairDto) {
    return this.affairRepository.update(id, updateAffairDto);
  }

  async remove(id: number) {
    return this.affairRepository.delete(id);
  }
}
