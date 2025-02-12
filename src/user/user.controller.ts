import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: { name: string; email: string }) {
    return this.userService.createUser(body.name, body.email);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}
