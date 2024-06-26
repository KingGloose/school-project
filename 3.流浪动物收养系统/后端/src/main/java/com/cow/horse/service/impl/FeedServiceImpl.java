package com.cow.horse.service.impl;

import com.cow.horse.entity.Feed;
import com.cow.horse.mapper.FeedMapper;
import com.cow.horse.service.IFeedService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author
 * @since 2023-04-04
 */
@Service
public class FeedServiceImpl extends ServiceImpl<FeedMapper, Feed> implements IFeedService {

}
