//----------------------------------------------------------------------------
//时间工具类 获取某天时间 和格式化日期
//-----------------------------------------------------------------------------------
//传入今天和你要得到之前的第几天的数字，如果是昨天就写1,之前的30天就写30
function getDate(today,day){
	var selectDay=today-day* 24 * 60 * 60 * 1000;
	return selectDay;
}

//时间格式设置

Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

/*  
将String类型解析为Date类型.  
parseDate('2006-1-1') return new Date(2006,0,1)  
parseDate(' 2006-1-1 ') return new Date(2006,0,1)  
parseDate('2006-1-1 15:14:16') return new Date(2006,0,1,15,14,16)  
parseDate(' 2006-1-1 15:14:16 ') return new Date(2006,0,1,15,14,16);  
parseDate('2006-1-1 15:14:16.254') return new Date(2006,0,1,15,14,16,254)  
parseDate(' 2006-1-1 15:14:16.254 ') return new Date(2006,0,1,15,14,16,254)  
parseDate('不正确的格式') retrun null  
*/   
function parseDate(str){   
if(typeof str == 'string'){   
  var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);   
  if(results && results.length>3)   
    return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]));    
  results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);   
  if(results && results.length>6)   
    return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]));    
  results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);   
  if(results && results.length>7)   
    return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]),parseInt(results[7]));    
}   
return null;   
}   
 
/*  
将Date/String类型,解析为String类型.  
传入String类型,则先解析为Date类型  
不正确的Date,返回 ''  
如果时间部分为0,则忽略,只返回日期部分.  
*/   
function formatDate(v){   
if(typeof v == 'string') v = parseDate(v);   
if(v instanceof Date){   
  var y = v.getFullYear();   
  var m = v.getMonth() + 1;   
  var d = v.getDate();   
  var h = v.getHours();   
  var i = v.getMinutes();   
  var s = v.getSeconds();   
  var ms = v.getMilliseconds();      
  if(ms>0) return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s + '.' + ms;   
  if(h>0 || i>0 || s>0) return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;   
  return y + '-' + m + '-' + d;   
}   
return '';   
} 





/*<script language="javascript">
var myDate=new Date();

document.write(myDate.getYear().toString()+"<br>");//获取当前年份(2位)
document.write(myDate.getFullYear().toString()+"<br>");//获取当前完整的年份(4位,1970-????)
document.write(myDate.getMonth().toString()+"<br>");//获取当前月份(0-11,0代表1月)
document.write(myDate.getDate().toString()+"<br>");//获取当前日(1-31)
document.write(myDate.getDay().toString()+"<br>");//获取当前星期X(0-6,0代表星期天)
document.write(myDate.getTime().toString()+"<br>");//获取当前时间(从1970-1-1开始的毫秒数)
document.write(myDate.getHours().toString()+"<br>");//获取当前小时数(0-23)
document.write(myDate.getMinutes().toString()+"<br>");//获取当前分钟数(0-59)
document.write(myDate.getSeconds().toString()+"<br>");//获取当前秒数(0-59)
document.write(myDate.getMilliseconds().toString()+"<br>");//获取当前毫秒数(0-999)
document.write(myDate.toLocaleDateString().toString()+"<br>");//获取当前日期
</script>*/

//获取指定格式日期,day代表某一天的long数  regex代表转换为什么格式 比如yyyy-MM-dd的字符串
function getRegexDate(day,regex){
    return day.Format(regex);
}

function getJson(str){
	return eval("("+str+")");
}