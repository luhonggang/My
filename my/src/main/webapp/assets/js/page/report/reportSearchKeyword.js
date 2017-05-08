
/**
 * liumc 
 */
// currentTab="searchEngineTab"; 
 
//get summary data by ajax
function getSummaryData(jsondata){
	 $.ajax( {  
	        url: '/visit/stream_analysis/summaryData',  
	        type: 'post',
	        data: jsondata, 
	        secureuri:false,  
	        dataType: 'json',//返回数据的类型  
			enctype: 'application/json;charset=utf-8',
		
	        success: function (data) {
	
		        	if(data.success==true||data.success=="true"){
		        		
		        	    $('#tab1 #SearchTimes #count1').html(data.cntSearchTimes);
		        	    $('#tab1 #RateBaidu #count1').html(data.rateBaidu);
		        		$('#tab1 #RateGoogle #count1').html(data.rateGoogle);
		        		$('#tab1 #RateSougou #count1').html(data.rateSougou);
			        	$('#tab1 #RateOther #count1').html(data.rateOther);
			            $('#tab1 #RateAll #count1').html(data.rateAll);
		        		$('#tab2 #PV #count1').html(data.cntPV);
		        		$('#tab2 #UV #count1').html(data.cntUV);
		        		$('#tab2 #IP #count1').html(data.cntIP);
		        		$('#tab2 #VisitTimes #count1').html(data.cntVisitTimes);
		        		$('#tab2 #NewVisitors #count1').html(data.cntNewVisitors);
		        		
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
	
	var currentTab = $("#myTab .active a").attr("class");

	
	 var startDate = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
     var endDate = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');	
	var data = {
	        "id": currentTab,
	        "startDate": startDate,
	        "endDate": endDate,
	        "keyword": null
	    };
	

	if ("searchEngineTab" == currentTab){
			 
		$("#reportSearchEngineTab").pagination({
            url: '/visit/stream_analysis/report-searchTab',
            paramJson: data

        });

	}else if("quotaTab" == currentTab){	
		$("#reportQuotaTab").pagination({
            url: '/visit/stream_analysis/report-searchTab',
            paramJson: data
        });
	}
	getSummaryData(data);
}

function loadPageDataByDate(currentTab){//时间改变触发事件

	 var startDate = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
     var endDate = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');	

	  var res=checkDatePicked(startDate,endDate);

      if(res != 0 ){  //判断时间是否校验通过，即小于一年
    	  return ;
      }
     
	  
      if ("searchEngineTab" == currentTab) {
    	  var keyword = $("input[name='engineInput']").val();
    	  var jsonData = {
    	          "id": currentTab,
    	          "startDate": startDate,
    	          "endDate": endDate,
    	          "keyword": keyword
    	      };
    	 
			    $("#reportSearchEngineTab").pagination({
     			  url:'/visit/stream_analysis/report-searchTab',
            	  paramJson: jsonData
			
  		});
		getSummaryData(jsonData);
		
      } else if("quotaTab" == currentTab) {
    	  var keyword = $("input[name='quotaInput']").val();
    	  var jsonData = {
    	          "id": currentTab,
    	          "startDate": startDate,
    	          "endDate": endDate,
    	          "keyword": keyword
    	      };
    	 	
    	  
		      $("#reportQuotaTab").pagination({
     		  url:'/visit/stream_analysis/report-searchTab',
              paramJson: jsonData
			  });
		      getSummaryData(jsonData);
		}
    
	
}

//下载
function downloadSearchResult(keyword){
	 var currentTab = $("#myTab .active a").attr("class");
	 var startDate = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
     var endDate = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');	

	  var res=checkDatePicked(startDate,endDate);

      if(res != 0 ){  //判断时间是否校验通过，即小于一年
    	  return ;
      }

	var jsonData = {
			"id" : currentTab,
			"startDate" : startDate,
			"endDate": endDate,
			"searchWord":keyword
		};

	window.location.href="/visit/stream_analysis/report-search-terms/download?id="+currentTab+"&startDate="+startDate+"&endDate="+endDate+"&searchWord="+keyword;
//		$.ajaxFileUpload({
//			url : '/visit/stream_analysis/report-search-terms/download',
//			type : 'post',
//			data : jsonData,
//			secureuri : false,
//			dataType : 'json',// 返回数据的类型
//			enctype : 'application/json;charset=utf-8',
//
//			success : function(data) {
//				console.log(data);
//				if (data.success != true || data.success != "true") {	
//					alert('没有查询结果，下载失败');	 
//				}
//			}
//		});
}

$(function(){//页面初始化加载 

	var currentDate=new Date();
	var endDate=new Date();
	var startDate=new Date(currentDate.setMonth(currentDate.getMonth()-1));
	
	$("#date01").daterangepicker({
		 startDate: startDate,
		  endDate: endDate,
		  format: "YYYY-MM-DD"
		  
	},function(start, end,label) {//时间改变触发事件
		var currentTab=$("#myTab .active a").attr("class");
	    loadPageDataByDate(currentTab);
		
	});
	
	initLoadAllPageData();
	
	 $('#myTab li').on('show.bs.tab', function (e) {
		 var currentTab=$(e.target).attr("class");
		 loadPageDataByDate(currentTab);
	 });
	 
 	
	 $(".searchBtn").click(function(){
		 var currentTab = $("#myTab .active a").attr("class");
		 loadPageDataByDate(currentTab); 
		  
		   
	 });
	 
	 $(".quotaBtn").click(function(){
		 var currentTab = $("#myTab .active a").attr("class");
		 loadPageDataByDate(currentTab); 
	 });
	 
     $("#downloadByEngine").click(function(){
    	 var keyword = $("input[name='engineInput']").val();
    	 downloadSearchResult(keyword);
     });
     
     $("#downloadByQuota").click(function(){
	  var keyword = $("input[name='quotaInput']").val();
	  downloadSearchResult(keyword);
     });
});
