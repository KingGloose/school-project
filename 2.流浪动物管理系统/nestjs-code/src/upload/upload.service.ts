import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Uplaod } from './entities/upload.entity';

@Injectable()
export class UploadService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  async checkFileMd5(md5: string) {
    const result = await this.entityManager.findBy(Uplaod, { fileMd5: md5 });
    return result;
  }

  async uploadFile(md5: string, name: string, size: string) {
    try {
      const upload = new Uplaod();
      upload.fileMd5 = md5;
      upload.fileName = name;
      upload.fileSize = size;

      await this.entityManager.save(upload);
    } catch (error) {
      return error;
    }
  }

  async getAll() {
    const result = await this.entityManager.find(Uplaod);
    const new_result = result.map((item) => {
      item.fileMd5 = item.fileMd5.replace(/\x00+$/, '');
      return item;
    });
    return new_result;
  }
}
