$(function(){
	//--Bootstrap Date Picker
//	$('#date01').daterangepicker();
	reloadDaterangepicker("region");
	//刷新时间
	function reloadDaterangepicker(type){
		var jsonData={"table":type};
		$.ajax({
			type : 'POST',
			url : "/visit/access_analysis/terrain-analysis/loadMaxTime",
			data: jsonData, 
			async: false,
			dataType : "json",
			enctype: 'application/json;charset=utf-8',
			success : function(data) {
				if(data.status==200){
					if(!data.data){
						reloadDaterangepickerDate(new Date());
					}else{
						var	curDate=new Date(data.data);
						reloadDaterangepickerDate(curDate);
					}
				}else{
					alert(data.msg);
				}
			}
		});
	}
	function reloadDaterangepickerDate(curDate){
		$('#date01').daterangepicker({
		  format: 'YYYY-MM-DD',
		  startDate:curDate,
		  endDate:curDate
		},function(start, end) {
//			var startDate=start.format('YYYY-MM-DD');
//			var endDate = end.format('YYYY-MM-DD');
//			$("#sel_start_date").val(startDate);
//			$("#sel_end_date").val(endDate);
			var startTime =$("input[name='daterangepicker_start']").val()
			var endTime =$("input[name='daterangepicker_end']").val()
			var type=$("#myTab .active").text();
			var jsonData={
					"table": type,
				    "startTime": startTime,
				    "endTime": endTime
			};
			goToAnalysisByPage(jsonData);
		});
	}
//通过button等进入分页
function goToAnalysisByPage(jsonData){
	if("地级市"==jsonData.table.replace(/(^\s*)|(\s*$)/g, "")){
		$("#districtRegionTable").pagination({
			url: '/visit/access_analysis/terrain-analysis/page',//加载分页页面的url
			paramJson:jsonData
		});
	}else if("网络设备商"==jsonData.table.replace(/(^\s*)|(\s*$)/g, "")){
		$("#districtIspTable").pagination({
			url: '/visit/access_analysis/terrain-analysis/page',//加载分页页面的url
			paramJson:jsonData
		});
	}
}

//第一次进入
firstEnter();
	
function firstEnter(){
	var timeSpan = $('#date01').val();
	var start =timeSpan.substring(0,10);
	var end = timeSpan.substring(13,23);
	var data={
				"table": "地级市",
			    "startTime": start,
			    "endTime": end
		};
	$("#districtRegionTable").pagination({
		url: '/visit/access_analysis/terrain-analysis/page',//加载分页页面的url
		paramJson:data
	});	
}
	
	//点击table切换时
	$('#myTab li').on('show.bs.tab', function (e) {
		var type = $(e.target).text();
		reloadPageDataAnalysis(type);
		})
//重新加载刷新分页
function reloadPageDataAnalysis(type){
		if("地级市"==type.replace(/(^\s*)|(\s*$)/g, "")){
//			reloadDaterangepicker("region");
			var timeSpan = $('#date01').val();
			var start =timeSpan.substring(0,10);
			var end = timeSpan.substring(13,23);
			var jsonData={
					 "table":"地级市",
					 "startTime": start,
					 "endTime": end
					};
			$("#districtRegionTable").pagination({
				url: '/visit/access_analysis/terrain-analysis/page',//加载分页页面的url
				paramJson:jsonData
			});
		}else if("网络设备商"==type.replace(/(^\s*)|(\s*$)/g, "")){
//			reloadDaterangepicker("isp");
			var timeSpan = $('#date01').val();
			var start =timeSpan.substring(0,10);
			var end = timeSpan.substring(13,23);
			var jsonData={
					 "table":"网络设备商",
					 "startTime": start,
					 "endTime": end
					};
			$("#districtIspTable").pagination({
				url: '/visit/access_analysis/terrain-analysis/page',//加载分页页面的url
				paramJson:jsonData
			});
		}	
	}	
	//弹框
	$(".btn-sky").click(function(){
		var type=$("#myTab .active").text();
		 $(".importFileDay").val("");
		$("#fileToUpload").val("");
		if("地级市"==type.replace(/(^\s*)|(\s*$)/g, "")){
			$("#excelTemplate").empty();
			$("#excelTemplate").append("<a href='/visit/file-operation/downExcels?downPartName=ViDistrictRegion'>下载模板</a>");
		}else if("网络设备商"==type.replace(/(^\s*)|(\s*$)/g, "")){
			$("#excelTemplate").empty();
			$("#excelTemplate").append("<a href='/visit/file-operation/downExcels?downPartName=ViDistrictIsp'>下载模板</a>");
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
		 $('#uploadModal').modal({
		   keyboard: false
		 })
	});
	//导入
	$(".btn-primary").click(function(){
		var time_span= $(".importFileDay").val();
		var excelName= $("#fileToUpload").val();
		//获取被选中的table
		var type=$("#myTab .active").text().replace(/(^\s*)|(\s*$)/g, "");
		if(!$(".importFileDay").val()){
			alert("请选择日期");
			$(".importFileDay").val("");
    		$("#fileToUpload").val("");
    		return;
		}
		if(!$("#fileToUpload").val()){
			alert("请添加个excel");
			$(".importFileDay").val("");
    		$("#fileToUpload").val("");
    		return;
		}
		if(excelName.indexOf(type) == -1){
			alert("文件名称错误，请核对文件");
			return;
		}
		var jsonData={
				table: type,
			    time: time_span
		};
		if($(".importFileDay").val()&&$("#fileToUpload").val()){
			$.ajaxFileUpload({  
		        url:'/visit/access_analysis/terrain-analysis/upload',  
		        type: 'post',
		        data: jsonData, 
		        secureuri:false,  
		        fileElementId:'fileToUpload',//file标签的id  
		        dataType: 'json',//返回数据的类型  
				enctype: 'application/json;charset=utf-8',
		        success: function (data) {
			        	if(data.status==200){
			        		alert("导入成功");
			        		reloadPageDataAnalysis(jsonData.table.replace(/(^\s*)|(\s*$)/g, ""));
			        		$(".importFileDay").val("");
			        		$("#fileToUpload").val("");
			        		$('#uploadModal').modal('hide');
			        	}else{
			        		if(data.status==200001){
			        			alert(data.msg);
			        		}else{
			        			alert("导入失败");
			        		}
			        	$(".importFileDay").val("");
		        		$("#fileToUpload").val("");
			        	$('#uploadModal').modal('hide');
			        	}
			    } 
			});	
		}
		 
	});

}); 