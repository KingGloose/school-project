package com.hbnu.test;

import com.hbnu.config.ApplicationConfig;
import com.hbnu.pojo.DataType;
import com.hbnu.pojo.User;
import com.hbnu.service.OrderService;
import com.hbnu.service.UserService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.Arrays;

public class IOCTest {

    @Test
    public void testIoc(){
//        1、解析配置文件，获取工厂对象
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");

        //2、根据配置文件中bean标签的id获取bean对象
//        UserService userService = (UserService) applicationContext.getBean("userService");

//        UserService userService = (UserService) applicationContext.getBean("userFactory");

        //3、调用目标对象方法
//        userService.addUser();
    }

    @Test
    public void testDI(){
//        1、解析配置文件，获取工厂对象
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");

//        User user = (User) applicationContext.getBean("user");
//        user.printProperties();

//        UserService userService = (UserService) applicationContext.getBean("userService");
//        userService.addUser();

        DataType dataType = (DataType) applicationContext.getBean("dataType");
        System.out.println(dataType);
    }

//    @Test
//    public void testIOC(){
//        ApplicationContext applicationContext = new AnnotationConfigApplicationContext();
//
//        UserService userService = (UserService) applicationContext.getBean("userService");
//
//        userService.addUser();
//    }

    @Test
    public void testAnnotation(){
//        注解
        AnnotationConfigApplicationContext annotationContext = new AnnotationConfigApplicationContext();
        annotationContext.register(ApplicationConfig.class); //注册配置类
        annotationContext.refresh();//刷新工厂

        OrderService orderService = (OrderService) annotationContext.getBean("orderService");

        orderService.addOrder();

        System.out.println("订单号" + orderService.orderNo);
        System.out.println("订单产品" + Arrays.toString(orderService.orderPro));

    }

    @Test
    public void testMix(){
//        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext();
//        applicationContext.register(ApplicationConfig.class);
//        applicationContext.refresh();

        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");

        UserService userService = (UserService) applicationContext.getBean("userService");
        userService.addUser();
    }

}

























