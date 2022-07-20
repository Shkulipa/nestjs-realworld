import { UserEntity } from './user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/LoginUser.dto';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userResitory: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const errorResponse = {
      erros: {},
    };

    const userByEmail = await this.userResitory.findOne({
      email: createUserDto.email,
    });
    const userByUsername = await this.userResitory.findOne({
      username: createUserDto.username,
    });

    if (userByEmail) errorResponse.erros['email'] = 'has already been taken';
    if (userByUsername)
      errorResponse.erros['username'] = 'has already been taken';

    /* if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } */

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    return await this.userResitory.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const errorResponse = {
      erros: {
        'email or password': 'is invalid',
      },
    };

    const user = await this.userResitory.findOne(
      {
        email: loginUserDto.email,
      },
      {
        select: ['id', 'username', 'email', 'bio', 'image', 'password'],
      },
    );

    if (!user)
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);

    /* if (!user)
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      ); */

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect)
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);

    delete user.password;

    return user;
  }

  async updateUser(
    currentUserId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findById(currentUserId);
    Object.assign(user, updateUserDto);
    return await this.userResitory.save(user);
  }

  findById(id: number): Promise<UserEntity> {
    return this.userResitory.findOne(id);
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
