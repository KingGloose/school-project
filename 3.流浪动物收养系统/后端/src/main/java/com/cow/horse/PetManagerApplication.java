package com.cow.horse;

import com.cow.horse.utils.PathUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PetManagerApplication {

    public static void main(String[] args) {
        System.out.println("Project Path : " + PathUtils.getClassLoadRootPath());
        SpringApplication.run(PetManagerApplication.class, args);
    }

}
