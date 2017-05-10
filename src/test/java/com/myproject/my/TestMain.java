package com.myproject.my;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

/**
 * 反射就是加载一个运行时才知道的类以及它的完整内部结构
 * 详解链接:http://www.cnblogs.com/crazylqy/p/4253002.html
 * @author LuHongGang
 * @date 2017年5月9日
 * @time 下午6:55:58
 * @since 1.0
 */
public class TestMain {

	public static void main(String[] args) throws Exception {
		  // 全名类路径
		 Class classType=Class.forName("com.my.website.entity.User");
		  // 获取声明的方法
         Method methods[]=classType.getDeclaredMethods();  
         for(int i=0;i<methods.length;i++){  
             System.out.println(methods[i].toString());  
         }  
         // 获取所有的属性字段(注意只能 获取到非private修饰的属性字段)
         Field[] fields = classType.getFields(); 
         for(int f=0;f<fields.length;f++){
        	 System.out.println(fields[f]);
         }
         
         
         Map  map = (Map) new HashSet();
         
         List list = new ArrayList();

	}

}
