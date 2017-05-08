package com.myproject.my;

import java.io.IOException;
import java.text.SimpleDateFormat;

//import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;


@Controller
public class IndexController {
   /*@Autowired
   private  domainAnalyzeService;
	
	@RequestMapping("/index")
    public ModelAndView authority(String serverName, String requestURI, String uri) throws Exception {
        ModelAndView model = new ModelAndView("index");
        DomainAnalyze obj = domainAnalyzeService.findDomainAnalyzeById(3288l);
        model.addObject("result", obj);
        return model;
    }
	
	  @RequestMapping(value = "/test", method = RequestMethod.GET)
	  @ResponseBody
	    public ResultInfo getRecentDate(String table) throws Exception {
		  JSONObject result = new JSONObject();
		  result.put("result", "ok");
	      return ResultInfo.ok(result);
	    }
*/
	
}
