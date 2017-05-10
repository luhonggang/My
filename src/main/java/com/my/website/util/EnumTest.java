package com.my.website.util;

/**
 * @author LuHongGang
 * @date 2017年5月10日
 * @time 上午10:12:50
 * @since 1.0
 * enum 的本质

Java中的enum的本质是一个继承java.lang.Enum的类。所以他就比C风格的enum更加的强大。它可以又属性，方法，构造函数等等，下面看一个例子：
 */
public enum EnumTest {
    MON, TUE, WED, THU, FRI, SAT, SUN;
}

