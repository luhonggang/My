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


var startDate;
var endDate;
var dateValue=0;
var dataStartDate;
var table="trendAnalyse"
//初始查询日期  true代表第一次是从数据库查 
var lastDate=true;
/*------------------------------------------------------------------------------/
 * 1 init
/*-----------------------------------------------------------------------------*/
function beforeInit(){
	dateInit();
	uploadInit();
}

function init(){
	dateController();
	clearController();
}
function dateInit(){
	if(dateValue==0){
		dateValue++;
		getRecentDate();
	}else{
		var date=startDate+" - "+endDate;
		$('#date01').val(date);
	}
}

function uploadInit(){
	$(".importFileDay").datetimepicker({
		language:"zh-CN",
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
	});
}
function dateController(){
	$('#date01').daterangepicker({format: 'YYYY-MM-DD'}
	,function(start, end) {
		startDate=start.format('YYYY-MM-DD');
		endDate = end.format('YYYY-MM-DD');
		 var res=checkDatePicked(startDate,endDate);

	       if(res != 0 ){  //判断时间是否校验通过，即小于一年
	     	  return ;
	       }
		getDailyStaticByPage();
	});
}
function clearController(){
	$(".importFileModel").click(function(){
		$(".importFileDay").val("");
		$("#fileToUpload").val("");
	})
}
function showUploadModal(){//弹出上传界面
	$('#uploadModal').modal({
	      keyboard: true
	    });	
}

function checkDatePicked(date1,date2){
	
	var d1 = new Date(date1)
	var d2 = new Date(date2);

	var timestamp1 = parseInt(new Date(date1).getTime()/1000);    // date1时间戳
	var timestamp2 = parseInt(new Date(date2).getTime()/1000);    // date2当前时间戳

	 //31622400  366days
	$(".btn-blue").removeAttr("disabled");
	if(timestamp2-timestamp1>31622400 ||timestamp1>timestamp2){
		alert("不支持时间段超过366天的数据查询!");
		$("input[name='daterangepicker_start']").val(""); 
		$("input[name='daterangepicker_end']").val("");
		$(".btn-blue").attr("disabled","true");
		return 1;
	}
	return 0;
}

function submitUploadFile(){//上传文档
	var date=$(".importFileDay").val();
	if(date==null||date==""){
		alert("请选择日期！");
		return;
	}
     var jsonParam={
        "time":date,
       "type": "daily"
     };
	 $.ajaxFileUpload({  
	        url:'/visit/daily-analyse/upload',  
	        secureuri:false,  
	        fileElementId:'fileToUpload',//file标签的id  
	        dataType: 'json',//返回数据的类型  
	        data:jsonParam,//一同上传的数据  
	        success: function (data) {
	        	$(".importFileDay").val("");
        		$("#fileToUpload").val("");
	        	if(data.status==200||data.status=="200"){
	        		alert("导入成功");
	        		$("#uploadModal").modal("hide");
	        		getDailyStaticByPage();
	        		getTable();
	        		
	        	}else if(data.status==500|data.status=="500"){
	        		alert("导入失败");
	        		$("#uploadModal").modal("hide");
	        	}
	        	else if (data.status == 200001) {
					alert(data.msg);
					$("#uploadModal").modal("hide");
				}else if (data.status == 200002) {
					alert(data.msg);
					$("#uploadModal").modal("hide");
				}else if(data.status == 200003){
					alert(data.msg);
					$("#uploadModal").modal("hide");
				}
	        	else{
	        		alert("导入失败");
	        		$("#uploadModal").modal("hide");
	        	}
	         }	
	        });	
}


function getRecentDate(){
	$.ajax({
        type : 'GET',
        url : "/visit/daily-analyse/getRecentDate?table="+table,
        data : null,
        success : function(result) {
        	var recentDay;
        	var yestDate;
        	if(result.status==200){
        		recentDay=parseDate(result.msg);
        		yestDate=new Date(getDate(recentDay,1));
        	}else{
        		recentDay=new Date();
        		yestDate=new Date(getDate(recentDay,1));
        	}
        	endDate=getRegexDate(recentDay,"yyyy-MM-dd");
        	startDate=getRegexDate(recentDay,"yyyy-MM-dd");
        	var date=startDate+" - "+endDate;
        	$('#date01').val(date);
        	getDailyStaticByPage();
        },
        dataType : "json"
    });
}

//1page 加载分页 
//TODO 对不同的表要选择不同的type
function getDailyStaticByPage(){
	
	var jsonData={
			startTime:startDate,
			endTime:endDate,
			pageSize:10,
			pageNum:1
			
	};
	
	$("#dsTable").pagination({
		url: "/visit/daily-analyse/findTrendAnalysePage",
		paramJson:jsonData
	});	
	var dateDom=$("#tab01 tr:eq(1) td:eq(1)").text();
	if(undefined!=dateDom||""==dateDom){
		dataStartDate=dateDom;
		dateInit();
	}
}

//3页面初始化
$(function(){
	
	beforeInit();
	init();
    $(".importFileModel").on("click",showUploadModal);
    $(".submitUploadFile").on("click",submitUploadFile);
});


