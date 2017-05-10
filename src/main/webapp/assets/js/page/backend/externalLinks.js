/**
 * liumc
 */

function initLoadPageData() {// 分页加载数据
//
//	var startDate = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
//    var endDate = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');
//    
	var curTabID = $("#myTab .active a").attr("class");
	
	var data = {
		"id" : curTabID,
		"startDate" : null,
		"endDate" : null
	};
	
	if ("Domain" == curTabID) {
		$("#template").empty();
		$("#template").append('<a href="/visit/file-operation/downExcels?downPartName=ExtByDomain" > 下载模板</a>');
		$("#domainTab").pagination({
			url : '/visit/stream_analysis/subTab',
			paramJson : data

		});
	} else if ("URL" == curTabID) {
		$("#template").empty();
		$("#template").append('<a href="/visit/file-operation/downExcels?downPartName=ExtByUrl" > 下载模板</a>');
		$("#extLinkUrlTab").pagination({
			url : '/visit/stream_analysis/subTab',
			paramJson : data
		});
	}
}

function loadPageDataByDate(curTabID) {// 时间改变触发事件

	var startDate = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
    var endDate = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');
	
	
	var jsonData = {
		"id" : curTabID,
		"startDate" : startDate,
		"endDate" : endDate
	};

	if ("Domain" == curTabID) {
		$("#template").empty();
		$("#template").append('<a href="/visit/file-operation/downExcels?downPartName=ExtByDomain" > 下载模板</a>');
		$("#domainTab").pagination({
			url : '/visit/stream_analysis/subTab',
			paramJson : jsonData

		});
	} else if ("URL" == curTabID) {
	
		$("#template").empty();
		$("#template").append('<a href="/visit/file-operation/downExcels?downPartName=ExtByUrl" > 下载模板</a>');
		$("#extLinkUrlTab").pagination({
			url : '/visit/stream_analysis/subTab',
			paramJson : jsonData
		});
	}

}
function showModal() {// 显示弹出层

	$(".importFileDay").val("");
	$("#fileToUpload").val("");
	$(".importFileDay").datetimepicker({
		language:"zh-CN",
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
	});
	$('#uploadModal').modal({
		keyboard : false
	})
}
function submitUploadFile() {
	
	var curTabID=$("#myTab .active a").attr("class");
	var time_span = $(".importFileDay").val();


	if (!$(".importFileDay").val()) {
		alert("请先选择时间 ！");
		$(".importFileDay").val("");
		$("#fileToUpload").val("");
		return;
	}
	if (!$("#fileToUpload").val()) {
		alert("必须添加excel文件");
		$(".importFileDay").val("");
		$("#fileToUpload").val("");
		return;
	}
	var filename = $("#fileToUpload").val().toUpperCase();
	if ("Domain" == curTabID) {
		if(filename.indexOf("按域名") < 0){
			alert("文件名称错误，请核对文件");
			return;
		}
	}else if ("URL" == curTabID) {
		if(filename.indexOf("按URL") < 0){
			alert("文件名称错误，请核对文件");
			return;
		}
	}


	var jsonData = {
		id : curTabID,
		date : time_span,
		operator : 'admin'
	};

	$.ajaxFileUpload({
		url : '/visit/stream_analysis/external-links/upload',
		type : 'post',
		data : jsonData,
		secureuri : false,
		fileElementId : 'fileToUpload',// file标签的id
		dataType : 'json',// 返回数据的类型
		enctype : 'application/json;charset=utf-8',

		success : function(data) {
			console.log(data);
			if (data.success == true || data.success == "true") {
				loadPageDataByDate(curTabID);
				alert('导入成功');
				$('#uploadModal').modal('hide')

			} else {
				alert('excel表格有误,请核对');
				$('#uploadModal').modal('hide')
			}
		}
	});

}
$(function() {// 页面初始化加载
	var data = { };
	
	
	 $.ajax({  
	        url:'/visit/stream_analysis/external-links/getLatestDate',  
	        type: 'post',
	        dataType: 'json',//返回数据的类型  
	        success: function (data) {
	        	var startDate = new Date();
		        	if(data.success==true||data.success=="true"){
		        			startDate = data.latestDate;
		        	} 
		        	//初始化日期控件
		        	$('#date01').daterangepicker({
		        		  startDate: startDate,
		        		  endDate: startDate,
		        		  format: "YYYY-MM-DD"
		        		  
		        	},function(start, end,label) {//时间改变触发事件

		        		var currentTab=$("#myTab .active a").attr("class");
		        	    loadPageDataByDate(currentTab);
		        		
		        	});
		        	
		        	 }
	  				
	 		});

		

	
	initLoadPageData();
	
    //tab切换
	$("#myTab li").on('show.bs.tab', function(e) {
		var curTabID =$(e.target).attr("class");
		loadPageDataByDate(curTabID);
	});
	

	$(".importFileModel").click(showModal);
	$(".btn-primary").click(submitUploadFile);

});