package com.my.website.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.website.dao.UserMapper;
import com.my.website.entity.User;
import com.my.website.service.UserService;

import java.util.List;
import java.util.Map;

/**
 * 
 * @author LuHongGang
 * @date 2017年5月5日
 * @time 下午1:45:41
 * @since 1.0
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private  UserMapper userMapper;

    public int insert(User record) {
        return userMapper.insert(record);
    }

    public List<User> selectAll() {
        return userMapper.selectAll();
    }

    public List<User> selectByCondition(String userName) {
        return userMapper.selectByCondition(userName);
    }

	public int insertForList(List<User> user){
		return userMapper.insertForList(user);
	}

	public List<User> selectByIdAndUserName(Map<String, String> map) {
		
		return userMapper.selectByIdAndUserName(map);
	}
}
