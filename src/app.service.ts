import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import * as Cache from "cache-manager";

@Injectable()
export class AppService {
  private cacheMemmory: any = {}
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager) {

    this.cacheMemmory = Cache.caching({ store: "memory" } as Cache.StoreConfig)
  }
  async getHello() {
    const cacheResult: any = await Promise.race([
      this.cacheManager.get("email"),
      // set timeout == - to 
      new Promise((resolve) => setTimeout(resolve, 1500, false))
    ]);
    if (!cacheResult) {
      Logger.debug("Get memory cache");
      return this.cacheMemmory.get('email');
    }
    Logger.debug(JSON.stringify(cacheResult));
    return cacheResult;
  }
  async setCache(request) {
    const result = await Promise.race([
      this.cacheManager.set('email', { email: request.email }, { ttl: 0 }),
      new Promise((resolve) => setTimeout(resolve, 1500, false))
    ])
    if (!result) {
      Logger.debug("Set memory cache");
      return await this.cacheMemmory.set('email', { email: request.email }, { ttl: 0 })
    }
    Logger.debug(JSON.stringify(result));
    return request;
  }
  async deleteCache(request) {
    const result = Promise.race([
      await this.cacheManager.del(request.key),
      new Promise((resolve) => setTimeout(resolve, 1500, false))
    ])
    if (!result) {
      return "Delete Faild";
    }
    return result;
  }

}
