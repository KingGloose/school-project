package com.hbnu.service;

import com.hbnu.dao.OrderDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component //spring容器扫描到这个注解后就会创建被这个注解修饰的类的具体实例对象
//创建对象的注解有四个：@Component、@Controller控制层、@Repository数据层、@Service业务层
public class OrderService {

//    @Autowired
    @Resource(name = "orderDao")//将OrderDao注入到OrderService中
    private OrderDao orderDao;

    @Value("TB888888888888888")//注入普通类型属性值
    public String orderNo;
    @Value("李清照18,鱼玄机Pro,蔡文姬Rine")
    public String[] orderPro;


    public void addOrder(){
        System.out.println("业务层添加订单的方法.....");
        orderDao.addOrder();//业务层调数据层
    }
}

