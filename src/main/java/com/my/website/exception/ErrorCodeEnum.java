package com.my.website.exception;

/**
 * 枚举类
 * 异常同意放置地方
 * enum 的本质
   >>>>>Java中的enum的本质是一个继承java.lang.Enum的类。所以他就比C风格的enum更加的强大。它可以又属性，方法，构造函数等等，
       下面看一个例子：
 * 说明:
 * 我们看到 ErrorCodeEnum  具有属性 String code 和 String message，并且具有一个构造函数。
 * 原因是我们的枚举常量需要使用这个构造函数的定义：SUCCESS(ErrorCode.SUUCCESS, "success")
 *  就是调用的枚举的构造函数： ErrorCodeEnum(String code, String message);
 *  所以其实ErrorCodeEnum 中定义的枚举常量 SUCCESS, RepeatSendException,MDPException .. 等其实就相当于 ErrorCodeEnum 的一个实例而已，
 *  因为它们是调用ErrorCodeEnum 的构造函数生成的。而 ErrorCodeEnum 的属性 String code 和 String message，
 * 是为了更好的提供更加详细的错误信息而定义的。而且在枚举ErrorCodeEnum中还可以定义其它的各种辅助方法。
 * >>>>>>>>所以枚举的本质是一个继承与java.lang.Enum的类，枚举常量就是枚举的一个个的实例<<<<<<<<
 */
public  enum ErrorCodeEnum{
	  SUCCESS(ErrorCode.SUUCCESS, "success")
    , RepeatSendException(ErrorCode.REPEAT_SEND,"手机[%s]在系统[%s]发送短信[%s]太快了，请稍后重试")
    , MDPException(ErrorCode.UNKNOW_EXCEPTION,"未知异常")
    , NotExistTemplateException(ErrorCode.NOT_EXIST_TEMPLATE,"没有对应的模板")
    , NotExistsOtpUUIDException(ErrorCode.NOT_EXIST_OTPUUID,"原来的OTP_UUID不存在，不能重发OTP")
    , OTPWrongException(ErrorCode.OTP_WRONG,"OTP不正确")
    ,NotExistUserException(ErrorCode.NOT_EXIST_USER,"用户[%s]不存在")
    ,OutTimeTokenException(ErrorCode.OUT_TIME_TOKEN,"token 失效")
    ,NotLoginException(ErrorCode.NOT_LOGIN,"用户未登录,请重新登录")
    ,NotExistTokenException(ErrorCode.NOT_EXIST_TOKEN,"不存在的token")
    ,SMSException(ErrorCode.SMS_EXCEPTION,"调用第三方短信服务异常")
    ,NOTBankCardException(ErrorCode.NOT_BANK_CARD,"银行卡号不存在")
    ,NOTExistProductException(ErrorCode.NOT_EXIST_PRODUCT,"相关信息不存在")
    ,SendSMSOutTimesException(ErrorCode.SEND_SMS_OUT_TIMES,"手机[%s]在系统[%s]发送短信超过[%s]次，请明天重试")
    ,CreditGatewayException(ErrorCode.SEND_SMS_OUT_TIMES,"调用征信网关校验异常")
    ,OTP_OUTTIME_EXCEPTION(ErrorCode.OTP_OUTTIME_EXCEPTION,"otp 过期")
    ,NOT_EXIST_USER_CARD_IMAGE(ErrorCode.NOT_EXIST_USER_CARD_IMAGE,"身份证图片没有上传")
    ,EXIST_USER_CARD(ErrorCode.EXIST_USER_CARD,"身份证已经登记")
    ,EXIST_USER_IMAGE(ErrorCode.NOT_EXIST_USER_IMAGE,"人脸信息已经上传，请勿重复上传")
    ,NOT_EXIST_USER_UPLOAD(ErrorCode.NOT_EXIST_USER_UPLOAD,"上传错误")
    ,NOT_EXIST_USER_CARD(ErrorCode.NOT_EXIST_USER_CARD,"不存在身份证信息")
    ,EXIST_USER_CARD_IMAGE(ErrorCode.EXIST_USER_CARD_IMAGE,"已经上传，请勿重复上传")
    ,NOT_SUPPORT_DEVICE_TYPE(ErrorCode.NOT_SUPPORT_DEVICE_TYPE,"不支持该设备类型")
    ,EXIST_ID_CARD(ErrorCode.EXIST_ID_CARD,"身份证信息已经被录入,请不要重复录入同一个身份证")
    ,EXIST_BANK_CARD(ErrorCode.EXIST_BANK_CARD,"银行卡信息已经被录入，请不要重复录入同一个银行卡")
    ,IDCRAD_NOT_EXIST(ErrorCode.IDCRAD_NOT_EXIST,"身份证信息不存在")
    ,EXIST_FINGER(ErrorCode.EXIST_FINGER,"指纹已经录入，请不要重复录入")
    ,NOT_EXIST_FINGER(ErrorCode.NOT_EXIST_FINGER,"用户没有录入指纹")
    ,LOAN_SAME_MORE_THAN(ErrorCode.LOAN_SAME_MORE_THAN,"今天您贷款同一个产品，已经超过三次，请明天再试")
    ;

    private String code;
    private String message;

    ErrorCodeEnum(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

}
