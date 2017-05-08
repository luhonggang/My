Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

var startDate;
var endDate;
var table = 'allSourceByType';
var initValue = 0;
var dataStartDate;
var dateValue = 0;
/*------------------------------------------------------------------------------/
 * 1 init
 /*-----------------------------------------------------------------------------*/

function beforeInit() {
	dateInit();
	tableInit();
	uploadInit();
}

function init() {
	dateController();
	tableController();
	clearController();
	uploadInit();
}
function uploadInit() {
	$(".importFileDay").datetimepicker({
		language : "zh-CN",
		todayBtn : 1,
		autoclose : 1,
		todayHighlight : 1,
		startView : 2,
		minView : 2,
		forceParse : 0
	});
}
function dateInit() {
	if (dateValue == 0) {
		dateValue++;
		getRecentDate();
	} else {
		var date = startDate + " - " + startDate;
		$('#date01').val(date);
	}
}

function tableInit() {
	if (initValue == 0) {
		table = "allSourceByType";
		initValue++;
		return;
	}
	if ($("#tab01").parent().hasClass("active")) {
		table = "allSource";
	} else if ($("#tab02").parent().hasClass("active")) {
		table = "allSourceByType";
	}
}

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
		getTable();
	});
}

function clearController() {
	$(".importFileModel").click(function() {
		$(".importFileDay").val("");
		$("#fileToUpload").val("");
	})
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

function updateDownLoad() {
	if (table == "allSource") {
		$("#fileToUpload").next().prop("href",
				"/visit/file-operation/downExcels?downPartName=allsourcebyWeb")
	} else if (table = "allSourceByType") {
		$("#fileToUpload").next().prop("href",
				"/visit/file-operation/downExcels?downPartName=allsourcebyType")
	}
}

function tableController() {
	$('#myTab li').on('click', function() {
		tableInit();
		getTable();
		updateDownLoad();
	})
}

function showUploadModal() {// 弹出上传界面
	$('#uploadModal').modal({
		keyboard : true
	});
}

function clearUploadFile() {
	$(".importFileDay").val("");
	$("#fileToUpload").val("");
}
function submitUploadFile() {// 上传文档

	var date = $(".importFileDay").val();
	if (date == null || date == "") {
		alert("请选择日期！");
		return;
	}
	var jsonParam = {
		"time" : date,
		"type" : table
	};
	$.ajaxFileUpload({
		url : '/visit/stream_analysis/upload',
		secureuri : false,
		fileElementId : 'fileToUpload',// file标签的id
		dataType : 'json',// 返回数据的类型
		data : jsonParam,// 一同上传的数据
		success : function(datas) {
			$(".importFileDay").val("");
			$("#fileToUpload").val("");
			if (datas.status == 200 || datas.status == "200") {
				alert("导入成功");
				$("#uploadModal").modal("hide");
				getTable();
			}else if (datas.status == 200001) {
				alert(datas.msg);
				$("#uploadModal").modal("hide");
			} else if (datas.status == 200002) {
				alert(datas.msg);
				$("#uploadModal").modal("hide");
			} 
			else {
				alert("导入失败");
				$("#uploadModal").modal("hide");
			}
		}
	});
}

function getRecentDate() {
	$.ajax({
		type : 'GET',
		url : "/visit/stream_analysis/getRecentDate?table=" + table,
		data : null,
		success : function(result) {
			var recentDay;
			var yestDate;
			if (result.status == 200) {
				recentDay = parseDate(result.msg);
				yestDate = new Date(getDate(recentDay, 1));
			} else {
				recentDay = new Date();
				yestDate = new Date(getDate(recentDay, 1));
			}
			endDate = getRegexDate(recentDay, "yyyy-MM-dd");
			startDate = getRegexDate(recentDay, "yyyy-MM-dd");
			var date = startDate + " - " + endDate;
			$('#date01').val(date);
			getTable();
		},
		dataType : "json"
	});
}
//
// 1page 加载分页
function getTable() {
	console.log(table);
	var jsonData = {
		startTime : startDate,
		endTime : endDate,
		table : table,
		pageSize : 10,
		pageNum : 1
	}
	if ("allSourceByType" == table) {
		$("#asbtTable").pagination({
			url : '/visit/stream_analysis/getAllSourceByTypePage',// 加载分页页面的url
			paramJson : jsonData
		});
	} else if ("allSource" == table) {
		$("#asTable").pagination({
			url : '/visit/stream_analysis/getAllSourceByTypePage',// 加载分页页面的url
			paramJson : jsonData
		});

	}
};

// function (callback){
// setTimeout(function () {callback();
// if("allSourceByType"==table){
// var dateDom=$("#tab1 tr:eq(1) td:eq(1)").text().trim();
// if(undefined!=dateDom||""==dateDom){
// dataStartDate=dateDom;
// dateInit();
// }
// }else if("allSource"==table){
// var dateDom=$("#tab2 tr:eq(1) td:eq(1)").text().trim();
// if(undefined!=dateDom||""!=dateDom){
// dataStartDate=dateDom;
// console.log("dataStartDate "+dataStartDate);
// dateInit();
// }
// }
// }, 2000);
// }
// 3页面初始化
$(function() {
	getRecentDate();
	beforeInit();
	init();
	$(".importFileModel").on("click", showUploadModal);
	$(".submitUploadFile").on("click", submitUploadFile);
});
