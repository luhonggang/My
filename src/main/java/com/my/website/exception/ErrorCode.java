package com.my.website.exception;

/**
 * 放置错误码的全局变量
 * @author LuHongGang
 * @date 2017年5月10日
 * @time 上午11:08:45
 * @since 1.0
 */
public interface ErrorCode {

	public String SUUCCESS = "000000";// 表示成功
	public String REPEAT_SEND = "000001";// 重复发送验证码
	public String NOT_EXIST_TEMPLATE = "000002";// 不存在的模板
	public String NOT_EXIST_OTPUUID = "010001"; // optUUID 不存在
	public String OTP_WRONG = "010002"; // opt 错误
	public String NOT_EXIST_USER = "010003"; // 不存在的用户
	public String OUT_TIME_TOKEN = "010004";// token 失效
	public String NOT_LOGIN = "010005"; // 用户未登录
	public String NOT_EXIST_TOKEN = "010006";// token 不存在
	public String SMS_EXCEPTION = "900001"; // 调用第三方短信异常
	public String UNKNOW_EXCEPTION = "999999"; // 未知异常
	public String NOT_BANK_CARD = "010007"; // 未知异常
	public String NOT_EXIST_PRODUCT = "010008"; // 为查找的相关信息
	public String SEND_SMS_OUT_TIMES = "010009"; // 发生短信超过次数异常
	public String CREDIT_GATEWAY = "010010";// 征信网关异常
	public String OTP_OUTTIME_EXCEPTION = "010101";// otp 超过次数
	public String NOT_EXIST_USER_CARD_IMAGE = "100008";// 不存在身份证图片
	public String EXIST_USER_CARD = "100004";// 存在身份证
	public String NOT_EXIST_USER_IMAGE = "100007";// 不存在用户图片
	public String NOT_EXIST_USER_UPLOAD = "100005";// 用户上传异常
	public String NOT_EXIST_USER_CARD = "100009"; // 不存在用户身份证
	public String EXIST_USER_CARD_IMAGE = "100010";// 不存在用户图片
	public String NOT_SUPPORT_DEVICE_TYPE = "100010";// 不支持，该设备实现
	public String EXIST_ID_CARD = "100020";// 身份证信息已经存在
	public String EXIST_BANK_CARD = "100030";// 身份证信息已经存在
	public String EXIST_FINGER= "100040";// 指纹信息已经存在
	public String NOT_EXIST_FINGER= "100041";// 用户没有录入指纹
	public String IDCRAD_NOT_EXIST = "100031";// 身份不存在
	public String LOAN_SAME_MORE_THAN = "100041";// 同一款产品，贷款超过三次


}
