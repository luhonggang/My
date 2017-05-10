/**
* @author liupc
* @time：2016年5月26日
*/
reloadDaterangepicker();
//刷新时间
function reloadDaterangepicker(){
	var curDate=new Date();
	var endDate = curDate.setMonth(curDate.getMonth()-1);
	$('#date01').daterangepicker({
	  format: 'YYYY-MM-DD',
	  startDate:curDate,
	  endDate:endDate
	},function(start, end){
		buttonReload();
	});	
}

//刷新的时间为数据库的时间
//reloadDaterangepicker("region");
////刷新时间
//function reloadDaterangepicker(type){
//	var jsonData={"table":type};
//	$.ajax({
//		type : 'POST',
//		url : "/visit/reportaccess_analysis/terrain-analysis/loadMaxTime",
//		data: jsonData, 
//		async: false,
//		dataType : "json",
//		enctype: 'application/json;charset=utf-8',
//		success : function(data) {
//			if(data.status==200){
//				var	curDate=new Date(data.data);
//				reloadDaterangepickerDate(curDate);
//			}else{
//				alert(data.msg);
//			}
//		}
//	});
//}
//function reloadDaterangepickerDate(curDate){
//	var startTime= curDate.setMonth(curDate.getMonth()-1);
//	startTime=new Date(startTime);
//	var endDate= curDate.setMonth(curDate.getMonth()+1);
//	endDate=new Date(endDate);
//	$('#date01').daterangepicker({
//	  format: 'YYYY-MM-DD',
//	  startDate:startTime,
//	  endDate:endDate
//	},function(start, end){
//		buttonReload();
//	});
//}
//--指标下拉窗口
var popupMethod=function(id,box){  
	  $(id).click(function(){
	  if($(box).is(':hidden')){
		  $(box).show();
		  $(this).find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc padding-top-10');
		  }
	  else{
		  $(box).hide();
		   $(this).find('i').removeClass('fa-sort-asc padding-top-10').addClass('fa-sort-desc');
		  } 
	  });
	  $(id).find('.text').click(function(){
		$(id).find('input:first').val($(this).text());
       })    
	  }

	  popupMethod('#popup','#popup-box');
	  popupMethod('#popup2','#popup-box2');
	  popupMethod('#popup3','#popup-box3');
	  popupMethod('#popup4','#popup-box4');
	  popupMethod('#popup5','#popup-box5');
	  popupMethod('#popup6','#popup-box6');
	  popupMethod('#popup7','#popup-box7');
	  popupMethod('#popup8','#popup-box8');
	  popupMethod('#popup9','#popup-box9');
	  
//第一次进来
firstEnter();
function firstEnter(){
	//请求分页
	requestPaginationFirst();
	//请求联动地图
	requestDynamicMapGraphFirst();
	//总计
	loadTotalPageValueFirst();
}
//第一次请求分页
function requestPaginationFirst(){
	var timeSpan = $('#date01').val();
	var start =timeSpan.substring(0,10);
	var end = timeSpan.substring(13,23);
	var json={
			 "table":"region",
			 "startTime": start,
			 "endTime": end
			};
	$("#regionReportTable").pagination({
		url: '/visit/reportaccess_analysis/terrain-analysis/page',//加载分页页面的url
		paramJson:json
	});
}
//第一次联动地图
function requestDynamicMapGraphFirst(){
	var isChecked =$('#popup').val();
	if(isChecked=="浏览量(PV)"){
		isChecked="pv_count";
	}
	var timeSpan = $('#date01').val();
	var start =timeSpan.substring(0,10);
	var end = timeSpan.substring(13,23);
	var json={
			 "table":"region",
			 "startTime": start,
			 "endTime": end,
			 "target":isChecked
			};
	requestDynamicMapGraph(json,"region");
}
//获取总的参数
function loadTotalPageValueFirst(){
	var timeSpan = $('#date01').val();
	var start =timeSpan.substring(0,10);
	var end = timeSpan.substring(13,23);
	var table=transTableType();
	var jsonData={
			 "table":table,
			 "startTime": start,
			 "endTime": end
			};
	loadTotalPageValue(jsonData);
}
//返回table英文的类型
function transTableType(){
	var type=$("#myTab .active").text();
	if("地级市" == type.replace(/(^\s*)|(\s*$)/g, "")){
		return "region";
	}else if("网络设备商"==type.replace(/(^\s*)|(\s*$)/g, "")){
		return "isp";
	}
}
function loadTotalPageValue(jsonData){
	$.ajax({
		type : 'POST',
		url : "/visit/reportaccess_analysis/terrain-analysis/loadTotalValue",
		data: jsonData, 
		dataType : "json",
		enctype: 'application/json;charset=utf-8',
		success : function(data) {
			console.log(data);
			if(data.status==200){
				var totalPv=data.data.totalPv;
				var totalUv=data.data.totalUv;
				var totalIp=data.data.totalIp;
				var totalVisitcount=data.data.totalVisitcount;
				var totalNewvisitorcount=data.data.totalNewvisitorcount;
//				var tab;
//				if(jsonData.table=="region"){
//					tab="#tab1";
//				}else if(jsonData.table=="isp"){
//					tab="#tab2";
//				}
//				$(""+tab+" #tab1count1").html(totalPv);
//				$(""+tab+" #tab1count2").html(totalUv);
//				$(""+tab+" #tab1count3").html(totalIp);
//				$(""+tab+" #tab1count4").html(totalBounceratio);
//				$(""+tab+" #tab1count5").html(totalAvgtime);
				$("#tab1count1").html(totalPv);
				$("#tab1count2").html(totalUv);
				$("#tab1count3").html(totalIp);
				$("#tab1count4").html(totalVisitcount);
				$("#tab1count5").html(totalNewvisitorcount);
			}else{
//				alert(data.msg);
				$("#tab1count1").html("--");
				$("#tab1count2").html("--");
				$("#tab1count3").html("--");
				$("#tab1count4").html("--");
				$("#tab1count5").html("--");
			}
		}
	});
}

//点击table切换时
$('#myTab li').on('show.bs.tab', function (e) {
	$('#popup').val("浏览量(PV)");
	$('#pv_countChecked').prop('checked',true)
	var isChecked =$('#popup').val();
	if(isChecked=="浏览量(PV)"){
		isChecked="pv_count";
	}else if(isChecked=="访问次数"){
		isChecked="visit_count";
	}else if(isChecked=="访客数(UV)"){
		isChecked="uv_count";
	}else if(isChecked=="新访客数"){
		isChecked="newvisitor_count";
	}else if(isChecked=="IP数"){
		isChecked="ip_count";
	}else if(isChecked=="转换次数"){
		alert("转换次数还没做");
	}
	var type = $(e.target).text();
	if("网络设备商" == type.replace(/(^\s*)|(\s*$)/g, "")){
//		reloadDaterangepicker();
		var timeSpan = $('#date01').val();
		var start =timeSpan.substring(0,10);
		var end = timeSpan.substring(13,23);
		var jsonData={
				 "table":"isp",
				 "startTime": start,
				 "endTime": end,
				 "target":isChecked
				};
		$("#ispReportTable").pagination({
			url: '/visit/reportaccess_analysis/terrain-analysis/page',//加载分页页面的url
			paramJson:jsonData
		});
		loadTotalPageValue(jsonData);
		requestDynamicMapGraph(jsonData,"region");
	}else if("地级市" == type.replace(/(^\s*)|(\s*$)/g, "")){
//		reloadDaterangepicker();
		var timeSpan = $('#date01').val();
		var start =timeSpan.substring(0,10);
		var end = timeSpan.substring(13,23);
		var jsonData={
				 "table":"region",
				 "startTime": start,
				 "endTime": end,
				 "target":isChecked
				};
		$("#regionReportTable").pagination({
			url: '/visit/reportaccess_analysis/terrain-analysis/page',//加载分页页面的url
			paramJson:jsonData
		});
		loadTotalPageValue(jsonData);
		requestDynamicMapGraph(jsonData,"isp");
	}
});

//时间button
//$(".btn-blue").click(function(){
//	buttonReload();
//});
//时间button重新加载
function buttonReload(){
	var isChecked =$('#popup').val();
	if(isChecked=="浏览量(PV)"){
		isChecked="pv_count";
	}else if(isChecked=="访问次数"){
		isChecked="visit_count";
	}else if(isChecked=="访客数(UV)"){
		isChecked="uv_count";
	}else if(isChecked=="新访客数"){
		isChecked="newvisitor_count";
	}else if(isChecked=="IP数"){
		isChecked="ip_count";
	}else if(isChecked=="转换次数"){
		
	}
	var startTime =$("input[name='daterangepicker_start']").val()
	var endTime =$("input[name='daterangepicker_end']").val()
	var type=$("#myTab .active").text();
	if("地级市"==type.replace(/(^\s*)|(\s*$)/g, "")){
		var jsonData={
				"table": "region",
			    "startTime": startTime,
			    "endTime": endTime,
			    "target":isChecked
		};
		$("#regionReportTable").pagination({
			url: '/visit/reportaccess_analysis/terrain-analysis/page',
			paramJson:jsonData
		});
		loadTotalPageValue(jsonData);
		requestDynamicMapGraph(jsonData,"region");
	}else if("网络设备商"==type.replace(/(^\s*)|(\s*$)/g, "")){
		var jsonData={
				"table": "isp",
			    "startTime": startTime,
			    "endTime": endTime,
			    "target":isChecked
		};
		$("#ispReportTable").pagination({
			url: '/visit/reportaccess_analysis/terrain-analysis/page',
			paramJson:jsonData
		});
		loadTotalPageValue(jsonData);
		requestDynamicMapGraph(jsonData,"isp");}
}
//下拉框单选按钮点击事件
$("#popup-box input:radio[name=form-field-radio]").click(
		function(){
			var radio=$("#popup-box input:radio[name=form-field-radio]");
			var len=radio.length;
			for(var i=0;i<len;i++){
				var flag=radio[i].checked
				if(flag){
					index=radio[i].value;
					//重新加载画图
					var type=$("#myTab .active").text();
					var timeSpan = $('#date01').val();
					var start =timeSpan.substring(0,10);
					var end = timeSpan.substring(13,23);
					if("地级市"==type.replace(/(^\s*)|(\s*$)/g, "")){
						var json={
								 "table":"region",
								 "startTime": start,
								 "endTime": end,
								 "target":index
								};
						requestDynamicMapGraph(json,"region");
					}else if("网络设备商"==type.replace(/(^\s*)|(\s*$)/g, "")){
						var jsonData={
								"table": "isp",
							    "startTime": start,
							    "endTime": end,
							    "target":index
						};
						requestDynamicMapGraph(jsonData,"isp");
					}
				}
			}
		});
//通过条件获取柱状图json
function requestDynamicMapGraph(json,table){
	$.ajax({
		type : 'POST',
		url : "/visit/reportaccess_analysis/terrain-analysis/dynamicmapgraph",
		data: json, 
		dataType : "json",
		enctype: 'application/json;charset=utf-8',
		success : function(data) {
			if(data.status==200){
				drawDynamicMapGraph(data.data,table);
			}else{
//				alert(data.msg);
				drawDynamicMapGraph(data.data,table);
//				drawDynamicMapGraph(null,table);
			}
		}
	});
}

//下载
$("#terrainDownload1").click(function(){
	var startTime =$("input[name='daterangepicker_start']").val()
	var endTime =$("input[name='daterangepicker_end']").val()
	var type=$("#myTab .active").text();
	if("地级市"==type.replace(/(^\s*)|(\s*$)/g, "")){
		type="region";
	}else if("网络设备商"==type.replace(/(^\s*)|(\s*$)/g, "")){
		type="isp";
	}
	window.location.href="/visit/reportaccess_analysis/terrain-analysis/dataDownloadByStarttimeAndEndtime?table="+type+"&startTime="+startTime+"&endTime="+endTime;
});
$("#terrainDownload2").click(function(){
	var startTime =$("input[name='daterangepicker_start']").val()
	var endTime =$("input[name='daterangepicker_end']").val()
	var type=$("#myTab .active").text();
	if("地级市"==type.replace(/(^\s*)|(\s*$)/g, "")){
		type="region";
	}else if("网络设备商"==type.replace(/(^\s*)|(\s*$)/g, "")){
		type="isp";
	}
	window.location.href="/visit/reportaccess_analysis/terrain-analysis/dataDownloadByStarttimeAndEndtime?table="+type+"&startTime="+startTime+"&endTime="+endTime;
});
//动态地图

//var json= {
//        "pieData": [
//                    {
//                        "name": "广东",
//                        "value": "52338",
//                        "radio": "9.05%"
//                    },
//                    {
//                        "name": "浙江",
//                        "value": "45194",
//                        "radio": "7.82%"
//                    },
//                    {
//                        "name": "上海",
//                        "value": "44813",
//                        "radio": "7.75%"
//                    },
//                    {
//                        "name": "江苏",
//                        "value": "37798",
//                        "radio": "6.54%"
//                    },
//                    {
//                        "name": "山东",
//                        "value": "37724",
//                        "radio": "6.53%"
//                    },
//                    {
//                        "name": "河北",
//                        "value": "37303",
//                        "radio": "6.45%"
//                    },
//                    {
//                        "name": "安徽",
//                        "value": "24488",
//                        "radio": "4.24%"
//                    },
//                    {
//                        "name": "北京",
//                        "value": "24021",
//                        "radio": "4.16%"
//                    },
//                    {
//                        "name": "湖南",
//                        "value": "21468",
//                        "radio": "3.71%"
//                    },
//                    {
//                        "name": "其他",
//                        "value": "245360",
//                        "radio": "42.45%"
//                    }
//                ],
//                "mapData": [
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "9.05%"
//                        ],
//                        "name": "广东",
//                        "value": "52338"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "7.82%"
//                        ],
//                        "name": "浙江",
//                        "value": "45194"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "7.75%"
//                        ],
//                        "name": "上海",
//                        "value": "44813"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "6.54%"
//                        ],
//                        "name": "江苏",
//                        "value": "37798"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "6.53%"
//                        ],
//                        "name": "山东",
//                        "value": "37724"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "6.45%"
//                        ],
//                        "name": "河北",
//                        "value": "37303"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "5.02%"
//                        ],
//                        "name": "其他",
//                        "value": "29008"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "4.24%"
//                        ],
//                        "name": "安徽",
//                        "value": "24488"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "4.16%"
//                        ],
//                        "name": "北京",
//                        "value": "24021"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "3.71%"
//                        ],
//                        "name": "湖南",
//                        "value": "21468"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "3.64%"
//                        ],
//                        "name": "陕西",
//                        "value": "21059"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "3.54%"
//                        ],
//                        "name": "四川",
//                        "value": "20468"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "3.30%"
//                        ],
//                        "name": "河南",
//                        "value": "19067"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "3.06%"
//                        ],
//                        "name": "福建",
//                        "value": "17701"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "2.99%"
//                        ],
//                        "name": "辽宁",
//                        "value": "17267"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "2.76%"
//                        ],
//                        "name": "湖北",
//                        "value": "15978"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "2.66%"
//                        ],
//                        "name": "天津",
//                        "value": "15382"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "2.64%"
//                        ],
//                        "name": "江西",
//                        "value": "15240"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "2.20%"
//                        ],
//                        "name": "贵州",
//                        "value": "12700"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "2.12%"
//                        ],
//                        "name": "重庆",
//                        "value": "12265"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "1.64%"
//                        ],
//                        "name": "广西",
//                        "value": "9478"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "1.40%"
//                        ],
//                        "name": "山西",
//                        "value": "8064"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "1.33%"
//                        ],
//                        "name": "云南",
//                        "value": "7680"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "1.11%"
//                        ],
//                        "name": "甘肃",
//                        "value": "6401"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "0.99%"
//                        ],
//                        "name": "吉林",
//                        "value": "5748"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "0.68%"
//                        ],
//                        "name": "内蒙古",
//                        "value": "3936"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "0.60%"
//                        ],
//                        "name": "黑龙江",
//                        "value": "3448"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "0.50%"
//                        ],
//                        "name": "海南",
//                        "value": "2910"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "0.42%"
//                        ],
//                        "name": "新疆",
//                        "value": "2417"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "0.41%"
//                        ],
//                        "name": "青海",
//                        "value": "2368"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "0.31%"
//                        ],
//                        "name": "宁夏",
//                        "value": "1807"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "0.21%"
//                        ],
//                        "name": "台湾",
//                        "value": "1217"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "0.14%"
//                        ],
//                        "name": "西藏",
//                        "value": "787"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "0.09%"
//                        ],
//                        "name": "香港",
//                        "value": "495"
//                    },
//                    {
//                        "text": [
//                            "浏览量(PV)",
//                            "0.00%"
//                        ],
//                        "name": "澳门",
//                        "value": "9"
//                    }
//                ]
//            };
function drawDynamicMapGraph(json,table){
//	if("browser"==table){
//	var systemDataBarChart = echarts.init(document.getElementById('systemBrowserBarChart')); 
//}else if("os"==table){
//	var systemDataBarChart = echarts.init(document.getElementById('systemOsBarChart')); 
//}
//	ceshiChart.restore();
	var ceshiChart = echarts.init(document.getElementById('dynamicMapGraph1')); 
	if(json==null){
		json={"visit_count":[],"pv_count":[],"ip_count":[],"newvisitor_count":[],"uv_count":[],"name":[]};
		var option = {
				tooltip : {
					trigger : 'axis'
				},
				legend : {
					show : false,
					data : [ '浏览量(pv)', '访问次数', '访客数(uv)', '新访客数', 'ip数' ],
					padding : 5, // 图例内边距，单位px，默认上下左右内边距为5
					itemGap : 10,
					selectedMode : "single",
					selected : {
						'浏览量(pv)' : true
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
					data : json.name,
				} ],
				yAxis : [ {
					type : 'value'
				} ],
				grid : {
					borderWidth : 5
				},
				series : [
						{
							name : '浏览量(pv)',
							type : 'bar',
							data : json.pv_count,
							barWidth : 20
						}
						 ]
			};
	}else{
	var option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: function (params,ticket,callback) {
		        	var type;
		        	var radio;
		        	var paramsValue= params.value;
		        	console.log(paramsValue);
		        	if(paramsValue=="-"){
		        		return params.name+"<br/> "+"暂无数据";
		        	}
		        	for(var p = 0, len = json.mapData.length; p < len; p++){
		        		if(json.mapData[p].name==params.name){
		        			type=json.mapData[p].text[0];
		        			radio=json.mapData[p].text[1];
		        		}
		        	}
		            return params.name+"<br/> "+type+":"+formatNum(paramsValue)+"<br/> 占比 : "+radio+"";
		        }
		    },
		    legend: {
//		        x:'right',
		        x:'80%',
		        y:'center',
		        orient:"vertical",
		        selectedMode:true,
		        formatter: function (name) {
		        	var type;
		        	var radio;
		        	for(var p = 0, len = json.pieData.length; p < len; p++){
		        		if(json.pieData[p].name==name){
		        			type=json.pieData[p].value;
		        			radio=json.pieData[p].radio;
		        		}
		        	}
		        	return name+"    "+formatNum(type)+"    "+radio;
		        },
		        data:json.pieData
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
		    dataRange: {
		    	x:"40",
		    	y:"10",
		    	hoverLink:false,
		    	selectedMode:false,
		        orient: 'horizontal', // 'vertical'
		        text:['高','低'],           // 文本，默认为数值文本
		        min: 0,
		        max: json.pieData[8].value
		    },
		    toolbox: {
		        show : false,
		        orient: 'vertical',
		        x:'right',
		        y:'center',
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false}
		        }
		    },
		    series : [
		        {
		            name: '钢联数据统计',
		            type: 'map',
		            mapType: 'china',
		            mapLocation: {
		                x: 'left'
		            },
		            hoverable:false,
		            selectedMode : 'single',
		            itemStyle:{
		                normal:{label:{show:false}},
		                emphasis:{label:{show:true}}
		            },
		            data:json.mapData
		        },
		        {
		            name:'2011全国GDP对比',
		            type:'pie',
		            roseType : 'item',
		            tooltip: {
		                trigger: 'item',
		                formatter: "{b} <br/> 浏览量: {c}<br/> 占比 : ({d}%)"
		            },
		            center: [document.getElementById('dynamicMapGraph1').offsetWidth - 500, '50%'],
		            radius: '55%',
		            data:json.pieData
		        }
		    ],
		    animation: false
		};
	}
	ceshiChart.setOption(option,true);
		
	//鼠标悬浮效果
	ceshiChart.on('hover', function (param){
		var mapSeries = option.series[0];
		var pieSeries = option.series[1];
		var pieData = [];
		var mapData = [];
		timer1 = setTimeout(e2, 3000);
	    //遍历修改
	    for (var p = 0, len = pieSeries.data.length; p < len; p++) {
	    	name = pieSeries.data[p].name;
	    	if(param.name==name){
	    		pieData.push({
	    			 "name": name,
		             "value": pieSeries.data[p].value,
		             "selected":true
	    		});
	    	}else{
	    		pieData.push({
		    		"name": name,
		             "value": pieSeries.data[p].value
		    	});
	    	}
	    }
	    for (var i = 0, len = mapSeries.data.length; i < len; i++) {
	    	name = mapSeries.data[i].name;
	    	if(param.name==name){
	    		mapData.push({
	    			 "name": name,
		             "value": mapSeries.data[i].value,
		             "selected":true
	    		});
	    	}else{
	    		mapData.push({
		    		"name": name,
		            "value": mapSeries.data[i].value
		    	});
	    	}
	    }
	    option.series[0].data = mapData;
	    option.series[1].data = pieData;
	    ceshiChart.setOption(option, true);
	    ceshiChart.restore();
	});	
	
	//鼠标悬浮在legend上的效果
	ceshiChart.on("legendHoverLink",function (param){
		ceshiChart.restore();
		var target=param.target;
		var mapSeries = option.series[0];
		var pieSeries = option.series[1];
		var pieData = [];
		var mapData = [];
		timer1 = setTimeout(e2, 3000);
	    //遍历修改
	    for (var p = 0, len = pieSeries.data.length; p < len; p++) {
	    	name = pieSeries.data[p].name;
	    	if(target==name){
	    		pieData.push({
	    			 "name": name,
		             "value": pieSeries.data[p].value,
		             "selected":true
	    		});
	    	}else{
	    		pieData.push({
		    		"name": name,
		             "value": pieSeries.data[p].value
		    	});
	    	}
	    }
	    for (var i = 0, len = mapSeries.data.length; i < len; i++) {
	    	name = mapSeries.data[i].name;
	    	if(target==name){
	    		mapData.push({
	    			 "name": name,
		             "value": mapSeries.data[i].value,
		             "selected":true
	    		});
	    	}else{
	    		mapData.push({
		    		"name": name,
		            "value": mapSeries.data[i].value
		    	});
	    	}
	    }
	    option.series[0].data = mapData;
	    option.series[1].data = pieData;
	    ceshiChart.setOption(option, true);
	    ceshiChart.restore();
	});
	function e2() {
	         clearTimeout(timer1);
	}
}

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



