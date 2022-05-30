import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as redisStore from 'cache-manager-redis-store';


@Module({
  imports: [
    CacheModule.register({
        store: redisStore,
        host:"127.0.0.1",
        port: 6379,
        authen_pass:"phankieuphu"
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
