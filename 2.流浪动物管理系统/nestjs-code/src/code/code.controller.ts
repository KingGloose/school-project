import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import svgCaptcha from 'svg-captcha';
import short from 'short-uuid';

import { CodeService } from './code.service';

@Controller('code')
export class CodeController {
  @Inject()
  codeService: CodeService;

  @Get('/createCode')
  async getCreateCode() {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 120, //宽度
      height: 50, //高度
      background: '#cc9966', //背景颜色
    });

    const short_uuid = short().new();
    await this.codeService.getCreateCode(short_uuid, captcha.text);

    return {
      code: 200,
      data: { key: short_uuid, value: captcha.data },
    };
  }

  @Post('/verifyCode')
  async verifyCode(@Body() codeInfo: { key: string; value: string }) {
    const { key, value } = codeInfo;
    const result = await this.codeService.verifyCode(key, value);

    return result;
  }
}
