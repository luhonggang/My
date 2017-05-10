package com.myproject.my;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import com.my.website.entity.User;
import com.my.website.service.UserService;

/**
 *  单元测试类 
 * @author LuHongGang
 * @date 2017年5月9日
 * @time 下午4:16:52
 * @since 1.0
 * Jar Maven 坐标
   <!--  junit -->
   <dependency>
	      <groupId>junit</groupId>
	      <artifactId>junit</artifactId>
	      <version>3.8.1</version>
	      <scope>test</scope>
	    </dependency>
    <!-- spring test -->  
		<dependency>  
		    <groupId>org.springframework</groupId>  
		    <artifactId>spring-test</artifactId>  
		    <version>4.0.6.RELEASE</version>  
		    <scope>test</scope>  
		</dependency>  
 */
@RunWith(SpringJUnit4ClassRunner.class)  
@ContextConfiguration(locations={"classpath:META-INF/spring/applicationContext-*.xml"}) 
//"classpath*:/spring/applicationContext-service.xml"
public class SpringTestService{  
	
	 @Autowired
     UserService userService; 
      
    @Test  
    public void getListTest(){  
    	Map map = new HashMap();
    	map.put("userName","oo");
        List<User> user = userService.selectByIdAndUserName(map);
          
        for(User c:user){  
            System.out.print(c.getUserName()+"    ");  
        }  
    }  
}  