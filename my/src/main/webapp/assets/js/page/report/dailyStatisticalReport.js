//----------------------------------------------------------------------------------
//0全局变量
//----------------------------------------------------------------------------------

//1.上数据统计
var dataStatic;
// 2.中指标
var index;
// 3.下分页;
var pageInfo;
var startDate;
var endDate;
var duration

var result;
var status;

var legandFlag;
var legandValue = 0
// ----------------------------------------------------------------------------------
// 1初始化
// ----------------------------------------------------------------------------------

function beforeInit() {
	// top
	dateInit();
	// middle
	buttonInit();
	selectInit();
	checkInit();
	// 1.上统计替换 2.中表刷新
	getData();
	// 3.下表异步分页
	getTable()
}
function Init() {
	// top------------------------------------------
	// 时间控件修改日期后触发ajax
	dateController();
	// middle---------------------------------------
	// 画折线图
}
// top----------------------------------------------
// 上方日期控件时间初始化，获取昨天和之前的30天
function dateInit() {
	// var today=new Date();
	// var yesterday=new Date(getDate(today,0));
	// var beforeThirtyDate=new Date(getDate(today,30));
	//	
	// endDate=getRegexDate(yesterday,"yyyy-MM-dd");
	// startDate=getRegexDate(beforeThirtyDate,"yyyy-MM-dd");
	// var date=startDate+" - "+endDate;
	// $('#date01').val(date);
	var currentDate = new Date();
	endDate = new Date();
	startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
	startDate = getRegexDate(startDate, "yyyy-MM-dd");
	endDate = getRegexDate(endDate, "yyyy-MM-dd");
	var date = startDate + " - " + endDate;
	$('#date01').val(date);

}

// middle----------------------------------------------
// 下拉框事件
function selectInit() {
	$("#indexSelect").click(function(e) {
		// alert("点击了"+event.srcElement.value);
//		 $("#selectBox input:eq(0)").attr("checked",true);
//		 $("#selectBox input:eq(1)").attr("checked",true);
		$("#popup:text").val(legandFlag);
	})
}

function checkInit() {
	
}

// 按钮事件
function buttonInit() {
	$("#dateMethod button").click(function(e) {
		// alert("点击了"+event.srcElement.value);
		duration = $(e.currentTarget).val();
		getData();
	});
}

// end-------------------------------------------------
// 1.1加载
// ----------------------------------------------------------------------------------
// 2上统计
// ----------------------------------------------------------------------------------
// 2.1时间控件日期设置
function dateController() {
	$('#date01').daterangepicker({
		format : 'YYYY-MM-DD'
	}, function(start, end) {
		startDate = start.format('YYYY-MM-DD');
		endDate = end.format('YYYY-MM-DD');
		var res = checkDatePicked(startDate, endDate);
		if (res != 0) { // 判断时间是否校验通过，即小于一年
			return;
		}
		// 1.上统计替换 2.中表刷新
		getData();
		// 3.下表异步分页
		getTable()

	});
	// 调用ajax
	// getData();
}
function checkDatePicked(date1, date2) {

	var d1 = new Date(date1)
	var d2 = new Date(date2);

	var timestamp1 = parseInt(new Date(date1).getTime() / 1000); // date1时间戳
	var timestamp2 = parseInt(new Date(date2).getTime() / 1000); // date2当前时间戳

	// 31622400 366days
	$(".btn-blue").removeAttr("disabled");
	if (timestamp2 - timestamp1 > 31622400 || timestamp1 > timestamp2) {
		alert("不支持时间段超过366天的数据查询!");
		$("input[name='daterangepicker_start']").val("");
		$("input[name='daterangepicker_end']").val("");
		$(".btn-blue").attr("disabled", "true");
		return 1;
	}
	return 0;
}
// 2.2ajax获取数据 替换上统计 中折线图
function getData() {
	if (null == duration || "" == duration) {
		duration = "byday";
	}
	var jsonData = {
		"startDate" : startDate,
		"endDate" : endDate,
		"duration" : duration
	};
	$.ajax({
		type : 'POST',
		url : "/visit/daily-analyse-report/entryReports",
		data : jsonData,
		success : function(obj) {
			status=obj.status;
			if (obj.status == 200 || obj.status == "200") {
				result = JSON.parse(obj.data);
				dataStatic = result.all;
				updateStatic();
				drawLinePic();
				return;
			}
			if (obj.status == 404 || obj.status == "404") {
				updateInit();
//				drawDefaultLinePic($("#linePic"));
				drawLinePic()
				return;
			}
			if (obj.status == 500 || obj.status == "500") {
				alert(obj.msg);
				updateInit();
//				drawDefaultLinePic($("#linePic"));
				drawLinePic();
				return;
			} 
			else {
//				drawDefaultLinePic($("#linePic"));
				drawLinePic();
			}
		},
		dataType : "json"
	});
};

function getTable() {
	var jsonData = {
		"startDate" : startDate,
		"endDate" : endDate,
		"duration" : duration
	};
	$.ajax({
		type : 'POST',
		url : "/visit/daily-analyse-report/getTable",
		data : jsonData,
		success : function(obj) {
			if (obj.status == 200 || obj.status == "200") {
				result = getJson(obj.data);
				// top 数据统计
				dataStatic = result.all;
				updateStatic();
			}
			if (obj.status == 500 || obj.status == "500") {
				alert(obj.msg);
				updateInit();
				return;
			}
			if (obj.status == 404 || obj.status == "404") {
				alert(obj.msg);
				updateInit();
				return;
			} else {
				alert("请求失败请联系管理员");
				updateInit();
			}
		},
		dataType : "json"
	});
}
// 2.3top节点替换数据
function updateStatic() {
	$("#stat .sum:eq(0)").text(dataStatic.pv);
	$("#stat .sum:eq(1)").text(dataStatic.uv);
	$("#stat .sum:eq(2)").text(dataStatic.ipNum);
	$("#stat .sum:eq(3)").text(dataStatic.visitNum);
	$("#stat .sum:eq(4)").text(dataStatic.newVisitNum);
}

function updateInit() {
	$("#stat .sum:eq(0)").text("--");
	$("#stat .sum:eq(1)").text("--");
	$("#stat .sum:eq(2)").text("--");
	$("#stat .sum:eq(3)").text("--");
	$("#stat .sum:eq(4)").text("--");
}

// ----------------------------------------------------------------------------------
// 3中图表查询
// ----------------------------------------------------------------------------------
// 3.1得到当前的check拼写select
function spell() {
	legandFlag = [];
	if (legandValue == 0) {
		$(".popup .margin-left-20 input").prop("checked", false);
		$(".popup .margin-left-20 input").eq(0).prop("checked", true);
		var str1 = $(".popup .margin-left-20").find(".text").eq(0).text();
		$(".popup .margin-left-20 input").eq(1).prop("checked", true);
		var str2 = $(".popup .margin-left-20").find(".text").eq(1).text();
		$("#popup").prop("value", str1 + "," + str2);
		legandFlag = [ '浏览量PV', '访问次数' ];
		legandValue++;
		return;
	}
	for (var i = 0; i < $(".popup .margin-left-20").length; i++) {
		var flag = $(".popup .margin-left-20").find("input").eq(i).prop("checked");
		var str = $(".popup .margin-left-20").find(".text").eq(i).text();
		if (flag) {
			legandFlag.push(str);
		}
	}
}
// 3.2画折线图
function drawLinePic(){
	spell();
	if(200==status||"200"==status){
		lineOption.xAxis[0].data=result.tpv.xdata
		lineOption.legend.data=[];
		lineOption.legend.data=getLineLegand();
		lineOption.legend.x ="right";
		lineOption.series=getLineSeries();
		lineChart.hideLoading();
	}else{
		lineOption.legend.data=[];
		lineOption.xAxis[0].data=[];
		lineOption.series=[0];
	}
	lineChart.clear();
	lineChart.setOption(lineOption);
}

function getLineLegand(){
	var legand=[];
	for (var i = 0; i < legandFlag.length; i++) {
		var nameFlag = legandFlag[i];
		if (nameFlag == "浏览量PV") {
			legand.push("浏览量PV");
			continue;
		}
		if (nameFlag == "访问次数") {
			legand.push("访问次数");
			continue;
		}
		if (nameFlag == "访客数UV") {
			legand.push("访客数UV");
			continue;
		}
		if (nameFlag == "新访客数") {
			legand.push("新访客数");
			continue;
		}
		if (nameFlag == "IP数") {
			legand.push("IP数");
			continue;
		}
		if (nameFlag == "新访客比率") {
			legand.push("新访客比率");
			continue;
		}
	}
	
	console.log(legand);
	$("#popup").val(legand)
	return legand;
}

function getLineSeries(){
	var series=[];
	var legendArr=getLineLegand();
	for (var i = 0; i < legendArr.length; i++) {
		var obj={};
		obj.type="line";
		obj.symbol="circle";
		obj.smooth=false;
		obj.itemStyle={};
		obj.itemStyle.normal={};
		var name = legendArr[i];
		if (name == "浏览量PV") {
			obj.itemStyle.normal.color= '#ff7f50';
			obj.data = result.tpv.ydata;
			obj.name="浏览量PV";
		}
		if (name == "访问次数") {
			obj.itemStyle.normal.color=  '#87cefa';
			obj.data = result.tVisitNum.ydata;
			obj.name="访问次数";
		}
		if (name == "访客数UV") {
			obj.itemStyle.normal.color=  '#da70d6';
			obj.data = result.tuv.ydata;
			obj.name="访客数UV";
		}
		if (name == "新访客数") {
			obj.itemStyle.normal.color=  '#32cd32';
			obj.data = result.tnewVisitNum.ydata;
			obj.name="新访客数";
		}
		if (name == "IP数") {
			obj.itemStyle.normal.color=  '#6495ed';
			obj.data = result.tipNum.ydata;
			obj.name="IP数";
		}
		if (name == "新访客比率") {
			obj.itemStyle.normal.color= '#ff69b4';
			obj.data = result.newVisitNumr.ydata;
			obj.name="新访客比率";
		}
		series.push(obj);
	}
	return series;
}

// 3.1下拉框时间绑定

// ----------------------------------------------------------------------------------
// 4下分页查询
// ----------------------------------------------------------------------------------
function getTable() {// 分页加载页面数据
	// alert(startDate+" "+endDate);
	var jsonData = {
		startTime : startDate,
		endTime : endDate,
		pageSize : 10,
		pageNum : 1,
	};
	$("#dailyTable").pagination({
		url : "/visit/daily-analyse-report/findTrendAnalyseReportPage",
		paramJson : jsonData
	});

}

// ----------------------------------------------------------------------------------
// 5加载方法
// ----------------------------------------------------------------------------------
$(function() {
	$("#downloadReports").on(
			"click",
			function() {
				var url = "/visit/daily-analyse-report/downTrendReport?startDate="
						+ startDate + "&endDate=" + endDate;
				window.location.href = url;
			});
	beforeInit();
	Init();

})