/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Controller('users')
export class UserController {
  private client: ClientProxy;

  constructor(private readonly userService: UserService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
        queue: 'main_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  @Post()
  async create(@Body() body: { name: string; email: string }) {
    return this.userService.createUser(body.name, body.email);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post('send')
  async sendMessage(@Body() payload: any): Promise<any> {
    // The pattern here must match the one in our message handler ({ cmd: 'message' })
    const response = await this.client
      .send({ cmd: 'message' }, payload)
      .toPromise();
    return response;
  }
}
