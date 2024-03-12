package com.hbnu.pojo;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Properties;

public class DataType {
    private String[] arrs;
    private List<String> lists;
    private Map<String,String> maps;
    private Properties properties;

    public void setArrs(String[] arrs) {
        this.arrs = arrs;
    }

    public void setLists(List<String> lists) {
        this.lists = lists;
    }

    public void setMaps(Map<String, String> maps) {
        this.maps = maps;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    @Override
    public String toString() {
        return "DataType{" +
                "arrs=" + Arrays.toString(arrs) +
                "\n lists=" + lists +
                "\n maps=" + maps +
                "\n properties=" + properties +
                '}';
    }
}
