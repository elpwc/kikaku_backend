import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { AppDataSource } from 'src/dataSource';
import { validate } from 'class-validator';
import { SECRET } from 'src/config';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // check uniqueness of username/email
    const { name, password } = createUserDto;
    const qb = await AppDataSource.getRepository(User).createQueryBuilder(
      'user',
    );
    qb.where('name = :name', { name });

    const user = await qb.getOne();

    if (user) {
      const errors = { name: 'Username and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new user
    const newUser = new User();
    newUser.name = name;
    newUser.password = password;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildUserRO(savedUser);
    }
  }

  async findAll(query) {
    return await this.userRepository.find();
  }

  async findOne({ name, password }: LoginDto) {
    const user = await this.userRepository.findOne({ where: { name } });
    if (!user) {
      return null;
    }

    if (await argon2.verify(user.password, password)) {
      return user;
    }

    return null;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findById(id: number): Promise<UserRO> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildUserRO(user);
  }

  async findByName(name: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({ where: { name } });
    return this.buildUserRO(user);
  }

  public generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }

  private buildUserRO(user: User) {
    const userRO = {
      id: user.id,
      name: user.name,
      token: this.generateJWT(user),
    };

    return { user: userRO };
  }
}
