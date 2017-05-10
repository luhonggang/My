package com.my.website.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.my.website.entity.User;
import com.my.website.service.UserService;
import com.my.website.util.ResultInfo;


@RestController
public class IndexController {
	@Autowired
	private UserService userService;
	
	private final static Logger logger = LoggerFactory
			.getLogger(IndexController.class);
	
	@RequestMapping(value="/load",method = RequestMethod.GET)
	@ResponseBody
    public ResultInfo authority(String serverName, String requestURI, String uri) throws Exception {
       // ModelAndView model = new ModelAndView("index");
        List<User> users = userService.selectAll();
       // model.addObject("result", obj);
        return ResultInfo.ok(users);
    }
	
	@RequestMapping("/index")
	//@ResponseBody
    public ModelAndView index(String serverName, String requestURI, String uri) throws Exception {
        ModelAndView model = new ModelAndView("/index");
       // List<User> users = userService.selectAll();
       // model.addObject("result", obj);
        return model;
    }
}
