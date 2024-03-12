package com.hbnu.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration  //表示当前这个类是个配置类
@ComponentScan("com.hbnu.service") //包扫描配置
public class ApplicationConfig {
}
