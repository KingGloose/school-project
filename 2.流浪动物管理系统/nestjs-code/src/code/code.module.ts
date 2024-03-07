import { Module } from '@nestjs/common';
import { CodeController } from './code.controller';
import { CodeService } from './code.service';
import { createClient } from 'redis';

@Module({
  controllers: [CodeController],
  providers: [
    CodeService,
    {
      provide: 'client_redis',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6380,
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class CodeModule {}
