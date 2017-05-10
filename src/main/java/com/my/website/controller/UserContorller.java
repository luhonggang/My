package com.my.website.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.my.website.entity.User;
import com.my.website.service.UserService;


@RestController
public class UserContorller {
	
	 private final static Logger logger = LoggerFactory
			.getLogger(UserContorller.class);
	 
	 @Autowired
	 private UserService userService;
	
	 @RequestMapping("/stream_analysis/allsource")
	 public ModelAndView index(String serverName, String requestURI, String uri) throws Exception {
        ModelAndView model = new ModelAndView("/index");
        return model;
    }
	 
	 /**
	  *  测试 插入List
	  * @return
	  * @throws Exception
	  */
	 @RequestMapping("/insertList")//@RequestParam(value = "ids[]") String[] ids
	 @ResponseBody
	 public JSONObject insertList() throws Exception {
          JSONObject obj =new JSONObject();
         /* for(int i=0;i<ids.length;i++){
        	  System.out.println(ids[i]);
          }*/
          
          List<User> list = new ArrayList<User>();
          for(int o=21;o<30;o++){
        	  User u = new User();
        	  u.setId(o);
        	  u.setUserName("ooo"+o);
        	  list.add(u);
          }
          int n = userService.insertForList(list);
          JSONArray jsonArray = new JSONArray();
          jsonArray.add(n);
          obj.put("paramKey", jsonArray);
          return obj;
    }
	 
	 @RequestMapping("/select")
	 public JSONObject selectForConditionWithMap(String id,String name){
		 Map<String,String> map = new HashMap<String,String>();
		 List<User> list = null;
		 JSONObject obj = new JSONObject();
		 try {
			  if(id !=null )//&& !"".equals(id)
				  map.put("userId", id);
			  if(name !=null )//&& !"".equals(name)
				  map.put("userName", name);  
			  
			  list = userService.selectByIdAndUserName(map);
			  obj.put("listUser",list);
		} catch (Exception e) {
			e.printStackTrace();
			logger.info("参数错误");
		}
		 return  obj;
	 }
	 
	 
	 
}
