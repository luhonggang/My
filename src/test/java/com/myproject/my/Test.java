package com.myproject.my;

import com.my.website.exception.ErrorCodeEnum;

/**
 *  枚举使用测试
 * @author LuHongGang
 * @date 2017年5月10日
 * @time 上午11:09:10
 * @since 1.0
 */
public class Test {

	public static void main(String[] args) {
		//values() : 该方法是一个隐式的方法，All the constants of an enum type can be obtained by calling the implicit public static T[] values() method of that type. 
		//用于遍历枚举中的所有的枚举常量。
		  for (ErrorCodeEnum e : ErrorCodeEnum.values()) {	
	            System.out.println(e.toString());
	        }
		  
		  // 枚举实例调用方法
		  System.out.println("错误码:"+ErrorCodeEnum.EXIST_BANK_CARD.getCode()+""
		  		+ " 错误信息:"+ErrorCodeEnum.EXIST_BANK_CARD.getMessage());
		  System.out.println(""+ErrorCodeEnum.RepeatSendException.getMessage());
		  // String name() 返回枚举常量声明时的字符串
		  System.out.println(ErrorCodeEnum.EXIST_BANK_CARD.name());
		  //int    ordinal() : 返回枚举常量的声明时的顺序位置，像数组的索引一样，从0开始。
		  System.out.println(ErrorCodeEnum.SUCCESS.ordinal());
		  /**valueOf(Class<T> enumType, String name) : 其实是从 枚举常量的字符串到 枚举常量的转换，相当于一个工厂方法。
		     name() 方法是从 枚举常量 到 字符串的转换，而 valueOf 是字符串到 枚举常量的转换。
		  **/
		  
		  
		  //4. enum相关的数据结构：EnumMap， EnumSet 具体可以参考jdk文档。

          //5. enum 相对于 常量的优势（略）
	}
	 
	
}
