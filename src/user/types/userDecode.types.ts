import { JwtPayload } from './../../../node_modules/@types/jsonwebtoken/index.d';
import { UserEntity } from '../user.entity';

export type IUserDecode = Pick<UserEntity, 'id' | 'username' | 'email'> &
  string &
  JwtPayload;
