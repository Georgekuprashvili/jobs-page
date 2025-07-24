import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(dto: CreateUserDto) {
    const user = await this.userModel.create(dto);
    return { message: 'User created', data: user };
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid ID');
    const user = await this.userModel.findById(id);
    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
  
}
