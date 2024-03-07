import path from 'path';

import { Body, Controller, Get, Inject, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';

import { UploadService } from './upload.service';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, '../../upload-files'));
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, callback) => {
  file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
  callback(null, true);
};

@Controller('upload')
export class UploadController {
  @Inject()
  private uploadService: UploadService;

  @Get('/checkFileMd5/:md5')
  async checkFileMd5(@Param('md5') md5: string) {
    const result = await this.uploadService.checkFileMd5(md5);
    if (result.length === 0) {
      return {
        code: 200,
        data: { message: 'ok' },
      };
    } else {
      return {
        code: 400,
        data: { message: 'exists' },
      };
    }
  }

  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storage,
      fileFilter: fileFilter,
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() fileInfo: any) {
    const { md5, size } = fileInfo;
    const name = file.filename;

    await this.uploadService.uploadFile(md5, name, size);

    return {
      code: 200,
      data: {
        message: 'ok',
      },
    };
  }

  @Get('/getAll')
  async getAll() {
    return await this.uploadService.getAll();
  }
}
