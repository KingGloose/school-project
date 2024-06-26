package com.cow.horse.service;

import com.cow.horse.entity.Notice;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author
 * @since 2023-04-04
 */
public interface INoticeService extends IService<Notice> {

    List<Notice> limit(int i);
}
