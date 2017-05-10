
/**
 * liumc 
 */
// targetTab="domainTab";
 
//下载

 function downloadSearchResult(keyword){
	 var targetTab = $("#myTab .active a").attr("class");
 	 var startDate = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
     var endDate = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');	

 	  var res=checkDatePicked(startDate,endDate);

       if(res != 0 ){  //判断时间是否校验通过，即小于一年
     	  return ;
       }
 //    var keyword = $("input[name='inputDomain']").val();
 	var jsonData = {
 			"id" : targetTab,
 			"startDate" : startDate,
 			"endDate": endDate,
 			"searchWord":keyword
 		};
     window.location.href="/visit/stream_analysis/report-external-links/download?id="+targetTab+"&startDate="+startDate+"&endDate="+endDate+"&searchWord="+keyword;
 	
// 		$.ajaxFileUpload({
// 			url : '/visit/stream_analysis/report-external-links/download',
// 			type : 'post',
// 			data : jsonData,
// 			secureuri : false,
// 			dataType : 'json',// 返回数据的类型
// 			enctype : 'application/json;charset=utf-8',
//
// 			success : function(data) {
// 				console.log(data);
// 				if (data.success != true || data.success != "true") {	
// 					alert('没有查询结果，下载失败');
// 				}
// 			}
// 		});
 }

 
//get summary data by ajax
function getSummaryData(jsondata){
	 $.ajax( {  
	        url: '/visit/stream_analysis/external-summaryData',  
	        type: 'post',
	        data: jsondata, 
	        secureuri:false,  
	        dataType: 'json',//返回数据的类型  
			enctype: 'application/json;charset=utf-8',
		
	        success: function (data) {
	
		        	if(data.success==true||data.success=="true"){
		        	  if(data.cntPV!=0){
		        		$('#PV #count1').html(data.cntPV);
		        		$('#UV #count1').html(data.cntUV);
		        		$('#IP #count1').html(data.cntIP);
		        		$('#VisitTimes #count1').html(data.cntVisitTimes);
		        		$('#NewVisitors #count1').html(data.cntNewVisitors);
		        	  }
		        	}else{
		             	alert('失败');
		        	 
		        	}
		    } 
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
function initLoadAllPageData(){//分页加载数据

	var startDate = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
    var endDate = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');	

	var targetTab = $("#myTab .active a").attr("class");
	var data = {
		      "id": targetTab,
		      "startDate": startDate,
		      "endDate": endDate,
		      "keyword": null	        
	 
	    };
	
	  if ("domainTab" == targetTab) {
		$("#domainTab").pagination({
           url: '/visit/stream_analysis/report-subTab',
           paramJson: data

       });
	}else if("urlTab" == targetTab){
		$("#urlTab").pagination({
           url: '/visit/stream_analysis/report-subTab',
           paramJson: data
       });
	}
	getSummaryData(data);
}

function toDate(strDate){
	var args = strDate.split("-");
	return new Date(args[0],args[1],args[2]);
}

function loadPageDataByDate(targetTab){//时间改变触发事件
	
	
	var startDate = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
   var endDate = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');

	var res=checkDatePicked(startDate,endDate);
	  
     if(res!=0){
   	  return ;
     }
	 
	   if ("domainTab" == targetTab) {
	      var keyword = $("input[name='inputDomain']").val();
   	  var jsonData = {
   	          "id": targetTab,
   	          "startDate": startDate,
   	          "endDate": endDate,
   	          "keyword": keyword
   	      };
   	 
			    $("#domainTab").pagination({
    			 url:'/visit/stream_analysis/report-subTab',
           	  paramJson: jsonData
			
 		});
		getSummaryData(jsonData);
		
     } else if("urlTab" == targetTab) {
   	  var keyword = $("input[name='inputURL']").val();
   	  var jsonData = {
   	          "id": targetTab,
   	          "startDate": startDate,
   	          "endDate": endDate,
   	          "keyword": keyword
   	      };
   	 	
   	  
		      $("#urlTab").pagination({
    		  url:'/visit/stream_analysis/report-subTab',
             paramJson: jsonData
			  });
		      getSummaryData(jsonData);
		}
   
	
}


/**
 * 页面画图
 * @param result
 */
function drawPic(result,fileName){
	clearPicDetail();
	var option = {
			 tooltip : {
			        trigger: 'item',
			        showDelay:200,
			        zlevel:5
			    },
			   legend: {
		        show:false,
		        data:[],
		    },
		    calculable : false,
		    noDataLoadingOption: {
				text: '暂无数据',
				effect: 'bubble',
		        effectOption: {
		            effect: {
		                n: 0
		            }
		        }
			},
		    series : [
		        {
		        	radius : '50%',
		            name:fileName,
		            type:'pie',
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
		            selectedMode:"single",
		            data:result.pieData
		        }
		    ]
		};

		var option2 = {
		    tooltip : {
		        trigger: 'axis'
		    },
		   /* legend: {
		        data:result.lineData.name
		    },*/
		    calculable : false,
		    noDataLoadingOption: {
				text: '暂无数据',
				effect: 'bubble',
		        effectOption: {
		            effect: {
		                n: 0
		            }
		        }
			},
		    xAxis : [
		        {
		            type : 'category',
		            data : result.lineData.date
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
		            name:result.lineData.name[0],
		            type:'line',
		            itemStyle:{
		                normal:{
		                	lineStyle:{
		                		//color:"#000"	
		                	}
		                }   
		            },
		            legendHoverLink:true,
		            data:result.lineData.data[0][result.lineData.name[0]]
		        },
		        {
		            name:result.lineData.name[1],
		            type:'line',
		            legendHoverLink:true,
		            data:result.lineData.data[1][result.lineData.name[1]]
		        },
		        {
		            name:result.lineData.name[2],
		            type:'line',
		            legendHoverLink:true,
		            data:result.lineData.data[2][result.lineData.name[2]]
		        }
		    ]
		};
		var myChart=echarts.init(document.getElementById('exteralPiePic'));
		var myChart2 = echarts.init(document.getElementById('exteralLinePic'));
		 myChart2.setOption(option2);
		 myChart.setOption(option);
		 myChart.connect([myChart2]);
		 myChart2.connect([myChart]);
		
		 myChart.on("click",function(param){
			 console.log(myChart.component.legend.getSelectedMap());
			 var color = myChart.component.legend.getColor(param.name);
			 var name=param.name;
			 var seriesName=param.seriesName;
			 var num=param.value;
			 var rate=param.special;
			showPicDetail(color,name,seriesName,num,rate);
			
		 });
}
function showPicDetail(color,name,seriesName,num,rate){
	$(".indexColor").css("background-color",color);
	$(".indexUrl").html(name);
	$(".indexNum").html($("#popup").val()+": "+num);
	$(".indexRate").html("占比: "+rate+"%");
}
function clearPicDetail(){
	$(".indexColor").css("background-color","");
	$(".indexUrl").html("");
	$(".indexNum").html("");
	$(".indexRate").html("");
}
function initHtml(){	
	  $('.input-icon').click(function(){//弹出层事件
		  if($('.popup').is(':hidden')){
			  $('.popup').show();
			  $(this).find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc padding-top-10');
			  }
		  else{
			  $('.popup').hide();
			   $(this).find('i').removeClass('fa-sort-asc padding-top-10').addClass('fa-sort-desc');
			  } 
		  });
		 var currentDate=new Date();
		 var endDate=new Date();
		 var startDate=new Date(currentDate.setMonth(currentDate.getMonth()-1));
		$('#date01').daterangepicker({
			 startDate: startDate,
			  endDate: endDate,
			  format: "YYYY-MM-DD"
			  
		},function(start, end,label) {//时间改变触发事件
			var currentTab=$("#myTab .active a").attr("class");
			var fileName=$('#popup').attr("data");
		    loadPicData(currentTab,fileName);
		    loadPageDataByDate(currentTab);
			
		});
		 $(".btn-blue").click(loadPageDataByDate);
		 $('.fileName').on("click",function(){//指标改变触发事件
				$('#popup').val($(this).text());
				$('#popup').attr("data",$(this).attr("data"));
				var currentTab=$("#myTab .active a").attr("class");
				var fileName=$(this).attr("data");
				loadPicData(currentTab,fileName);
		    });
			$(".fileName[data='pv']").trigger("click");
			 $('.input-icon').trigger("click");
}
function loadPicData(tabName,fileName){//加载图标数据
	var sd = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
	var ed = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');	
	var jsondata = {
	        "startDate": sd,
	        "endDate": ed,
	        "fileName": fileName
	    };
	var url="/visit/stream_analysis/loadExternalLinkPicData";
	if(tabName=="urlTab"){
		url="/visit/stream_analysis/loadExternalLinkUrlPicData"
	};
	 $.ajax( {
	        url: url,  
	        type: 'post',
	        data: jsondata, 
	        dataType: 'json',//返回数据的类型  
	        success: function (result) {
	        	if(result.status=="200"&&result.data!=null){
	        		drawPic(result.data,fileName);
	        	 }else{
	        		 var result=new Object();
	        		 var lineData=new Object();
	        		 result.pieData=[];
	        		 result.lineData=lineData
	        		 lineData.name=[];
	        		 lineData.data=new Array();
	        		 lineData.data.push([]);
	        		 lineData.data.push([]);
	        		 lineData.data.push([]);
	        		 drawPic(result,'');
//	        		 alert("当前选择的时间段无数据!");
	        	 }
	        	}
	        });
}

$(function(){//页面初始化加载 
	
	initHtml();
	initLoadAllPageData();
	 $('#myTab li').on('show.bs.tab', function (e) {
		 var target=$(e.target).attr("class");
		 var fileName=$('#popup').attr("data");
		 if(!$('.popup').is(':hidden')){
			 $('.input-icon').trigger("click");
		 }
		 loadPageDataByDate(target);
		 loadPicData(target,fileName)
	
	 });
	 $(".urlBtn").click(function(){
		 var currentTab=$("#myTab .active a").attr("class");
		 loadPageDataByDate(currentTab);
	 });
	 $(".domainBtn").click(function(){
		 var currentTab=$("#myTab .active a").attr("class");
		 loadPageDataByDate(currentTab);
	 });
	 $(".urlBtn").click(function(){
		 var currentTab=$("#myTab .active a").attr("class");
		 loadPageDataByDate(currentTab);
	 });
	 $(".domainBtn").click(function(){
		 var currentTab=$("#myTab .active a").attr("class");
		 loadPageDataByDate(currentTab);
	 });
	
	 
     $("#downloadByURL").click(function(){
   	   var keyword = $("input[name='inputURL']").val();
     	 downloadSearchResult(keyword);
    });
    
    $("#downloadByDomain").click(function(){
	  var keyword = $("input[name='inputDomain']").val();
	  downloadSearchResult(keyword);
    });
});