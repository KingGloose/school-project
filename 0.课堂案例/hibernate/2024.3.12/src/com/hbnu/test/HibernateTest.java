package com.hbnu.test;

import com.hbnu.pojo.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.junit.Test;

public class HibernateTest {
    /**
     * 往数据库表中添加一条用户信息
     */
    @Test
    public void insertData(){
//        1、加载配置文件，直接加载核心配置文件，间接加载映射关系配置文件
        Configuration configuration = new Configuration().configure();

//        2、通过配置文件对象构建会话工厂（建表）
        SessionFactory sessionFactory = configuration.buildSessionFactory();
//        3、通过会话工厂，开启会话功能
        Session session = sessionFactory.openSession();

//        4、通过会话对象完成数据库操作
        User user = new User();
        user.setUsername("王维");
        user.setPassword("123456");
        user.setAddress("古代");
        user.setSalary(18000.00);
        session.save(user);//通过调用session对象的相关方法操作数据库

//        5、关闭
        session.close();
        sessionFactory.close();
    }
}
