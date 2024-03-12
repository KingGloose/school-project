package com.hbnu.pojo;

public class User {
    private String username;

    //有参构造
//    public User(String username) {
//        this.username = username;
//    }


    public void setUsername(String username) {
        this.username = username;
    }

    public void printProperties(){
        System.out.println("获取到名句：" + this.username);
    }
}
