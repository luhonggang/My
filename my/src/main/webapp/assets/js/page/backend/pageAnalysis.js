function showUploadModal(){//弹出上传界面
	$('#uploadEntryPage').modal({
	      keyboard: true
	    });	
	$('#sel_date_value').val("");
	$("#uploadFileItem").val("")
}
function submitUploadFile(){//上传文档
	var date=$(".importFileDay").val();
	var tab_sel_obj=$("#entry_tabid").val();
	if(date==null||date==""){
		alert("请选择日期！");
		return;
	}
	var selfile=$("#uploadFileItem").val();
	if(selfile==null||selfile==""){
		alert("请选择上传文件！");
		return;
	}
	
     var jsonParam={
       dataTime:date
     };
	 
	var tourl="/visit/page-analysis/uploadEntryKpiExcel";
	if(tab_sel_obj=='kpi_summary'){
		if(selfile.indexOf("指标概况")<0&&selfile.indexOf("指标概览")<0){
			alert("文件名称错误，请核对文件！");
			return;
		}
	}else if(tab_sel_obj=='flow_analye'){
		if(selfile.indexOf("流量分析")<0){
			alert("文件名称错误，请核对文件！");
			return;
		}
		tourl="/visit/page-analysis/uploadEntryFlowExcel";
	}else if(tab_sel_obj=='newer_analye'){
		if(selfile.indexOf("新访客分析")<0){
			alert("文件名称错误，请核对文件！");
			return;
		}
		tourl="/visit/page-analysis/uploadEntryVisitorExcel";
	}else if(tab_sel_obj=='attraction_analye'){
		if(selfile.indexOf("吸引力分析")<0){
			alert("文件名称错误，请核对文件！");
			return;
		}
		tourl="/visit/page-analysis/uploadAttractionExcel";
	}else if(tab_sel_obj=='conversion_analye'){
		if(selfile.indexOf("转化分析")<0){
			alert("文件名称错误，请核对文件！");
			return;
		}
		tourl="/visit/page-analysis/uploadEntryConvertExcel";
	}
	 
	 $.ajaxFileUpload({  
	        url:tourl,  
	        secureuri:false,  
	        fileElementId:'uploadFileItem',//file标签的id  
	        dataType: 'json',//返回数据的类型  
	        data:jsonParam,//一同上传的数据  
	        success: function (data) {
	        	if(data.success==true||data.success=="true"){
	        		alert("导入成功");
	        		$("#uploadEntryPage").modal("hide");
	        		reloadDatas();
	        	}else{
	        		alert("excel表格有误,请核对");
	        	}
	         }	
	        });	
}
function reloadDatas(){
	var start_day=$("#sel_start_date").val();
	var end_day=$("#sel_end_date").val();
	//alert(start_day);
	//alert(end_day);
	getEntryKpiAnalysisByPage(start_day,end_day);
}
function getToURL(){
	var tab_sel_obj=$("#entry_tabid").val();
	var tourl="/visit/page-analysis/getEntryKpiSummaryByPage";
	if(tab_sel_obj=='flow_analye'){
		tourl="/visit/page-analysis/getEntryFlowByPage";
	}else if(tab_sel_obj=='newer_analye'){
		tourl="/visit/page-analysis/getEntryNewVisitorByPage";
	}else if(tab_sel_obj=='attraction_analye'){
		tourl="/visit/page-analysis/getEntryAttractionByPage";
	}else if(tab_sel_obj=='conversion_analye'){
		tourl="/visit/page-analysis/getEntryConverstionByPage";
	}
	return tourl;
}


function setDefaultDate(){
	$.ajax({
		type:'POST',
		url:"/visit/page-analysis/getLastDate",
		success:function(obj){
			if(obj.status==200||obj.status=="200"){
				var result=JSON.parse(obj.data);
				$("#sel_start_date").val(result);
				$("#sel_end_date").val(result);
				$('#date01').val(result+" - "+result);
				getEntryKpiAnalysisByPage(result,result);
			}else{
				alert("请求失败请联系管理员");
			}
		},
		dataType:"json",
	});
}
function getEntryKpiAnalysisByPage(startDate,endDate){//分页加载页面数据
	var jsonData={
	 startDate:startDate,
	 endDate:endDate,
	 pageSize:10,
	 pageNum:1,
	};
	var download_url="/visit/file-operation/downExcels?downPartName=";
	var excel_telp="entrykpisum";
	var tab_sel_obj=$("#entry_tabid").val();
	var show_div_id="#entry_kpi_summary_div";
	if(tab_sel_obj=='flow_analye'){
		show_div_id="#entry_entry_flow_div";
		excel_telp="entryflow";
	}else if(tab_sel_obj=='newer_analye'){
		show_div_id="#entry_new_visitor_div";
		excel_telp="newerAnalye";
	}else if(tab_sel_obj=='attraction_analye'){
		show_div_id="#entry_attraction_div";
		excel_telp="attractionAnalye";
	}else if(tab_sel_obj=='conversion_analye'){
		show_div_id="#entry_convertion_div";
		excel_telp="conversionAnalye";
	}
	$('#common_downExcel_A').attr('href',download_url+excel_telp);
	$(show_div_id).pagination({
		url:getToURL(),
		paramJson:jsonData
	});	
}
$(function(){//页面初始化	
	$('#date01').daterangepicker({
		format: 'YYYY-MM-DD'
	},function(start, end) {
		var startDate=start.format('YYYY-MM-DD');
		var endDate = end.format('YYYY-MM-DD');
		$("#sel_start_date").val(startDate);
		$("#sel_end_date").val(endDate);
		getEntryKpiAnalysisByPage(startDate,endDate);
	});
	$('a[data-toggle="tab"]').on('show.bs.tab',function(e){
	   	$("#entry_tabid").val(e.target.id);
	   	reloadDatas();
	    //alert($("#entry_tabid").val());
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
    $(".importFileModel").on("click",showUploadModal);
    $(".submitUploadFile").on("click",submitUploadFile);
    setDefaultDate();
});



