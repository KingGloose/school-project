package com.hbnu.dao;

import org.springframework.stereotype.Repository;

@Repository//数据层一般用Repository
public class OrderDao {
    public void addOrder(){
        System.out.println("数据层添加订单的方法.....");
    }
}
