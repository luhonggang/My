/*
 指标概况
 */
function loadKpiSummaryData(startDate,endDate,url){//加载指标概况页面数据
	loadKpiSummaryTableData(startDate,endDate,url);
	loadKpiSummaryTotalStatistics(startDate,endDate,url);
}
function loadKpiSummaryTableData(startDate,endDate,url){//加载指标概况分页信息
	var jsonData={
			 startDate:startDate,
			 endDate:endDate,
			 url:url,
			 pageSize:10,
			 pageNum:1
			};
			$("#kipSummaryTab").pagination({
				url: "/visit/page-analysis-report/loadVisitKpiSummaryByPage",
				paramJson:jsonData
			});
}
function loadKpiSummaryTotalStatistics(startDate,endDate,url){//加载指标概况统计信息
	var paramJson={
			  startDate:startDate,
			  endDate:endDate,
			  url:url
			};
			$.ajax({
				type : 'POST',
				url : "/visit/page-analysis-report/searchVisitKpiStatistics",
				data : paramJson,
				success : function(result) {
					if(result.status=="200"){
						var totalIpNum="--";
						var totalUv="--";
						var totalPv="--";
						var totalViewNum="--";
						var totalEntryTimes="--";
					    if(result.data){
				    	 totalIpNum=result.data.ipNum;
						 totalUv=result.data.uv;
						 totalPv=result.data.pv;
						 totalViewNum=result.data.viewNum;
						 totalEntryTimes=result.data.entryTimes;
					    }
						$("#kpiPvTotal").html(totalPv);
						$("#kpiUvTotal").html(totalUv);
						$("#kpiIpNumTotal").html(totalIpNum);
						$("#kpiViewNumTotal").html(totalViewNum);
						$("#kpiEntryTimesTotal").html(totalEntryTimes);
					}
				},
				dataType : "json"
			});
}
function loadKpiSummaryTableDataByUrl(){
	var sd = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
	var ed = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');	
	var url=$("#kpiUrl").val();
	loadKpiSummaryTableData(sd,ed,url);
	loadKpiSummaryTotalStatistics(sd,ed,url);
}


/*
页面价值分析
*/

function loadPageValueData(startDate,endDate,url){//加载页面价值数据
	loadPageValueTableData(startDate,endDate,url);
	loadPageValueTotalStatistics(startDate,endDate,url);
}

function  loadPageValueTableData(startDate,endDate,url){
	var jsonData={
			 startDate:startDate,
			 endDate:endDate,
			 url:url,
			 pageSize:10,
			 pageNum:1
			};
			$("#pageValueTab").pagination({
				url: "/visit/page-analysis-report/loadVisitValueAnalyzeByPage",
				paramJson:jsonData
			});
}
function loadPageValueTotalStatistics(startDate,endDate,url){
	var paramJson={
		  startDate:startDate,
		  endDate:endDate,
		  url:url
		};
		$.ajax({
			type : 'POST',
			url : "/visit/page-analysis-report/searchVisitValueStatistics",
			data : paramJson,
			success : function(result) {
				console.log(result);
				if(result.status=="200"){
					var totalViewNum="--";
					var totalUv="--";
					var totalPv="--";
				    if(result.data){
				     totalViewNum=result.data.viewNum;
					 totalUv=result.data.uv;
					 totalPv=result.data.pv;
				    }	
					$("#pageValuePvTotal").html(totalPv);
					$("#pageValueUvTotal").html(totalUv);
					$("#pageValueViewNumTotal").html(totalViewNum);
				}
			},
			dataType : "json"
		});
}

function loadPageValueTableDataByUrl(){
	var sd = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
	var ed = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');	
	var url=$("#pageValueUrl").val();
	loadPageValueTableData(sd,ed,url);
	loadPageValueTotalStatistics(sd,ed,url);
}


/*
入口页面分析
*/
function loadEntryPageData(startDate,endDate,url){//入口页面数据
	loadEntryPageTableData(startDate,endDate,url);
	loadEntryPageTotalStatistics(startDate,endDate,url);
}
function loadEntryPageTableData(startDate,endDate,url){
	var jsonData={
			 startDate:startDate,
			 endDate:endDate,
			 url:url,
			 pageSize:10,
			 pageNum:1
			};
			$("#entryPageTab").pagination({
				url: "/visit/page-analysis-report/loadVisitEntryByPage",
				paramJson:jsonData
			});
}
function loadEntryPageTableDataByUrl(startDate,endDate,url){
	var sd = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
	var ed = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');	
	var url=$("#entryPageUrl").val();
	loadEntryPageTableData(sd,ed,url);
	loadEntryPageTotalStatistics(sd,ed,url);
}
function loadEntryPageTotalStatistics(startDate,endDate,url){
	var paramJson={
			  startDate:startDate,
			  endDate:endDate,
			  url:url
			};
			$.ajax({
				type : 'POST',
				url : "/visit/page-analysis-report/searchVisitEntryStatistics",
				data : paramJson,
				success : function(result) {
					console.log(result);
					if(result.status=="200"){
						var totalEntryTimes="--";
						var totalUv="--";
						var totalPv="--";
					    if(result.data){
					     totalEntryTimes=result.data.entryTimes;
						 totalUv=result.data.uv;
						 totalPv=result.data.pv;
					    }
						$("#entryPagePvTotal").html(totalPv);
						$("#entryPageUvTotal").html(totalUv);
						$("#entryPageEntryTimesTotal").html(totalEntryTimes);
					}
				},
				dataType : "json"
			});
}
/*
退出页面分析
*/
function loadExitPageData(startDate,endDate,url){//退出页面数据
	loadExitPageTableData(startDate,endDate,url);
	loadExitPageTotalStatistics(startDate,endDate,url);
}
function loadExitPageTableData(startDate,endDate,url){
	var jsonData={
			 startDate:startDate,
			 endDate:endDate,
			 url:url,
			 pageSize:10,
			 pageNum:1
			};
			$("#exitPageTab").pagination({
				url: "/visit/page-analysis-report/loadVisitExitByPage",
				paramJson:jsonData
			});
}
function loadExitPageTableDataByUrl(startDate,endDate,url){
	var sd = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
	var ed = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');	
	var url=$("#exitPageUrl").val();
	loadExitPageTableData(sd,ed,url);
	loadExitPageTotalStatistics(sd,ed,url);
}
function loadExitPageTotalStatistics(startDate,endDate,url){
	var paramJson={
			  startDate:startDate,
			  endDate:endDate,
			  url:url
			};
			$.ajax({
				type : 'POST',
				url : "/visit/page-analysis-report/searchVisitExitStatistics",
				data : paramJson,
				success : function(result) {
					console.log(result);
					if(result.status=="200"){
						var totalExitTimes="--";
						var totalUv="--";
						var totalPv="--";
					    if(result.data){
					     totalExitTimes=result.data.exitTimes;
						 totalUv=result.data.uv;
						 totalPv=result.data.pv;
					    }	
						$("#exitPagePvTotal").html(totalPv);
						$("#exitPageUvTotal").html(totalUv);
						$("#exitPageExitTimesTotal").html(totalExitTimes);
					}
				},
				dataType : "json"
			});
}
function downLoadFile(fileName){//下载文件
  var sd = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
  var ed = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');	

  if(fileName=="kpiSummary"){
	  var url=$("#kpiUrl").val();
	  window.location.href="/visit/page-analysis-report/downKpiSummaryFile?&startDate="+sd+"&endDate="+ed+"&url="+url;
  }else if(fileName=="pageValue"){
	  var url=$("#pageValueUrl").val();
	  window.location.href="/visit/page-analysis-report/downPageValueFile?&startDate="+sd+"&endDate="+ed+"&url="+url;
  }else if(fileName=="entryPage"){
	  var url=$("#entryPageUrl").val();
	  window.location.href="/visit/page-analysis-report/downEntryPageFile?&startDate="+sd+"&endDate="+ed+"&url="+url;
  }else if(fileName=="exitPage"){
	  var url=$("#exitPageUrl").val();
	  window.location.href="/visit/page-analysis-report/downExitPageFile?&startDate="+sd+"&endDate="+ed+"&url="+url; 
  }
}
$(function(){//页面初始化
	 var currentDate=new Date();
	 var endDate=new Date();
	 var startDate=new Date(currentDate.setMonth(currentDate.getMonth()-1));
	$('#date01').daterangepicker({
		 startDate: startDate,
		  endDate: endDate,
		  format: "YYYY-MM-DD"
		  
	},function(start, end,label) {//时间变化刷新页面
		var sd=start.format('YYYY-MM-DD');
		var ed = end.format('YYYY-MM-DD');
		var currentTab=$("#myTab .active a").attr("class");
		if(currentTab=="kpiSummary"){
			  var url=$("#kpiUrl").val();
			  loadKpiSummaryData(sd,ed,url);	
			}else if(currentTab=="pageValue"){
				var url=$("#pageValueUrl").val();
			  loadPageValueData(sd,ed,url);
			}else if(currentTab=="entryAnalyze"){
				var url=$("#entryPageUrl").val();
				loadEntryPageData(sd,ed,url);
			}else if(currentTab=="exitAnalyze"){
				var url=$("#exitPageUrl").val();
				loadExitPageData(sd,ed,url);	
		}
	});
	var sd = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
	var ed = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');
	loadKpiSummaryData(sd,ed);
	//绑定所有的查询按钮事件
	$("#findKpiBtn").on("click",loadKpiSummaryTableDataByUrl);
    $("#findPageValueBtn").on("click",loadPageValueTableDataByUrl);
    $("#findEntryAnalyzeBtn").on("click",loadEntryPageTableDataByUrl);
    $("#findExitAnalyzeBtn").on("click",loadExitPageTableDataByUrl);
	$('#myTab li').on('show.bs.tab', function (e) {//监听tab切换事件
		var sd = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
		var ed = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');
		var target=$(e.target).attr("class");
		if(target=="kpiSummary"){
		  var url=$("#kpiUrl").val();
		  loadKpiSummaryData(sd,ed,url);	
		}else if(target=="pageValue"){
		  var url=$("#pageValueUrl").val();
		  loadPageValueData(sd,ed,url);
		}else if(target=="entryAnalyze"){
			var url=$("#entryPageUrl").val();
			loadEntryPageData(sd,ed,url);
		}else if(target=="exitAnalyze"){
			var url=$("#exitPageUrl").val();
			loadExitPageData(sd,ed,url);	
		}
		
	});
});


