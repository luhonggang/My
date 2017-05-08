package com.my.website.util;

/**
 *  json 封装类
 * @author LuHongGang
 * @date 2017年5月5日
 * @time 下午2:12:28
 * @since 1.0
 */
public class ResultInfo {
    // 响应业务状态
    private String status;

    // 响应消息
    private String msg;

    // 响应中的数据
    private Object data;

    // build方法
    public static ResultInfo build(String status, String msg, Object data) {
        return new ResultInfo(status, msg, data);
    }

    // ok方法
    public static ResultInfo ok(Object data) {
        return new ResultInfo(data);
    }

    public static ResultInfo ok() {
        return new ResultInfo(null);
    }

    // 构造方法
    public ResultInfo() {

    }

    public static ResultInfo build(String status, String msg) {
        return new ResultInfo(status, msg, null);
    }

    public ResultInfo(String status, String msg, Object data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }

    public ResultInfo(Object data) {
        this.status = "200";
        this.msg = "OK";
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
