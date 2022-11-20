import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async create(createAffairDto: CreateAffairDto) {
    const newItem = await this.affairRepository.save(createAffairDto);

    return newItem;
  }

  async findAll(query) {
    const qb = await AppDataSource.getRepository(Affair).createQueryBuilder(
      'notes',
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
