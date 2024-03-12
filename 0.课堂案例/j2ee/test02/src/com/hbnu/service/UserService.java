package com.hbnu.service;

import com.hbnu.dao.UserDao;
import org.springframework.stereotype.Component;

@Component
public class UserService {
    //UserService引入Userdao
    //    private UserDao userDao;

//    public void setUserDao(UserDao userDao) {
//        this.userDao = userDao;
//    }

    public void addUser(){
        System.out.println("沉醉不知归处，误入藕花深处");
//        userDao.addUser();
    }
}
