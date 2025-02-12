import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/h')
  getHello2(): string {
    return this.appService.getHello();
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MessagePattern({ cmd: 'message' })
  handleMessage(data: any): any {
    console.log('Received message via RabbitMQ:', data);
    // You can perform business logic here and return a response.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { response: 'Message processed', originalData: data };
  }
}
