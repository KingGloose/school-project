package com.hbnu.factory;

import com.hbnu.service.UserService;

public class UserFactory {
//    public static UserService getUserService(){
//        return new UserService();
//    }

    public UserService getUserService(){
        return new UserService();
    }
}
