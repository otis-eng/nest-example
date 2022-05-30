import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello()  {
    return this.appService.getHello();
  }

  @Post()
  async setCache(@Body() data){
    return this.appService.setCache(data);
  }

}
