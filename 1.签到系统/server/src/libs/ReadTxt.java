package com.zjh;

import java.io.BufferedReader;
import java.io.FileReader;

public class ReadTxt {
    public static void main(String[] args) {
        String readTxtPath = args[0];

        try {
            BufferedReader reader = new BufferedReader(new FileReader(readTxtPath));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            reader.close();
        } catch (Exception e) {
            System.out.println("error:" + e);
            e.printStackTrace();
        }
    }
}