function showSummaryKpiModal(){//弹出上传界面
	clearModalData();
	$('#summaryKpiModal').modal({
	      keyboard: true
	    });	
}
function showPageValueModal(){//弹出上传界面
	clearModalData();
	$('#pageValueModal').modal({
	      keyboard: true
	    });	 
}
function showEntryPageModal(){//弹出上传界面
	clearModalData();
	$('#entryPageModal').modal({
	      keyboard: true
	    });	  
}
function showExitPageModal(){//弹出上传界面
	clearModalData();
	$('#exitPageModal').modal({
	      keyboard: true
	    });	  
}
function clearModalData(){
	$(".importFileDay").val("");
	$("#summaryKpiUploadFile").val("");
	$("#pageValueUploadFile").val("");
	$("#entryPageUploadFile").val("");
	$("#exitPageUploadFile").val("");
}
function submitSummaryKpiFile(e){//上传指标概况
	var date=$(e.currentTarget).parents(".modal").find(".importFileDay").val();
	if(date==null||date==""){
		alert("请选择日期！");
		return;
	}
     var jsonParam={
       dataTime:date 		 
     };
	 $.ajaxFileUpload({  
	        url:'/visit/page-analysis/uploadSummaryKpiFile',  
	        secureuri:false,  
	        fileElementId:'summaryKpiUploadFile',//file标签的id  
	        dataType: 'json',//返回数据的类型  
	        data:jsonParam,//一同上传的数据  
	        success: function (data) {
	        	console.log(data);
	        	if(data.status==true||data.status=="true"){
	        		alert("导入成功");
	        		$("#summaryKpiModal").modal("hide");
	       		    var startDate=$("#date01").data('daterangepicker').startDate.format('YYYY-MM-DD');
	    		    var endDate=$("#date01").data('daterangepicker').endDate.format('YYYY-MM-DD');
	        		loadPageContent("summaryKpi",startDate,endDate);
	        	}else if(data.status=="errorName"){
	        		alert("文件名称错误，请核对文件");
	        	}else if(data.status==200001){
        			alert(data.msg);
        		}else{
	        		alert("导入失败");
	        	}
	         }	
	        });	
	
	
}
function submitPageValueFile(e){//上传页面价值分析excel
	var date=$(e.currentTarget).parents(".modal").find(".importFileDay").val();
	if(date==null||date==""){
		alert("请选择日期！");
		return;
	}
     var jsonParam={
       dataTime:date 		 
     };
	 $.ajaxFileUpload({  
	        url:'/visit/page-analysis/uploadPageValueFile',  
	        secureuri:false,  
	        fileElementId:'pageValueUploadFile',//file标签的id  
	        dataType: 'json',//返回数据的类型  
	        data:jsonParam,//一同上传的数据  
	        success: function (data) {
	        	if(data.status==true||data.status=="true"){
	        		alert("导入成功");
	        		$("#pageValueModal").modal("hide");
	        		var startDate=$("#date01").data('daterangepicker').startDate.format('YYYY-MM-DD');
	    		    var endDate=$("#date01").data('daterangepicker').endDate.format('YYYY-MM-DD');
	        		loadPageContent("pageValue",startDate,endDate);
	        	}else if(data.status=="errorName"){
	        		alert("文件名称错误，请核对文件");
	        	}else if(data.status==200001){
        			alert(data.msg);
        		}else{
	        		alert("导入失败");
	        	}
	         }	
	        });	
}
function submitEntryPageUploadFile(e){//上传入口页分析excel
	var date=$(e.currentTarget).parents(".modal").find(".importFileDay").val();
	if(date==null||date==""){
		alert("请选择日期！");
		return;
	}
     var jsonParam={
       dataTime:date 		 
     };
	 $.ajaxFileUpload({  
	        url:'/visit/page-analysis/uploadEntryPageFile',  
	        secureuri:false,  
	        fileElementId:'entryPageUploadFile',//file标签的id  
	        dataType: 'json',//返回数据的类型  
	        data:jsonParam,//一同上传的数据  
	        success: function (data) {
	        	if(data.status==true||data.status=="true"){
	        		alert("导入成功");
	        		$("#entryPageModal").modal("hide");
	        		var startDate=$("#date01").data('daterangepicker').startDate.format('YYYY-MM-DD');
	    		    var endDate=$("#date01").data('daterangepicker').endDate.format('YYYY-MM-DD');
	        		loadPageContent("entryAnalyze",startDate,endDate);
	        	}else if(data.status=="errorName"){
	        		alert("文件名称错误，请核对文件");
	        	}else if(data.status==200001){
        			alert(data.msg);
        		}else{
	        		alert("导入失败");
	        	}
	         }	
	        });	
}
function submitExitPageUploadFile(e){//上传退出页分析excel
	var date=$(e.currentTarget).parents(".modal").find(".importFileDay").val();
	if(date==null||date==""){
		alert("请选择日期！");
		return;
	}
     var jsonParam={
       dataTime:date 		 
     };
	 $.ajaxFileUpload({  
	        url:'/visit/page-analysis/uploadExitPageFile',  
	        secureuri:false,  
	        fileElementId:'exitPageUploadFile',//file标签的id  
	        dataType: 'json',//返回数据的类型  
	        data:jsonParam,//一同上传的数据  
	        success: function (data) {
	        	if(data.status==true||data.status=="true"){
	        		alert("导入成功");
	        		$("#exitPageModal").modal("hide");
	        		var startDate=$("#date01").data('daterangepicker').startDate.format('YYYY-MM-DD');
	    		    var endDate=$("#date01").data('daterangepicker').endDate.format('YYYY-MM-DD');
	        		loadPageContent("exitAnalyze",startDate,endDate);
	        	}else if(data.status=="errorName"){
	        		alert("文件名称错误，请核对文件");
	        	}else if(data.status==200001){
        			alert(data.msg);
        		}else{
	        		alert("导入失败");
	        	}
	         }	
	        });	
}
//统一异步加载数据的方法
function loadPageContent(pageName,startDate,endDate){
	var jsonData={
			 startDate:startDate,
			 endDate:endDate,
			 pageName:pageName,
			 pageSize:10,
			 pageNum:1,
			};
			$("#"+pageName+"Tab").pagination({
				url: "/visit/page-analysis/loadVisitPageAnalysisByPage",
				paramJson:jsonData
			});
	
}
$(function(){//页面加载完初始化
	if(latestDate==null||latestDate==""){
		latestDate=new Date();
	}
	$(".importFileDay").datetimepicker({
		language:"zh-CN",
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
	});
	$('#date01').daterangepicker({//时间变化时加载新的数据
		startDate:latestDate,
		endDate:latestDate,
		format: 'YYYY-MM-DD'
	},function(start, end) {
		var startDate=start.format('YYYY-MM-DD');
		var endDate = end.format('YYYY-MM-DD');
		//$("#date01").data('daterangepicker').endDate.format('YYYY-MM-DD')
		loadPageContent("summaryKpi",startDate,endDate);
		loadPageContent("pageValue",startDate,endDate);
		loadPageContent("entryAnalyze",startDate,endDate);
		loadPageContent("exitAnalyze",startDate,endDate);
	});
	$(".showSummaryKpiModal").on("click",showSummaryKpiModal);
	$(".showPageValueModal").on("click",showPageValueModal);
	$(".showEntryPageModal").on("click",showEntryPageModal);
	$(".showExitPageModal").on("click",showExitPageModal);
	$(".submitSummaryKpiFile").on("click",submitSummaryKpiFile);
	$(".submitPageValueFile").on("click",submitPageValueFile);
	$(".submitEntryPageUploadFile").on("click",submitEntryPageUploadFile);
	$(".submitExitPageUploadFile").on("click",submitExitPageUploadFile);
	$('#myTab li').on('show.bs.tab', function (e) {//tab 切换重新加载数据
		 var pageName=$(e.target).parent("li").attr("currentPage");
		 var startDate=$("#date01").data('daterangepicker').startDate.format('YYYY-MM-DD');
		 var endDate=$("#date01").data('daterangepicker').endDate.format('YYYY-MM-DD');
		 if($("#date01").val()!=null&&$("#date01").val()!=""){
			 loadPageContent(pageName,startDate,endDate);
		  }else{
			 loadPageContent(pageName);
		  }
		})
	//初始化加载所有的tab数据	
	loadPageContent("summaryKpi",latestDate,latestDate);
	/*loadPageContent("pageValue");
	loadPageContent("entryAnalyze");
	loadPageContent("exitAnalyze");*/
});


