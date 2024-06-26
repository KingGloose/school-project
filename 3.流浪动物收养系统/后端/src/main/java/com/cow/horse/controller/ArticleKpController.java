package com.cow.horse.controller;

import cn.hutool.core.date.DateUtil;

import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cow.horse.common.Result;
import com.cow.horse.entity.ArticleKp;
import com.cow.horse.service.IArticleKpService;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;
import java.util.List;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author
 * @since 2023-04-04
 */
@RestController
@RequestMapping("/articleKp")
public class ArticleKpController {

    @Resource
    private IArticleKpService articleKpService;

    private final String now = DateUtil.now();

    // 新增或者更新
    @PostMapping
    public Result save(@RequestBody ArticleKp articleKp) {
        if (articleKp.getId() == null) {
            articleKp.setTime(DateUtil.now());

        }
        articleKpService.saveOrUpdate(articleKp);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        articleKpService.removeById(id);
        return Result.success();
    }

    @PostMapping("/del/batch")
    public Result deleteBatch(@RequestBody List<Integer> ids) {
        articleKpService.removeByIds(ids);
        return Result.success();
    }

    @GetMapping
    public Result findAll() {
        return Result.success(articleKpService.list());
    }

    @GetMapping("/{id}")
    public Result findOne(@PathVariable Integer id) {
        ArticleKp articleKp = articleKpService.getById(id);
        UpdateWrapper<ArticleKp> wrapper = new UpdateWrapper<>();
        wrapper.eq("id", id);
        wrapper.set("read1", articleKp.getRead1() + 1);
        articleKpService.update(wrapper);
        return Result.success(articleKp);
    }

    @GetMapping("/page")
    public Result findPage(@RequestParam(defaultValue = "") String name,
                           @RequestParam Integer pageNum,
                           @RequestParam Integer pageSize) {
        QueryWrapper<ArticleKp> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("id");
        if (!"".equals(name)) {
            queryWrapper.like("name", name);
        }
        return Result.success(articleKpService.page(new Page<>(pageNum, pageSize), queryWrapper));
    }


}

