//-----------------------------------------------------------------------------
//全局变量
//-----------------------------------------------------------------------------
var startDate;
var endDate;
var selectTable = 'allSourceByType';
var selectIndex;
var result;
var initValue;

var dataStatic;
var line;
var Circle;

var circleArray = new Array();
var circleOption;

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
	initValue = 0;
	// top
	dateInit();
	tableInit();
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
	RadioController2();
	// table切换事件
	tableController();
	// top and middle
	getTopAndMiddleJSON();
	// bottom 分页表
	getTable();
}
// top----------------------------------------------
// 上方日期控件时间初始化，获取昨天和之前的30天
function dateInit() {
	var currentDate = new Date();
	endDate = new Date();
	startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
	startDate = getRegexDate(startDate, "yyyy-MM-dd");
	endDate = getRegexDate(endDate, "yyyy-MM-dd");
	var date = startDate + " - " + endDate;
	$('#date01').val(date);
}

function tableInit() {
	if (initValue == 0) {
		selectTable = 'allSourceByType';
		initValue++;
		return;
	}
	if ($(".tab-content #tab2").hasClass("active")) {
		selectTable = 'allSourceByType';
	}
	if ($(".tab-content #tab1").hasClass("active")) {
		selectTable = 'allSource';
	}
}

function radionInit() {
	$("#popup input:radio[value=Pv]").attr('checked', 'true');
	$("#popup2 input:radio[value=Pv]").attr('checked', 'true');
	$("#popup>input:text").attr("value", "浏览量(PV)");
	$("#popup2>input:text").attr("value", "浏览量(PV)");
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
var chartName="浏览量(PV)";
function RadioController() {
	$("#popup input:radio[name=form-field-radio]").click(function() {
		var radio = $("#popup input:radio[name=form-field-radio]")
		var len = radio.length;
		for (var i = 0; i < len; i++) {
			var flag = radio[i].checked
			if (flag) {
				chartName=$("#popup input:eq(0)").val();
				selectIndex = radio[i].value;
				// ajax请求新的指标
				getTopAndMiddleJSON();
			}
		}
	})
}
var chartName2="浏览量(PV)";
function RadioController2() {
	$("#popup2 input:radio[name=form-field-radio1]").click(function() {
		var radio = $("#popup2 input:radio[name=form-field-radio1]");
		var len = radio.length;
		for (var i = 0; i < len; i++) {
			var flag = radio[i].checked
			if (flag) {
				chartName2=$("#popup2 input:eq(0)").val();
				selectIndex = radio[i].value;
				// ajax请求新的指标
				getTopAndMiddleJSON();
				getTable();
			}
		}
	})
}
function tableController() {
	$("#myTab").click(function() {
		tableInit();
		getTopAndMiddleJSON();
		getTable();
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
	if (undefined == selectTable || "" == selectTable) {
		selectTable = "allSourceByType"
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
		"index" : selectIndex,
		"table" : selectTable
	}
	$.ajax({
		type : 'POST',
		url : "/visit/stream-analysis-report/getAllSourceReport",
		data : jsonData,
		success : function(obj) {
			if (obj.status == 500 || obj.status == "500") {
				drawDefaultCirclePic();
				drawDefaultLinePic();
				updateInit();
				return;
			}
			if (obj.status == 404 || obj.status == "404") {
				drawDefaultLinePic();
				drawDefaultCirclePic();
				updateInit();
				return;
			}
			if (obj.status == 200 || obj.status == "200") {
				result = obj.data;
				
				console.debug(result)
				
				// 统计指标的json
				dataStatic = result[0];
				updateStatic();
				// 饼图json
				if (result[1].length == 0) {
					updateInit();
					drawDefaultLinePic();
					drawDefaultCirclePic();
					return;
				} else {
					circle = result[1];
					getCirclePic();
					// 折线图json
					line = result[2];
					getLinePic();
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
	if ("" == selectIndex || null == selectIndex) {
		RadioController();
	}
	var jsonData = {
		"startTime" : startDate,
		"endTime" : endDate,
		"index" : selectIndex,
		"table" : selectTable,
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
function getCircleArray() {
	circleArray.length = 0;
	for (var i = 0; i < circle.length; i++) {
		circleArray.push(circle[i].name);
	}
}
// 3.2画折线图
function getLinePic() {
	if (undefined == selectTable) {
		tableInit();
		// getCircleArray();
	}
	if ("allSourceByType" == selectTable) {
		getCircleArray();
		drawLinePic();

	} else if ("allSource" == selectTable) {
		getCircleArray();
		drawLinePic2();
	}
};
function getCirclePic() {
	if (undefined == selectTable) {
		console.debug(1)
		tableInit();
	}
	if ("allSourceByType" == selectTable) {
		console.debug(2)
		drawCirclePic();
		getCircleArray();
	} else if ("allSource" == selectTable) {
		console.debug(3)
		drawCirclePic2();
		getCircleArray();
	}
}
var lineChart1;
var lineOption;
function drawLinePic() {
	// 基于准备好的dom，初始化echarts图表
	lineChart1 = echarts.init(document.getElementById('line'));
	lineOption = {
		noDataLoadingOption : {
			text : " "
		},
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
			data : []
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
			data : [0]
		}, {
			name : '访问次数',
			type : 'line',
			symbol : 'circle',
			data : [0]
		}, {
			name : '访客数(UV)',
			type : 'line',
			symbol : 'circle',
			data : [0]
		}, {
			name : '新访客数',
			type : 'line',
			symbol : 'circle',
			data : [0]
		}, {
			name : 'IP数',
			type : 'line',
			symbol : 'circle',
			data : [0]
		}

		]
	};
	// 为echarts对象加载数据
	lineOption.legend.data = [];
	lineOption.xAxis[0].data = line[0];
	for (var i = 0; i < circleArray.length; i++) {
		lineOption.series[i].name = circleArray[i];
		lineOption.series[i].data = line[1][circleArray[i]];
	}
	lineChart1.setOption(lineOption);
}

var circleChart1;
var circleOption;
function drawCirclePic() {
	console.debug("draw circle")
	clearPicDetail();
	var circleChart1 = echarts.init(document.getElementById('circle'));

	circleOption = {
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} <br/> {c} ({d}%)"
		},
		legend : {
			show : false,
			data : []
		},

		calculable : false,
		series : [ {
			name : chartName,
			type : 'pie',
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
			radius : '55%',
			// center : [ '50%', '60%' ],
			selectedMode : 'single',
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
	circleChart1.on('click', function(param) {
		var color = circleChart1.component.legend.getColor(param.name);
		var name = param.name;
		var seriesName = param.seriesName;
		var num = param.value;
		var rate = param.special;
		showPicDetail(color, name, seriesName, num, rate);
	});

	circleOption.series[0].data = circle;
	console.log(circleOption.series[0].data)
	circleChart1.setOption(circleOption);
}
var lineOption2;
var lineChart2;
function drawLinePic2() {
	// 基于准备好的dom，初始化echarts图表
	var lineChart2 = echarts.init(document.getElementById('line2'));
	lineOption2 = {
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

		grid : {
			y : 10
		},
		xAxis : [ {
			type : 'category',
			boundaryGap : false,
			data : [ '2015/06/10', '2015/06/10', '2015/06/10', '2015/06/10',
					'2015/06/10', '2015/06/10', '2015/06/10' ]
		} ],
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
			data : []
		}, {
			name : '访问次数',
			type : 'line',
			symbol : 'circle',
			smooth : false,
			lineStyle : {
				type : 'dashed'
			},
			data : []
		}, {
			name : '访客数(UV)',
			type : 'line',
			symbol : 'circle',
			smooth : false,
			stack : '总量',
			lineStyle : {
				type : 'dashed'
			},
			data : []
		}, {
			name : '新访客数',
			type : 'line',
			symbol : 'circle',
			smooth : false,
			stack : '总量',
			lineStyle : {
				type : 'dashed'
			},
			data : []
		}, {
			name : 'IP数',
			type : 'line',
			symbol : 'circle',
			smooth : false,
			stack : '总量',
			lineStyle : {
				type : 'dashed'
			},
			data : []
		}

		]
	};
	// 为echarts对象加载数据
	// option.series.data=null;

	lineOption2.legend.data = [];
	lineOption2.xAxis[0].data = line[0];
	for (var i = 0; circleArray.length < 3 ? i < circleArray.length : i < 3; i++) {
		lineOption2.series[i].name = circleArray[i];
		lineOption2.series[i].data = line[1][circleArray[i]];
	}
	lineChart2.setOption(lineOption2);
}

var circleChart2;
var circleOption2;
function drawCirclePic2() {
	clearPicDetail();
	var circleChart2 = echarts.init(document.getElementById('circle2'));

	var circleOption2 = {
		noDataLoadingOption : {
			text : " ",
			effect : 'bubble',
			effectOption : {
				effect : {
					n : 0
				}
			}
		},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} <br/> {c} ({d}%)"
		},
		legend : {
			show : false,
			data : []
		},
		calculable : false,
		series : [ {
			name : chartName2,
			type : 'pie',
			radius : '75%',
			center : [ '50%', '60%' ],
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
	circleChart2.on('click', function(param) {
		var color = circleChart2.component.legend.getColor(param.name);
		var name = param.name;
		var seriesName = param.seriesName;
		var num = param.value;
		var rate = param.special;
		showPicDetail(color, name, seriesName, num, rate);
	});

	circleOption2.series[0].data = circle;
	console.log(circleOption2.series[0].data)
	circleChart2.setOption(circleOption2);

}

$(function() {
	$("a[name='downloadReports']")
			.on(
					"click",
					function() {
						var url = "/visit/stream-analysis-report/downAllSourceReport?startDate="
								+ startDate
								+ "&endDate="
								+ endDate
								+ "&tabId="
								+ selectTable;
						window.location.href = url;
					});
	beforeInit();
	init();
})