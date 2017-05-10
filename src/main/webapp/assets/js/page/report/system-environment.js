/**
 * @author liupc
 * @time：2016年5月26日
 */
reloadDaterangepicker();
// 刷新时间
function reloadDaterangepicker() {
	var curDate = new Date();
	var endDate = curDate.setMonth(curDate.getMonth() - 1);
	$('#date01').daterangepicker({
		format : 'YYYY-MM-DD',
		startDate : curDate,
		endDate : endDate
	}, function(start, end) {
		buttonReloadData();
	});
}

// 刷新数据库最新时间
// reloadDaterangepicker("browser");
// function reloadDaterangepicker(type){
// var jsonData={"table":type};
// $.ajax({
// type : 'POST',
// url : "/visit/reportaccess_analysis/system-environment/loadMaxTime",
// data: jsonData,
// async: false,
// dataType : "json",
// enctype: 'application/json;charset=utf-8',
// success : function(data) {
// if(data.status==200){
// var curDate=new Date(data.data);
// reloadDaterangepickerDate(curDate);
// }else{
// alert(data.msg);
// }
// }
// });
// }
// function reloadDaterangepickerDate(curDate){
// var startTime= curDate.setMonth(curDate.getMonth()-1);
// startTime=new Date(startTime);
// var endDate= curDate.setMonth(curDate.getMonth()+1);
// endDate=new Date(endDate);
// $('#date01').daterangepicker({
// format: 'YYYY-MM-DD',
// startDate:startTime,
// endDate:endDate
// },function(start, end){
// buttonReloadData();
// });
// }
// --指标下拉窗口
var popupMethod = function(id, box) {
	$(id).click(
			function() {
				if ($(box).is(':hidden')) {
					$(box).show();
					$(this).find('i').removeClass('fa-sort-desc').addClass(
							'fa-sort-asc padding-top-10');
				} else {
					$(box).hide();
					$(this).find('i').removeClass('fa-sort-asc padding-top-10')
							.addClass('fa-sort-desc');
				}
			});
	$(id).find('.text').click(function() {
		$(id).find('input:first').val($(this).text());
	})
}

popupMethod('#popup', '#popup-box');
popupMethod('#popup2', '#popup-box2');
popupMethod('#popup3', '#popup-box3');
popupMethod('#popup4', '#popup-box4');
popupMethod('#popup5', '#popup-box5');
popupMethod('#popup6', '#popup-box6');
popupMethod('#popup7', '#popup-box7');
popupMethod('#popup8', '#popup-box8');
popupMethod('#popup9', '#popup-box9');

// 第一次进来
firstEnter();

function firstEnter() {
	// 请求分页
	requestPaginationFirst();
	// 请求柱状图
	requestBargraphFirst();
	// 总计
	loadTotalPageValueFirst();
}
// 第一次请求分页
function requestPaginationFirst() {
	var timeSpan = $('#date01').val();
	var start = timeSpan.substring(0, 10);
	var end = timeSpan.substring(13, 23);
	var json = {
		"table" : "browser",
		"startTime" : start,
		"endTime" : end
	};
	$("#browserReportTable").pagination({
		url : '/visit/reportaccess_analysis/system-environment/page',// 加载分页页面的url
		paramJson : json
	});
}
// 第一次请求柱状图
function requestBargraphFirst() {
	var timeSpan = $('#date01').val();
	var start = timeSpan.substring(0, 10);
	var end = timeSpan.substring(13, 23);
	var json = {
		"table" : "browser",
		"startTime" : start,
		"endTime" : end
	};
	requestBargraph(json, "browser");
}
// 获取总的参数
function loadTotalPageValueFirst() {
	var timeSpan = $('#date01').val();
	var start = timeSpan.substring(0, 10);
	var end = timeSpan.substring(13, 23);
	var table = transTableType();
	var jsonData = {
		"table" : table,
		"startTime" : start,
		"endTime" : end
	};
	loadTotalPageValue(jsonData);
}

function loadTotalPageValue(jsonData) {
	$.ajax({
		type : 'POST',
		url : "/visit/reportaccess_analysis/system-environment/loadTotalValue",
		data : jsonData,
		dataType : "json",
		enctype : 'application/json;charset=utf-8',
		success : function(data) {
			var tab;
			if (jsonData.table == "browser") {
				tab = "#tab1";
			} else if (jsonData.table == "os") {
				tab = "#tab2";
			} else if (jsonData.table == "screen") {
				tab = "#tab3";
			} else if (jsonData.table == "color") {
				tab = "#tab4";
			} else if (jsonData.table == "flash") {
				tab = "#tab5";
			} else if (jsonData.table == "isjava") {
				tab = "#tab6";
			} else if (jsonData.table == "language") {
				tab = "#tab7";
			} else if (jsonData.table == "iscookie") {
				tab = "#tab8";
			} else if (jsonData.table == "isp") {
				tab = "#tab9";
			}
			if (data.status == 200) {
				var totalPv = data.data.totalPv;
				var totalUv = data.data.totalUv;
				var totalIp = data.data.totalIp;
				var totalVisitcount = data.data.totalVisitcount;
				var totalNewvisitorcount = data.data.totalNewvisitorcount;
				$("" + tab + " #tab1count1").html(totalPv);
				$("" + tab + " #tab1count2").html(totalUv);
				$("" + tab + " #tab1count3").html(totalIp);
				$("" + tab + " #tab1count4").html(totalVisitcount);
				$("" + tab + " #tab1count5").html(totalNewvisitorcount);
			} else {
//				alert(data.msg);
				$("" + tab + " #tab1count1").html("--");
				$("" + tab + " #tab1count2").html("--");
				$("" + tab + " #tab1count3").html("--");
				$("" + tab + " #tab1count4").html("--");
				$("" + tab + " #tab1count5").html("--");
			}
		}
	});
}
// 返回table英文的类型
function transTableType() {
	var type = $("#myTab .active").text();
	return transTableType2(type);
}

function transTableType2(type) {
	if ("浏览器" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		return "browser";
	} else if ("网络设备类型" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		return "os";
	} else if ("屏幕分辨率" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		return "screen";
	} else if ("屏幕颜色" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		return "color";
	} else if ("flash版本" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		return "flash";
	} else if ("是否支持java" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		return "isjava";
	} else if ("语言环境" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		return "language";
	} else if ("是否支持cookie" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		return "iscookie";
	} else if ("网络提供商" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		return "isp";
	}
}

// 点击table切换时
$('#myTab li').on('show.bs.tab', function(e) {
	// var beforeType =transTableType();
	// var popId="popup-box-"+beforeType;
	var type = $(e.currentTarget).attr("data");
	// alert(type);
	if ("llq" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		// reloadDaterangepicker();
		var timeSpan = $('#date01').val();
		var start = timeSpan.substring(0, 10);
		var end = timeSpan.substring(13, 23);
		var jsonData = {
			"table" : "browser",
			"startTime" : start,
			"endTime" : end
		};
		$("#browserReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',// 加载分页页面的url
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "browser");
	} else if ("wlsblx" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		// reloadDaterangepicker();
		var timeSpan = $('#date01').val();
		var start = timeSpan.substring(0, 10);
		var end = timeSpan.substring(13, 23);
		var jsonData = {
			"table" : "os",
			"startTime" : start,
			"endTime" : end
		};
		$("#osReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',// 加载分页页面的url
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "os");
	} else if ("pmfbl" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		// reloadDaterangepicker();
		var timeSpan = $('#date01').val();
		var start = timeSpan.substring(0, 10);
		var end = timeSpan.substring(13, 23);
		var jsonData = {
			"table" : "screen",
			"startTime" : start,
			"endTime" : end
		};
		$("#screenReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',// 加载分页页面的url
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "screen");
	} else if ("pmys" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		// reloadDaterangepicker();
		var timeSpan = $('#date01').val();
		var start = timeSpan.substring(0, 10);
		var end = timeSpan.substring(13, 23);
		var jsonData = {
			"table" : "color",
			"startTime" : start,
			"endTime" : end
		};
		$("#colorReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',// 加载分页页面的url
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "color");
	} else if ("fbb" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		// reloadDaterangepicker();
		var timeSpan = $('#date01').val();
		var start = timeSpan.substring(0, 10);
		var end = timeSpan.substring(13, 23);
		var jsonData = {
			"table" : "flash",
			"startTime" : start,
			"endTime" : end
		};
		$("#flashReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',// 加载分页页面的url
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "flash");
	} else if ("yyhj" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		// reloadDaterangepicker();
		var timeSpan = $('#date01').val();
		var start = timeSpan.substring(0, 10);
		var end = timeSpan.substring(13, 23);
		var jsonData = {
			"table" : "language",
			"startTime" : start,
			"endTime" : end
		};
		$("#languageReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',// 加载分页页面的url
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "language");
	} else if ("sscookie" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		// reloadDaterangepicker();
		var timeSpan = $('#date01').val();
		var start = timeSpan.substring(0, 10);
		var end = timeSpan.substring(13, 23);
		var jsonData = {
			"table" : "iscookie",
			"startTime" : start,
			"endTime" : end
		};
		$("#iscookieReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',// 加载分页页面的url
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "iscookie");
	} else if ("wltgs" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		// reloadDaterangepicker();
		var timeSpan = $('#date01').val();
		var start = timeSpan.substring(0, 10);
		var end = timeSpan.substring(13, 23);
		var jsonData = {
			"table" : "isp",
			"startTime" : start,
			"endTime" : end
		};
		$("#ispReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',// 加载分页页面的url
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "isp");
	} else if ("ssjava" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		// reloadDaterangepicker();
		var timeSpan = $('#date01').val();
		var start = timeSpan.substring(0, 10);
		var end = timeSpan.substring(13, 23);
		var jsonData = {
			"table" : "isjava",
			"startTime" : start,
			"endTime" : end
		};
		$("#isjavaReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',// 加载分页页面的url
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "isjava");
	}
});

// 时间button 重新加载
function buttonReloadData() {
	var startTime = $("input[name='daterangepicker_start']").val()
	var endTime = $("input[name='daterangepicker_end']").val()
	var type = $("#myTab .active").text();
	if ("浏览器" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		var jsonData = {
			"table" : "browser",
			"startTime" : startTime,
			"endTime" : endTime
		};
		$("#browserReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "browser");
	} else if ("网络设备类型" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		var jsonData = {
			"table" : "os",
			"startTime" : startTime,
			"endTime" : endTime
		};
		$("#osReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "os");
	} else if ("屏幕分辨率" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		var jsonData = {
			"table" : "screen",
			"startTime" : startTime,
			"endTime" : endTime
		};
		$("#screenReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "screen");
	} else if ("屏幕颜色" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		var jsonData = {
			"table" : "color",
			"startTime" : startTime,
			"endTime" : endTime
		};
		$("#colorReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "color");
	} else if ("flash版本" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		var jsonData = {
			"table" : "flash",
			"startTime" : startTime,
			"endTime" : endTime
		};
		$("#flashReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "flash");
	} else if ("是否支持java" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		var jsonData = {
			"table" : "isjava",
			"startTime" : startTime,
			"endTime" : endTime
		};
		$("#isjavaReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "isjava");
	} else if ("语言环境" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		var jsonData = {
			"table" : "language",
			"startTime" : startTime,
			"endTime" : endTime
		};
		$("#languageReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "language");
	} else if ("是否支持cookie" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		var jsonData = {
			"table" : "iscookie",
			"startTime" : startTime,
			"endTime" : endTime
		};
		$("#iscookieReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "iscookie");
	} else if ("网络提供商" == type.replace(/(^\s*)|(\s*$)/g, "")) {
		var jsonData = {
			"table" : "isp",
			"startTime" : startTime,
			"endTime" : endTime
		};
		$("#ispReportTable").pagination({
			url : '/visit/reportaccess_analysis/system-environment/page',
			paramJson : jsonData
		});
		loadTotalPageValue(jsonData);
		requestBargraph(jsonData, "isp");
	}
}

// 下载按钮,下载excel
$("#systemDownload1")
		.click(
				function() {
					var startTime = $("input[name='daterangepicker_start']")
							.val()
					var endTime = $("input[name='daterangepicker_end']").val()
					var type = "browser";
					window.location.href = "/visit/reportaccess_analysis/system-environment/dataDownloadByStarttimeAndEndtime?table="
							+ type
							+ "&startTime="
							+ startTime
							+ "&endTime="
							+ endTime;
				});
$("#systemDownload2")
		.click(
				function() {
					var startTime = $("input[name='daterangepicker_start']")
							.val()
					var endTime = $("input[name='daterangepicker_end']").val()
					var type = "os";
					window.location.href = "/visit/reportaccess_analysis/system-environment/dataDownloadByStarttimeAndEndtime?table="
							+ type
							+ "&startTime="
							+ startTime
							+ "&endTime="
							+ endTime;
				});
$("#systemDownload3")
		.click(
				function() {
					var startTime = $("input[name='daterangepicker_start']")
							.val()
					var endTime = $("input[name='daterangepicker_end']").val()
					var type = "screen";
					window.location.href = "/visit/reportaccess_analysis/system-environment/dataDownloadByStarttimeAndEndtime?table="
							+ type
							+ "&startTime="
							+ startTime
							+ "&endTime="
							+ endTime;
				});
$("#systemDownload4")
		.click(
				function() {
					var startTime = $("input[name='daterangepicker_start']")
							.val()
					var endTime = $("input[name='daterangepicker_end']").val()
					var type = "color";
					window.location.href = "/visit/reportaccess_analysis/system-environment/dataDownloadByStarttimeAndEndtime?table="
							+ type
							+ "&startTime="
							+ startTime
							+ "&endTime="
							+ endTime;
				});
$("#systemDownload5")
		.click(
				function() {
					var startTime = $("input[name='daterangepicker_start']")
							.val()
					var endTime = $("input[name='daterangepicker_end']").val()
					var type = "flash";
					window.location.href = "/visit/reportaccess_analysis/system-environment/dataDownloadByStarttimeAndEndtime?table="
							+ type
							+ "&startTime="
							+ startTime
							+ "&endTime="
							+ endTime;
				});
$("#systemDownload6")
		.click(
				function() {
					var startTime = $("input[name='daterangepicker_start']")
							.val()
					var endTime = $("input[name='daterangepicker_end']").val()
					var type = "isjava";
					window.location.href = "/visit/reportaccess_analysis/system-environment/dataDownloadByStarttimeAndEndtime?table="
							+ type
							+ "&startTime="
							+ startTime
							+ "&endTime="
							+ endTime;
				});
$("#systemDownload7")
		.click(
				function() {
					var startTime = $("input[name='daterangepicker_start']")
							.val()
					var endTime = $("input[name='daterangepicker_end']").val()
					var type = "language";
					window.location.href = "/visit/reportaccess_analysis/system-environment/dataDownloadByStarttimeAndEndtime?table="
							+ type
							+ "&startTime="
							+ startTime
							+ "&endTime="
							+ endTime;
				});
$("#systemDownload8")
		.click(
				function() {
					var startTime = $("input[name='daterangepicker_start']")
							.val()
					var endTime = $("input[name='daterangepicker_end']").val()
					var type = "iscookie";
					window.location.href = "/visit/reportaccess_analysis/system-environment/dataDownloadByStarttimeAndEndtime?table="
							+ type
							+ "&startTime="
							+ startTime
							+ "&endTime="
							+ endTime;
				});
$("#systemDownload9")
		.click(
				function() {
					var startTime = $("input[name='daterangepicker_start']")
							.val()
					var endTime = $("input[name='daterangepicker_end']").val()
					var type = "isp";
					window.location.href = "/visit/reportaccess_analysis/system-environment/dataDownloadByStarttimeAndEndtime?table="
							+ type
							+ "&startTime="
							+ startTime
							+ "&endTime="
							+ endTime;
				});
// 通过条件获取柱状图json
function requestBargraph(json, table) {
	$.ajax({
		type : 'POST',
		url : "/visit/reportaccess_analysis/system-environment/columnreport",
		data : json,
		dataType : "json",
		enctype : 'application/json;charset=utf-8',
		success : function(data) {
			if (data.status == 200) {
				drawSystemEnvironmentDataBar(data.data, table);
			} else {
				alert(data.msg);
			}
			// $(".latest-day").html(result.lastDate);
			// drawProvinceDataMap(result.provinceData);
			// drawRegionDataBar(result.regionData);
			// drawMainCategoryPie(result.categoryData);
			// loadProvinceDetail('上海',date);
		}
	});
}
// 1柱状图
var systemDataBarChart;
function drawSystemEnvironmentDataBar(jsonData, table) {
	var table = table;
	if ("browser" == table) {
		systemDataBarChart = echarts.init(document
				.getElementById('systemBrowserBarChart'));
	} else if ("os" == table) {
		systemDataBarChart = echarts.init(document
				.getElementById('systemOsBarChart'));
	} else if ("screen" == table) {
		systemDataBarChart = echarts.init(document
				.getElementById('systemScreenBarChart'));
	} else if ("color" == table) {
		systemDataBarChart = echarts.init(document
				.getElementById('systemColorBarChart'));
	} else if ("flash" == table) {
		systemDataBarChart = echarts.init(document
				.getElementById('systemFlashBarChart'));
	} else if ("isjava" == table) {
		systemDataBarChart = echarts.init(document
				.getElementById('systemIsjavaBarChart'));
	} else if ("language" == table) {
		systemDataBarChart = echarts.init(document
				.getElementById('systemLanguageBarChart'));
	} else if ("iscookie" == table) {
		systemDataBarChart = echarts.init(document
				.getElementById('systemIscookieBarChart'));
	} else if ("isp" == table) {
		systemDataBarChart = echarts.init(document
				.getElementById('systemIspBarChart'));
	}
	// systemDataBarChart.restore();
	// systemDataBarChart.showLoading({
	// text: '正在努力的读取数据中...', //loading话术
	// });
	var option = {
		tooltip : {
			trigger : 'item'
//			 formatter: function (params,ticket,callback) {
//				 	var radio;
//		        	var typeName=params.seriesName;
//		        	var paramsName =params.name;
//		        	var paramsValue= params.value;
//		        	for(var p = 0, len = jsonData.pv_radio.length; p < len; p++){
//		        		for(var key in jsonData.pv_radio[p])
//		        		{
//		        		if(key==paramsName){
//		        			radio=jsonData.pv_radio[p][key];
//		        		}
//		        	}
//		            }
//		        	return typeName+"<br/> "+paramsName+" :"+formatNum(paramsValue)+"<br/> 占比 : "+radio+"";
//		        	}
		},
		legend : {
			show : false,
			data : [ '浏览量(pv)', '访问次数', '访客数(uv)', '新访客数', 'ip数' ],
			padding : 5, // 图例内边距，单位px，默认上下左右内边距为5
			itemGap : 10,
			selectedMode : "single",
			selected : {
				'浏览量(pv)' : true,
				'访问次数' : false,
				'访客数(uv)' : false,
				'新访客数' : false,
				'ip数' : false
			}
		},
		calculable : true,
		noDataLoadingOption: {
			text: '暂无数据',
		    effect: 'bubble',
		    effectOption: {
			effect: {
				n: 0
			}
		}
		},
		xAxis : [ {
			type : 'category',
			data : jsonData.name,
			splitLine : {
				show : false
			},
			axisLine : {
				show : false
			},
			axisLabel : {
				show : true
			},
			axisTick : {
				show : true
			}
		} ],
		yAxis : [ {
			type : 'value',
			splitLine:{ 
                show:true
			},
		} ],
		grid : {
			borderWidth : 0
		},
		series : [
				{
					name : '浏览量(pv)',
					type : 'bar',
					data : jsonData.pv_count,
					barWidth : 20,
					itemStyle : {
						normal : {
							color : function(params) {
								var colorList = [ '#C1232B', '#B5C334',
										'#FCCE10', '#E87C25', '#27727B',
										'#FE8463', '#9BCA63', '#FAD860',
										'#F3A43B', '#60C0DD', '#D7504B',
										'#C6E579', '#F4E001', '#F0805A',
										'#26C0C0' ];
								return colorList[params.dataIndex];
							},
							borderRadius : 10,
							barBorderRadius : 2,
							label : {
								show : true,
								formatter : '{c}'
							},
							labelLine : {
								show : true
							}
						}
					}
				},
				
				
				{
					name : '访问次数',
					type : 'bar',
					data : jsonData.visit_count,
					barWidth : 20,
					itemStyle : {
						normal : {
							color : function(params) {
								var colorList = [ '#C1232B', '#B5C334',
										'#FCCE10', '#E87C25', '#27727B',
										'#FE8463', '#9BCA63', '#FAD860',
										'#F3A43B', '#60C0DD', '#D7504B',
										'#C6E579', '#F4E001', '#F0805A',
										'#26C0C0' ];
								return colorList[params.dataIndex];
							},
							borderRadius : 10,
							barBorderRadius : 2,
							label : {
								show : true,
								formatter : '{c}'
							},
							labelLine : {
								show : true
							}
						}
					}
				},
				{
					name : '访客数(uv)',
					type : 'bar',
					data : jsonData.uv_count,
					barWidth : 20,
					itemStyle : {
						normal : {
							color : function(params) {
								var colorList = [ '#C1232B', '#B5C334',
										'#FCCE10', '#E87C25', '#27727B',
										'#FE8463', '#9BCA63', '#FAD860',
										'#F3A43B', '#60C0DD', '#D7504B',
										'#C6E579', '#F4E001', '#F0805A',
										'#26C0C0' ];
								return colorList[params.dataIndex];
							},
							borderRadius : 10,
							barBorderRadius : 2,
							label : {
								show : true,
								formatter : '{c}'
							},
							labelLine : {
								show : true
							}
						}
					}
				},
				{
					name : '新访客数',
					type : 'bar',
					data : jsonData.newvisitor_count,
					barWidth : 20,
					itemStyle : {
						normal : {
							color : function(params) {
								var colorList = [ '#C1232B', '#B5C334',
										'#FCCE10', '#E87C25', '#27727B',
										'#FE8463', '#9BCA63', '#FAD860',
										'#F3A43B', '#60C0DD', '#D7504B',
										'#C6E579', '#F4E001', '#F0805A',
										'#26C0C0' ];
								return colorList[params.dataIndex];
							},
							borderRadius : 10,
							barBorderRadius : 2,
							label : {
								show : true,
								formatter : '{c}'
							},
							labelLine : {
								show : true
							}
						}
					}
				},
				{
					name : 'ip数',
					type : 'bar',
					data : jsonData.ip_count,
					barWidth : 20,
					itemStyle : {
						normal : {
							color : function(params) {
								var colorList = [ '#C1232B', '#B5C334',
										'#FCCE10', '#E87C25', '#27727B',
										'#FE8463', '#9BCA63', '#FAD860',
										'#F3A43B', '#60C0DD', '#D7504B',
										'#C6E579', '#F4E001', '#F0805A',
										'#26C0C0' ];
								return colorList[params.dataIndex];
							},
							borderRadius : 10,
							barBorderRadius : 2,
							label : {
								show : true,
								formatter : '{c}'
							},
							labelLine : {
								show : true
							}
						}
					}
				} ]
	};

	// 下拉框指标-------------------
	$("#popup-box input:radio[name=form-field-radio1]").unbind("click").bind("click", function() {
		var radio = $("#popup-box input:radio[name=form-field-radio1]");
		changeIndex(systemDataBarChart, option, radio);
	})
	$("#popup-box2 input:radio[name=form-field-radio2]").unbind("click").bind("click", function() {
		var radio = $("#popup-box2 input:radio[name=form-field-radio2]");
		changeIndex(systemDataBarChart, option, radio);
	});
	$("#popup-box3 input:radio[name=form-field-radio3]").unbind("click").bind("click", function() {
		var radio = $("#popup-box3 input:radio[name=form-field-radio3]");
		changeIndex(systemDataBarChart, option, radio);
	});
	$("#popup-box4 input:radio[name=form-field-radio4]").unbind("click").bind("click", function() {
		var radio = $("#popup-box4 input:radio[name=form-field-radio4]");
		changeIndex(systemDataBarChart, option, radio);
	});
	$("#popup-box5 input:radio[name=form-field-radio5]").unbind("click").bind("click", function() {
		var radio = $("#popup-box5 input:radio[name=form-field-radio5]");
		changeIndex(systemDataBarChart, option, radio);
	});
	$("#popup-box6 input:radio[name=form-field-radio6]").unbind("click").bind("click", function() {
		var radio = $("#popup-box6 input:radio[name=form-field-radio6]");
		changeIndex(systemDataBarChart, option, radio);
	});
	$("#popup-box7 input:radio[name=form-field-radio7]").unbind("click").bind("click", function() {
		var radio = $("#popup-box7 input:radio[name=form-field-radio7]");
		changeIndex(systemDataBarChart, option, radio);
	});
	$("#popup-box8 input:radio[name=form-field-radio8]").unbind("click").bind("click", function() {
		var radio = $("#popup-box8 input:radio[name=form-field-radio8]");
		changeIndex(systemDataBarChart, option, radio);
	});
	$("#popup-box9 input:radio[name=form-field-radio9]").unbind("click").bind("click", function() {
		var radio = $("#popup-box9 input:radio[name=form-field-radio9]");
		changeIndex(systemDataBarChart, option, radio);
	});
	systemDataBarChart.setOption(option);
}

function changeIndex(systemDataBarChart, option, radio) {
	var len = radio.length;
	for (var i = 0; i < len; i++) {
		var flag = radio[i].checked;
		if (flag) {
			var index = radio[i].value;
			if (index == 'pv_count') {
//				systemDataBarChart.restore();
				var aa = {
					'浏览量(pv)' : true,
					'访问次数' : false,
					'访客数(uv)' : false,
					'新访客数' : false,
					'ip数' : false
				};
				option.legend.selected = aa;
				systemDataBarChart.setOption(option);
				systemDataBarChart.restore();
				return;
			} else if (index == 'visit_count') {
//				systemDataBarChart.restore();
				var bb = {
					'浏览量(pv)' : false,
					'访问次数' : true,
					'访客数(uv)' : false,
					'新访客数' : false,
					'ip数' : false
				};
				
				option.legend.selected = bb;
				systemDataBarChart.setOption(option);
				systemDataBarChart.restore();
				return;
			} else if (index == 'uv_count') {
//				systemDataBarChart.restore();
				var cc = {
					'浏览量(pv)' : false,
					'访问次数' : false,
					'访客数(uv)' : true,
					'新访客数' : false,
					'ip数' : false
				};
				option.legend.selected = cc;
				systemDataBarChart.setOption(option);
				systemDataBarChart.restore();
				return;
			} else if (index == 'newvisitor_count') {
//				systemDataBarChart.restore();
				var dd = {
					'浏览量(pv)' : false,
					'访问次数' : false,
					'访客数(uv)' : false,
					'新访客数' : true,
					'ip数' : false
				};
				option.legend.selected = dd;
				systemDataBarChart.setOption(option);
				systemDataBarChart.restore();
				return;
			} else if (index == 'ip_count') {
//				systemDataBarChart.restore();
				var ee = {
					'浏览量(pv)' : false,
					'访问次数' : false,
					'访客数(uv)' : false,
					'新访客数' : false,
					'ip数' : true
				};
				option.legend.selected = ee;
				systemDataBarChart.setOption(option);
				systemDataBarChart.restore();
				return;
			}
		}
	}
}
//格式化数字,增加逗号
function formatNum(target){
	target=target+"";
	var array=target.split("");  
	var x=1;
	var sb="";
	for(var i = array.length-1; i >=0; i--){
		if (x % 3 == 1) {
            sb=sb+",";
        }
		sb=sb+""+array[i];
		 ++x;
	}
	var tmp1=sb.substring(0, 1);
	if(tmp1==","){
		sb = sb.substring(1, sb.length);
	}
	var array1=sb.split("");
	var str="";
	for(var i = array1.length-1; i >=0; i--){
		str=str+""+array1[i];
	}
	return str;
}
