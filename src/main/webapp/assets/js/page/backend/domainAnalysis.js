function showUploadModal(){//弹出上传界面
	clearModalData();
	$('#uploadModal').modal({
	      keyboard: true
	    });	
}
function clearModalData(){
	$(".importFileDay").val("");
	$("#uploadFileItem").val("");
}
function submitUploadFile(){//上传文档
	var date=$(".importFileDay").val();
	if(date==null||date==""){
		alert("请选择日期！");
		return;
	}
     var jsonParam={
       dataTime:date 		 
     };
	 $.ajaxFileUpload({  
	        url:'/visit/page-analysis/uploadDomainFile',  
	        secureuri:false,  
	        fileElementId:'uploadFileItem',//file标签的id  
	        dataType: 'json',//返回数据的类型  
	        data:jsonParam,//一同上传的数据  
	        success: function (data) {
	        	if(data.status==true||data.status=="true"){
	        		alert("导入成功");
	        		var sd = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD')
	        		var ed = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');
	        		getDomainAnalysisByPage(sd,ed);
	        		$("#uploadModal").modal("hide");
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
function getDomainAnalysisByPage(startDate,endDate){//分页加载页面数据
	var jsonData={
	 startDate:startDate,
	 endDate:endDate,
	 pageSize:10,
	 pageNum:1,
	};
	$("#domainTable").pagination({
		url: "/visit/page-analysis/getDomainAnalyzeByPage",
		paramJson:jsonData
	});	
	
}
$(function(){//页面初始化
 if(latestDate==null||latestDate==""){
		latestDate=new Date();
	}	
	$('#date01').daterangepicker({
		format: 'YYYY-MM-DD',
		startDate:latestDate,
		endDate:latestDate
	},function(start, end) {
		var startDate=start.format('YYYY-MM-DD');
		var endDate = end.format('YYYY-MM-DD');
		getDomainAnalysisByPage(startDate,endDate);
	});
	$(".importFileDay").datetimepicker({
		language:"zh-CN",
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
	});
	//$(".importFileDay").datepicker();
    $(".importFileModel").on("click",showUploadModal);
    $(".submitUploadFile").on("click",submitUploadFile);
	var sd = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD')
	var ed = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');
    getDomainAnalysisByPage(sd,ed);
});


