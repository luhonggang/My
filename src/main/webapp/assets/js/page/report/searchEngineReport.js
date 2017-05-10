//-----------------------------------------------------------------------------/
//全局变量
//-----------------------------------------------------------------------------/
var startDate;
var endDate;
var selectIndex;
var result;
var table = 'searchEngine'
var dataStatic;
var line;
var Circle;
var circleArray = new Array();
var chartName="浏览量(PV)";
// -----------------------------------------------------------------------------/
// 1init
// -----------------------------------------------------------------------------/
function showPicDetail(color, name, seriesName, num, rate) {
	$(".indexColor").css("background-color", color);
	$(".indexUrl").html(name);
	$(".indexNum").html($("#popup").val() + ": " + num);
	$(".indexRate").html("占比: " + rate + "%");
}
function clearPicDetail() {
	$(".indexColor").css("background-color", "");
	$(".indexUrl").html("");
	$(".indexNum").html("");
	$(".indexRate").html("");
}
function beforeInit() {
	// top
	dateInit();
	// 时间控件事件绑定
	// middle
	radionInit();
}

function init() {
	// top 和middle ajax

	// 时间控件
	dateController();
	// radio表单
	RadioController();
	// 选中哪个表调用ajax
	// top and middle
	getTopAndMiddleJSON();
	// bottom 分页表
	getTable();

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
function radionInit() {
	// $("#popup input:radio[name=form-field-radio]")[0]=true;

	$("#popup input:radio[value=Pv]").attr('checked', 'true');
	// $("#popup>input:text").attr("value",$("#popup
	// input:radio[name=form-field-radio]")[0].value);
	$("#popup>input:text").attr("value", "浏览量(PV)");
}
// -----------------------------------------------------------------------------/
// 2do
// -----------------------------------------------------------------------------/
// top
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
		// 重新加载页面
		getTopAndMiddleJSON();

		// 3.下表异步分页
		getTable()
	});

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
// middle
function RadioController() {
	$("#popup input:radio[name=form-field-radio]").click(
			function() {
				var radio = $("#popup input:radio[name=form-field-radio]")
				var len = radio.length;
				for (var i = 0; i < len; i++) {
					var flag = radio[i].checked
					if (flag) {
						selectIndex = radio[i].value;
						$("#popup>input:text").attr("value",$(radio[i]).next("span").html());
						// ajax请求新的指标
						// radio[0].next("span").html();
						chartName=$("#popup input:eq(0)").val();
						getTopAndMiddleJSON();
						getTable();
					}
				}
			})
}
// bottom

// -----------------------------------------------------------------------------/
// 3draw
// -----------------------------------------------------------------------------/
// 2.3top节点替换数据
function updateStatic() {
	$("#stat .sum:eq(0)").text(dataStatic.pv);
	$("#stat .sum:eq(1)").text(dataStatic.uv);
	$("#stat .sum:eq(2)").text(dataStatic.ip);
	$("#stat .sum:eq(3)").text(dataStatic.visitsNumber);
	$("#stat .sum:eq(4)").text(dataStatic.newVisitsNumber);
}

function updateInit() {
	$("#stat .sum:eq(0)").text("--");
	$("#stat .sum:eq(1)").text("--");
	$("#stat .sum:eq(2)").text("--");
	$("#stat .sum:eq(3)").text("--");
	$("#stat .sum:eq(4)").text("--");
}
// 3.1得到上方统计和中间图表的数据

function getTopAndMiddleJSON() {
	if (undefined == table || "" == table) {
		table = "searchEngine"
	}
	if (undefined == selectIndex || "" == selectIndex) {
		selectIndex = 'Pv'
	}
	if (undefined == startDate || undefined == endDate) {
		dateInit();
	}
	var jsonData = {
		"startTime" : startDate,
		"endTime" : endDate,
		"table" : table,
		"index" : selectIndex,
	}
	$.ajax({
		type : 'POST',
		url : "/visit/stream-analysis-report/getAllSourceReport",
		data : jsonData,
		success : function(obj) {
			if (obj.status == 500 || obj.status == "500") {
				updateInit();
				drawDefaultLinePic();
				drawDefaultCirclePic();
				alert(obj.msg);
				return;
			}
			if (obj.status == 404 || obj.status == "404") {
				updateInit();
				drawDefaultLinePic();
				drawDefaultCirclePic();
				return;
			}
			if (obj.status == 200 || obj.status == "200") {
				result = obj.data;
				// 统计指标的json
				dataStatic = result[0];
				updateStatic();
				if (result[1].length == 0) {
					updateInit();
					drawDefaultLinePic();
					drawDefaultCirclePic();
				} else {
					// 饼图json
					circle = result[1];
					drawCirclePic();
					// 折线图json
					line = result[2];
					drawLinePic();
				}
			} else {
				updateInit();
				drawDefaultLinePic();
				drawDefaultCirclePic();
			}
		},
		dataType : "json",
	});
}
// bottom
function getTable() {
	if (undefined == startDate || undefined == startDate) {
		dateInit();
	}
	if ("" == selectIndex || undefined == selectIndex) {
		RadioController();
	}
	var jsonData = {
		"startTime" : startDate,
		"endTime" : endDate,
		"index" : selectIndex,
		"table" : "searchEngine",
		"pageSize" : 10,
		"pageNum" : 1
	};

	$("#table").pagination({
		url : "/visit/stream-analysis-report/getPageInfo",
		paramJson : jsonData
	});
}
// -----------------------------------------------------------------------------/
// 4load
// -----------------------------------------------------------------------------/
// 3.2画折线图
function getCircleArray() {
	circleArray.length = 0;
	for (var i = 0; circle.length>3?i<3:i<circle.length; i++) {
		circleArray.push(circle[i].name);
	}
}
// 3.2画折线图
function drawLinePic() {
	getCircleArray();
	// 基于准备好的dom，初始化echarts图表
	var myChart = echarts.init(document.getElementById('line'));

	var option = {
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : [ '浏览量(PV)', '访问次数', '访客数(UV)', '新访客数', 'IP数' ],
			selected : {
				'浏览量(PV)' : true,
				'访问次数' : false,
				'访客数(UV)' : false,
				'新访客数' : false,
				'IP数' : false
			},
			x : 'right'
		},

		xAxis : [ {
			type : 'category',
			boundaryGap : false,
			data : [ '2015/06/10', '2015/06/10', '2015/06/10', '2015/06/10',
					'2015/06/10', '2015/06/10', '2015/06/10' ]
		} ],
		grid : {
			y : 10
		},
		yAxis : [ {
			type : 'value'
		} ],

		series : [ {
			name : '浏览量(PV)',
			type : 'line',
			symbol : 'circle',
			smooth : false,
			showAllSymbol : true,
			itemStyle : {
				showAllSymbol : true,
				normal : {
					showAllSymbol : true,
					lineStyle : { // 系列级个性化折线样式
						width : 2,

					}
				},
				emphasis : {
					color : 'blue'
				}
			},
			data : [ 120, 132, 101, 174, 90, 230, 210 ]
		}, {
			name : '访问次数',
			type : 'line',
			symbol : 'circle',
			smooth : false,
			lineStyle : {
				type : 'dashed'
			},
			data : [ 220, 182, 131, 234, 290, 330, 310 ]
		}, {
			name : '访客数(UV)',
			type : 'line',
			symbol : 'circle',
			smooth : false,
			stack : '总量',
			lineStyle : {
				type : 'dashed'
			},
			data : [ 220, 182, 191, 234, 290, 310, 310 ]
		}, {
			name : '新访客数',
			type : 'line',
			symbol : 'circle',
			smooth : false,
			stack : '总量',
			lineStyle : {
				type : 'dashed'
			},
			data : [ 220, 212, 191, 234, 290, 330, 310 ]
		}, {
			name : 'IP数',
			type : 'line',
			symbol : 'circle',
			smooth : false,
			stack : '总量',
			lineStyle : {
				type : 'dashed'
			},
			data : [ 220, 182, 191, 324, 290, 330, 310 ]
		}

		]
	};
	// 为echarts对象加载数据
	option.legend.data = [];
	option.xAxis[0].data = line[0];
	for (var i = 0; i < circleArray.length; i++) {
		option.series[i].name = circleArray[i];
		option.series[i].data = line[1][circleArray[i]];
	}
	myChart.setOption(option);
}

function drawCirclePic() {
	clearPicDetail();
	var myChart = echarts.init(document.getElementById('circle'));
	var option = {
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} <br/> {c} ({d}%)"
		},
		calculable : false,
		legend : {
			show : false,
			data : []
		},
		
		series : [ 
		          
		  {
			name : chartName,
			type : 'pie',
			radius : '40%',
			selectedMode : 'single',
			itemStyle : {
				normal:{
                    label:{
                        show:true,
                        formatter:"{b} ({d}%)"
                    },
                    labelLine:{
                        show:true
                    }
                }
			},
			data : [ {
				value : 335,
				name : '直接访问'
			}, {
				value : 310,
				name : '邮件营销'
			}, {
				value : 234,
				name : '联盟广告'
			}, {
				value : 135,
				name : '视频广告'
			}, {
				value : 1548,
				name : '搜索引擎'
			} ]
		} ]
	};
	myChart.on('click', function(param) {
		var color = myChart.component.legend.getColor(param.name);
		var name = param.name;
		var seriesName = param.seriesName;
		var num = param.value;
		var rate = param.special;
		showPicDetail(color, name, seriesName, num, rate);
	});

	option.series[0].data = circle;
	console.log(option.series[0].data)
	myChart.setOption(option);
}
$(function() {
	$("#downloadReports")
			.on(
					"click",
					function() {
						var url = "/visit/stream-analysis-report/downAllSourceReport?startDate="
								+ startDate
								+ "&endDate="
								+ endDate
								+ "&tabId="
								+ table;
						window.location.href = url;
					});
	beforeInit();
	init();
	drawLinePic();
	drawCirclePic();
})