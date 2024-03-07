import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeModule } from './code/code.module';
import { UploadModule } from './upload/upload.module';
import { Uplaod } from './upload/entities/upload.entity';

@Module({
  imports: [
    CodeModule,
    UploadModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '123456',
      database: 'typeorm_test_01',
      synchronize: true,
      logging: true,
      entities: [Uplaod],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        autoPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
