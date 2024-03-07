import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class CodeService {
  @Inject('client_redis')
  clientRedis: RedisClientType;

  async getCreateCode(key: string, code: string) {
    try {
      const low_code = code.toLowerCase();
      await this.clientRedis.setNX(key, low_code);
      await this.clientRedis.expire(key, 5 * 60);
      return 'success';
    } catch (error) {
      return 'error';
    }
  }

  async verifyCode(key: string, value: string) {
    const code_value = await this.clientRedis.get(key);
    const low_code = value.toLowerCase();
    if (code_value !== low_code) {
      return new BadRequestException('验证码错误');
    }

    // 验证成功 删除验证码
    await this.clientRedis.del(key);
    return 'success';
  }
}
