var sel_kpiname="pv";
var sel_kpidesc="访问次数";
//上方日期控件时间初始化，获取昨天和之前的30天
function dateInit(){
	var today=new Date();
	var yesterday=new Date(getDate(today,0));
	var beforeThirtyDate=new Date(getDate(today,30));
	
	endDate=getRegexDate(yesterday,"yyyy-MM-dd");
	startDate=getRegexDate(beforeThirtyDate,"yyyy-MM-dd");
	var date=startDate+" - "+endDate;
	$('#date01').val(date);
	$("#sel_start_date").val(startDate);
	$("#sel_end_date").val(endDate);
}

function reloadDatas(){
	var start_day=$("#sel_start_date").val();
	var end_day=$("#sel_end_date").val();
	getEntryKpiReportsByPage(start_day,end_day);
}

function getEntryKpiReportsByPage(startDate,endDate){//分页加载页面数据
   var tabid=$("#entry_tabid").val();
   var urlObj=$("#search_url_"+tabid).val();
   	var jsonData={
	 startDate:startDate,
	 endDate:endDate,
	 url:urlObj,
	 tabId:tabid,
	 pageSize:10,
	 pageNum:1,
	};
	var gotoURL="/visit/page-analysis-report/getEntryPagesByPage";
 
	//$('#common_downExcel_A').attr('href',download_url+excel_telp);
	$("#showdiv_"+tabid).pagination({
		url:gotoURL,
		paramJson:jsonData
	});	
}
//获得统计数据
function getAllCountsJSON(){
	var start_day=$("#sel_start_date").val();
	var end_day=$("#sel_end_date").val();
	var tabid=$("#entry_tabid").val();
	var jsonData={
			"startDate":start_day,
			"endDate":end_day,
			"kpiname":sel_kpiname,
			"tabId":tabid
	}
	$.ajax({
		type:'POST',
		url:"/visit/page-analysis-report/getAllEntryKpiCounts",
		data:jsonData,
		success:function(obj){
			if(obj.status==200||obj.status=="200"){
				//result=getJson(obj.data);
				result=JSON.parse(obj.data);
				 buildKpiTab(result);
			}else if(obj.status=400||obj.status=="400"){
				 myLineChart=null;
				 myPieChart=null;
				 buildDefaultShow();
				 drawDefaultLinePic('linechart_'+tabid);
				 drawDefaultCirclePic('piechart_'+tabid);
			}else{alert("请求失败请联系管理员");}
		},
		dataType:"json",
	});
}
function buildDefaultShow(){
	 $("#pv_show_entrykpireport").html('--');
	 $("#uv_show_entrykpireport").html('--');
	 $("#ipnum_show_entrykpireport").html('--');
	 $("#viewnum_show_entrykpireport").html('--');
	 $("#newbienum_show_entrykpireport").html('--');
	 $("#uv_show_entryflowreport").html('--');
	 $("#ipnum_show_entryflowreport").html('--');
	 $("#viewnum_show_entryflowreport").html('--');
	 $("#viewnum_show_entryattractreport").html('--');
	 $("#pv_show_entryconvertreport").html('--');
	 $("#viewnum_show_entryconvertreport").html('--');
	 $("#uv_show_entrynewerreport").html('--');
	 $("#viewnum_show_entrynewerreport").html('--');
	 $("#newbienum_show_entrynewerreport").html('--');
	 $("#newbierate_show_entrynewerreport").html('--');
}
//kpi summary统计
function buildKpiTab(report){
	 var tabid=$("#entry_tabid").val();
	//总量统计
	 if(tabid=="entrykpireport"){
		 $("#pv_show_entrykpireport").html(report.all.pv);
		 $("#uv_show_entrykpireport").html(report.all.uv);
		 $("#ipnum_show_entrykpireport").html(report.all.ipNum);
		 $("#viewnum_show_entrykpireport").html(report.all.viewNum);
		 $("#newbienum_show_entrykpireport").html(report.all.newbieNum);
	}else if(tabid=="entryflowreport"){
		 $("#uv_show_entryflowreport").html(report.all.uv);
		 $("#ipnum_show_entryflowreport").html(report.all.ipNum);
		 $("#viewnum_show_entryflowreport").html(report.all.viewNum);
	}else if(tabid=="entryattractreport"){
		 $("#viewnum_show_entryattractreport").html(report.all.viewNum);
	}else if(tabid=="entryconvertreport"){
		 $("#pv_show_entryconvertreport").html(report.all.pv);
		 $("#viewnum_show_entryconvertreport").html(report.all.viewNum);
	}else if(tabid=="entrynewerreport"){
		 $("#uv_show_entrynewerreport").html(report.all.uv);
		 $("#viewnum_show_entrynewerreport").html(report.all.viewNum);
		 $("#newbienum_show_entrynewerreport").html(report.all.newbieNum);
		 $("#newbierate_show_entrynewerreport").html(report.all.newbierate);
	}
	 //饼形图
	 drawCirclePic(report.piedata);
	 //柱形图	
	 drawLinePic(report);
}
function showPicDetail(color,name,seriesName,num,rate){
	var tabid=$("#entry_tabid").val();
	$("#indexColor_"+tabid).css("background-color",color);
	$("#indexUrl_"+tabid).html(name);
	$("#indexNum_"+tabid).html($("#selKpiObj_"+tabid).val()+": "+num);
	$("#indexRate_"+tabid).html("占比: "+rate+"%");
}
function clearPicDetail(){
	var tabid=$("#entry_tabid").val();
	$("#indexColor_"+tabid).css("background-color","");
	$("#indexUrl_"+tabid).html("");
	$("#indexNum_"+tabid).html("");
	$("#indexRate_"+tabid).html("");
}
var myLineChart;
function drawLinePic(xdata){
	 var tabid=$("#entry_tabid").val();
	myLineChart=null;
	// 基于准备好的dom，初始化echarts图表
    myLineChart =echarts.init(document.getElementById('linechart_'+tabid));
    console.log(myLineChart);
	var serie1=xdata.linedatas[0];
	var serie2=xdata.linedatas[1];
	var serie3=xdata.linedatas[2];
    var option = {
    	    tooltip : {
    	        trigger: 'axis'
    	    },
//    	    legend: {
//    	        data:['浏览量(PV)','访问次数','访客数(UV)','新访客数','IP数'],
//    			 selected: {
//    	            '浏览量(PV)':true,
//    				'访问次数':false,
//    				'访客数(UV)':false,
//    				'新访客数':false,
//    				'IP数':false
//    	        },
//    			x:'right'
//    	    },
    	    calculable : true,    	   
    	    xAxis : [
    	        {
    	            type : 'category',
    	            boundaryGap : false,
    	            data : serie1.xdata
    	        }
    	    ],
		    grid:{
		    	y:10
		    },
    	    yAxis : [
    	        {
    	            type : 'value'
    	        }
    	    ],
    		
    	    series : [
    	      {
	            name:serie3.url,
	            type:'line',
	            symbol:'circle',
				smooth:false,
				itemStyle: {normal: {color:'#DA70D6'}},
				stack: '总量',
				lineStyle:{
					type:'dashed'
				},
	            data:serie3.ydata
	        },
    	     {
    	            name:serie2.url,
    	            type:'line',
    	            symbol:'circle',
    				smooth:false,
    				stack: '总量',
    				itemStyle: {normal: {color:'#87CEFA'}},
    				lineStyle:{
    					type:'dashed'
    				},
    	            data:serie2.ydata
    	      },
    	     {
    	            name:serie1.url,
    	            type:'line',
    	            symbol:'circle',
    				smooth:false,
    				stack: '总量',
    				itemStyle: {normal: {color:'#FF7F50'}},
    				lineStyle:{
    					type:'dashed'
    				},
    	            data:serie1.ydata
    	      }
    			
    	    ]
    	};
    // 为echarts对象加载数据 
//    option.series.data=null;
    myLineChart.setOption(option); 
}
var myPieChart;
function drawCirclePic(linedatas){
	clearPicDetail();
	myPieChart=null;
	 var tabid=$("#entry_tabid").val();
	    myPieChart= echarts.init(document.getElementById('piechart_'+tabid)); 
	    //{value:335, name:'直接访问'}
	    var noshow =",\"itemStyle\":{\"normal\":{\"labelLine\":{\"show\":false},\"label\":{\"show\":false}}}";
	    var datas="[";
	     for(var i=0;i<linedatas.length;i++){
	    	 if(sel_kpiname=="pv"||sel_kpiname=="visit_times"){
	    	   datas=datas+"{\"value\":"+linedatas[i].pv+",\"name\":\""+(linedatas[i].url)+"\"";
	    	 }else if(sel_kpiname=="uv"){
	    		 datas=datas+"{\"value\":"+linedatas[i].uv+",\"name\":\""+linedatas[i].url+"\"";
	    	 }else if(sel_kpiname=="ip_num"){
	    		 datas=datas+"{\"value\":"+linedatas[i].ipnum+",\"name\":\""+linedatas[i].url+"\"";
	    	 }else if(sel_kpiname=="newbie_num"||sel_kpiname=="visitor_num"){
	    		 datas=datas+"{\"value\":"+linedatas[i].newbienum+",\"name\":\""+linedatas[i].url+"\"";
	    	 }else if(sel_kpiname=="view_num"){
	    		 datas=datas+"{\"value\":"+linedatas[i].viewnum+",\"name\":\""+linedatas[i].url+"\"";
	    	 }else if(sel_kpiname=="conversion_time"){
	    		 datas=datas+"{\"value\":"+linedatas[i].convertnum+",\"name\":\""+linedatas[i].url+"\"";
	    	 }else if(sel_kpiname=="visitor_rate"||sel_kpiname=="newbie_rate"){
	    		 datas=datas+"{\"value\":"+linedatas[i].newbierate+",\"name\":\""+linedatas[i].url+"\"";
	    	 }
	  	   if(i>2){datas=datas+noshow;}
		    datas=datas+"}";
	    	 if(i<linedatas.length-1){
	    		 datas=datas+","; 
	    	 }
	     }
	     datas+="]";
	    var pied=JSON.parse(datas);
	    
	    var pie = pied;
	    
	    for(var i = 0; i < pie.length; i ++){
	    	if("itemStyle" in pie[i]){
	    		delete pie[i].itemStyle;
	    	}
	    }
	    
		var option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} <br/> {c} ({d}%)"
		    },
		    calculable : false,
		    legend: {
		        show:false,
		        data:pied,
		    },
		    series : [
		        {
		        	name:sel_kpidesc,
		        	type:'pie',
		        	radius : '55%',
		            itemStyle:{
	                    normal:{
	                        label:{
	                            show:true,
	                            formatter:"{d}%"
	                        },
	                        labelLine:{
	                            show:true
	                        }
	                    }   
	                },
	                selectedMode : 'single',
	                data : pie
		        }
		    ]
		};
	    //option.series[0].data = pied;
		myPieChart.setOption(option);
		myPieChart.on("click",function(param){
			 //console.log(param);
			 var color = myPieChart.component.legend.getColor(param.name);
			 var name=param.name;
			 var seriesName=param.seriesName;
			 var num=param.value;
			 var rate=param.special;
			showPicDetail(color,name,seriesName,num,rate);
			
		 });	
}
function RadioController(){
	var tabid=$("#entry_tabid").val();
	var popboxid;
	if(tabid=="entrykpireport"){
		popboxid="#popup-box";
	}else if(tabid=="entryflowreport"){
		popboxid="#popup-box2";
	}else if(tabid=="entryattractreport"){
		popboxid="#popup-box4";
	}else if(tabid=="entryconvertreport"){
		popboxid="#popup-box5";
	}else if(tabid=="entrynewerreport"){
		popboxid="#popup-box3";
	}
	$("#popup_"+tabid+" input[type='radio']").click(
		function(){
			var radio=$("#popup_"+tabid+" input:radio[name=form-field-radio]")
			var len=radio.length;
			for(var i=0;i<len;i++){
				var flag=radio[i].checked
				if(flag){
					sel_kpiname=radio[i].value;
					//ajax请求新的指标
					//popupMethod('#popup_'+tabid,popboxid);
					sel_kpidesc=$("#selKpiObj_"+tabid).val();
					getAllCountsJSON();
				}
			}
		}
	)
}
function setDefaultRadio(){
	var tabid=$("#entry_tabid").val();
	var radio=$("#popup_"+tabid+" input:radio[name=form-field-radio]")
	var len=radio.length;
	for(var i=0;i<len;i++){
		var flag=radio[i].value
		if(flag==sel_kpiname){
			radio[i].checked=true;
			$("#selKpiObj_"+tabid).val($(radio[i]).next('span').html());
		}
	}
}
function clearSearchURL(){
	$("#search_url_entrykpireport").val("");
	$("#search_url_entryflowreport").val("");
	$("#search_url_entrynewerreport").val("");
	$("#search_url_entryattractreport").val("");
	$("#search_url_entryconvertreport").val("");
}
$(function(){//页面初始化	
	var currentDate=new Date();
	 var endDate=new Date();
	 var startDate=new Date(currentDate.setMonth(currentDate.getMonth()-1));
	$('#date01').daterangepicker({
		 startDate: startDate,
		  endDate: endDate,
		  format: "YYYY-MM-DD"
		  
	},function(start, end) {
		var startDate=start.format('YYYY-MM-DD');
		var endDate = end.format('YYYY-MM-DD');
		$("#sel_start_date").val(startDate);
		$("#sel_end_date").val(endDate);
		getAllCountsJSON();
		reloadDatas();
	});
	$("button[name='btnselURL']").on("click",function(){
		var tabid=$("#entry_tabid").val();
		var urlObj=$("#search_url_"+tabid).val();
	 	reloadDatas();
	  });
	$('a[data-toggle="tab"]').on('show.bs.tab',function(e){
	   	$("#entry_tabid").val(e.target.id);
		$("search_url_"+e.target.id).val("");
		clearSearchURL();
		if(e.target.id=="entrykpireport"){
			sel_kpiname="pv";
			sel_kpidesc="访问次数";
		}else if(e.target.id=="entryflowreport"||e.target.id=="entrynewerreport"){
			sel_kpiname="uv";
			sel_kpidesc="访问数(UV)";
		}else if(e.target.id=="entryattractreport"){
			sel_kpiname="view_num";
			sel_kpidesc="贡献浏览量";
		}else if(e.target.id=="entryconvertreport"){
			sel_kpiname="visit_times";
			sel_kpidesc="访问次数";
		}
		setDefaultRadio();
		RadioController();
	    reloadDatas();
	    getAllCountsJSON();
	    //alert($("#entry_tabid").val());
	});
	$("a[name='downloadReports']").on("click",function(){
		var start_day=$("#sel_start_date").val();
		var end_day=$("#sel_end_date").val();
		var tabid=$("#entry_tabid").val();
		 var urlObj=$("#search_url_"+tabid).val();
		var url="/visit/page-analysis-report/downEntryKpiReport?startDate="+start_day+"&endDate="+end_day+"&tabId="+tabid+"&url="+urlObj;
		window.location.href=url;
	  });
	//$(".importFileDay").datepicker();
    //$(".importFileModel").on("click",showUploadModal);
    //$(".submitUploadFile").on("click",submitUploadFile);
	dateInit();
	setDefaultRadio();
	RadioController();
	getAllCountsJSON();
	reloadDatas();
});