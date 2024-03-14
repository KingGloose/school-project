package com.hbnu.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration  //表示当前这个类是个配置类
@ComponentScan("com.hbnu") //包扫描配置，扫描指定位置下面的所有类或接口
public class ApplicationConfig {

}
