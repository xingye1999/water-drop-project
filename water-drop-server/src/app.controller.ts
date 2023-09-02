import { Controller, Get } from '@nestjs/common';
import { UserService } from './modules/user/user.service';
import { User } from './modules/user/models/user.entity';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('/create')
  async create(): Promise<boolean> {
    return await this.userService.create({
      name: '水滴超级管理有',
      desc: '管理有',
      tel: '8800888',
    });
  }

  @Get('/del')
  async del(): Promise<boolean> {
    return await this.userService.del('5b6a6e1e-a66a-4969-8380-941e45d6d3f4');
  }

  @Get('/update')
  async update(): Promise<boolean> {
    return await this.userService.update(
      '2b334b60-1795-462d-894e-0a6153470a7b',
      {
        name: '水滴超级管理有111',
      },
    );
  }

  @Get('/find')
  async find(): Promise<User> {
    return await this.userService.find('2b334b60-1795-462d-894e-0a6153470a7b');
  }
}
