$(function(){
	//--Bootstrap Date Picker
	reloadDaterangepicker("browser");
	//刷新时间
	function reloadDaterangepicker(type){
		var jsonData={"table":type};
		$.ajax({
			type : 'POST',
			url : "/visit/access_analysis/system-environment/loadMaxTime",
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
		if("浏览器"==jsonData.table.replace(/(^\s*)|(\s*$)/g, "")){
			$("#browserTable").pagination({
				url: '/visit/access_analysis/system-environment/page',
				paramJson:jsonData
			});
		}else if("网络设备类型"==jsonData.table.replace(/(^\s*)|(\s*$)/g, "")){
			$("#osTable").pagination({
				url: '/visit/access_analysis/system-environment/page',
				paramJson:jsonData
			});
		}else if("屏幕分辨率"==jsonData.table.replace(/(^\s*)|(\s*$)/g, "")){
			$("#screenTable").pagination({
				url: '/visit/access_analysis/system-environment/page',
				paramJson:jsonData
			});
		}else if("屏幕颜色"==jsonData.table.replace(/(^\s*)|(\s*$)/g, "")){
			$("#colorTable").pagination({
				url: '/visit/access_analysis/system-environment/page',
				paramJson:jsonData
			});
		}else if("flash版本"==jsonData.table.replace(/(^\s*)|(\s*$)/g, "")){
			$("#flashTable").pagination({
				url: '/visit/access_analysis/system-environment/page',
				paramJson:jsonData
			});
		}else if("是否支持java" == jsonData.table.replace(/(^\s*)|(\s*$)/g, "")){
			$("#isjavaTable").pagination({
				url: '/visit/access_analysis/system-environment/page',
				paramJson:jsonData
			});
		}else if("语言环境" == jsonData.table.replace(/(^\s*)|(\s*$)/g, "")){
			$("#languageTable").pagination({
				url: '/visit/access_analysis/system-environment/page',
				paramJson:jsonData
			});
		}else if("是否支持cookie"==jsonData.table.replace(/(^\s*)|(\s*$)/g, "")){
			$("#iscookieTable").pagination({
				url: '/visit/access_analysis/system-environment/page',
				paramJson:jsonData
			});
		}else if("网络提供商"==jsonData.table.replace(/(^\s*)|(\s*$)/g, "")){
			$("#ispTable").pagination({
				url: '/visit/access_analysis/system-environment/page',
				paramJson:jsonData
			});
		}
	}
	//第一次进入
firstEnter();	
function firstEnter(){
	var timeSpan = $('#date01').val();
	var start =timeSpan.substring(0,10);
	var end = timeSpan.substring(13,23)
	var data={
			"table": "浏览器",
		    "startTime": start,
		    "endTime": end
	};
$("#browserTable").pagination({
	url: '/visit/access_analysis/system-environment/page',//加载分页页面的url
	paramJson:data
});
}
//点击table切换时
$('#myTab li').on('show.bs.tab', function (e) {
	var type = $(e.target).text();
	reloadPageDataAnalysis(type);
})
//重新加载刷新
function reloadPageDataAnalysis(type){
			if("浏览器" == type.replace(/(^\s*)|(\s*$)/g, "")){
//				reloadDaterangepicker("browser");
				var timeSpan = $('#date01').val();
				var start =timeSpan.substring(0,10);
				var end = timeSpan.substring(13,23);
				var jsonData={
						 "table":type,
						 "startTime": start,
						 "endTime": end
						};
				$("#browserTable").pagination({
					url: '/visit/access_analysis/system-environment/page',//加载分页页面的url
					paramJson:jsonData
				});
			}else if("网络设备类型" == type.replace(/(^\s*)|(\s*$)/g, "")){
//				reloadDaterangepicker("os");
				var timeSpan = $('#date01').val();
				var start =timeSpan.substring(0,10);
				var end = timeSpan.substring(13,23);
				var jsonData={
						 "table":type,
						 "startTime": start,
						 "endTime": end
						};
				$("#osTable").pagination({
					url: '/visit/access_analysis/system-environment/page',//加载分页页面的url
					paramJson:jsonData
				});
			}else if("屏幕分辨率" == type.replace(/(^\s*)|(\s*$)/g, "")){
//				reloadDaterangepicker("screen");
				var timeSpan = $('#date01').val();
				var start =timeSpan.substring(0,10);
				var end = timeSpan.substring(13,23);
				var jsonData={
						 "table":type,
						 "startTime": start,
						 "endTime": end
						};
				$("#screenTable").pagination({
					url: '/visit/access_analysis/system-environment/page',//加载分页页面的url
					paramJson:jsonData
				});
			}else if("屏幕颜色" == type.replace(/(^\s*)|(\s*$)/g, "")){
//				reloadDaterangepicker("color");
				var timeSpan = $('#date01').val();
				var start =timeSpan.substring(0,10);
				var end = timeSpan.substring(13,23);
				var jsonData={
						 "table":type,
						 "startTime": start,
						 "endTime": end
						};
				$("#colorTable").pagination({
					url: '/visit/access_analysis/system-environment/page',//加载分页页面的url
					paramJson:jsonData
				});
			}else if("flash版本" == type.replace(/(^\s*)|(\s*$)/g, "")){
//				reloadDaterangepicker("flash");
				var timeSpan = $('#date01').val();
				var start =timeSpan.substring(0,10);
				var end = timeSpan.substring(13,23);
				var jsonData={
						 "table":type,
						 "startTime": start,
						 "endTime": end
						};
				$("#flashTable").pagination({
					url: '/visit/access_analysis/system-environment/page',//加载分页页面的url
					paramJson:jsonData
				});
			}else if("语言环境" == type.replace(/(^\s*)|(\s*$)/g, "")){
//				reloadDaterangepicker("language");
				var timeSpan = $('#date01').val();
				var start =timeSpan.substring(0,10);
				var end = timeSpan.substring(13,23);
				var jsonData={
						 "table":type,
						 "startTime": start,
						 "endTime": end
						};
				$("#languageTable").pagination({
					url: '/visit/access_analysis/system-environment/page',//加载分页页面的url
					paramJson:jsonData
				});
			}else if("是否支持cookie" == type.replace(/(^\s*)|(\s*$)/g, "")){
//				reloadDaterangepicker("iscookie");
				var timeSpan = $('#date01').val();
				var start =timeSpan.substring(0,10);
				var end = timeSpan.substring(13,23);
				var jsonData={
						 "table":type,
						 "startTime": start,
						 "endTime": end
						};
				$("#iscookieTable").pagination({
					url: '/visit/access_analysis/system-environment/page',//加载分页页面的url
					paramJson:jsonData
				});
			}else if("网络提供商" == type.replace(/(^\s*)|(\s*$)/g, "")){
//				reloadDaterangepicker("isp");
				var timeSpan = $('#date01').val();
				var start =timeSpan.substring(0,10);
				var end = timeSpan.substring(13,23);
				var jsonData={
						 "table":type,
						 "startTime": start,
						 "endTime": end
						};
				$("#ispTable").pagination({
					url: '/visit/access_analysis/system-environment/page',//加载分页页面的url
					paramJson:jsonData
				});
			}else if("是否支持java" == type.replace(/(^\s*)|(\s*$)/g, "")){
//				reloadDaterangepicker("isjava");
				var timeSpan = $('#date01').val();
				var start =timeSpan.substring(0,10);
				var end = timeSpan.substring(13,23);
				var jsonData={
						 "table":type,
						 "startTime": start,
						 "endTime": end
						};
				$("#isjavaTable").pagination({
					url: '/visit/access_analysis/system-environment/page',//加载分页页面的url
					paramJson:jsonData
				});
			}
		}
	//导入excel
	//弹框
		$(".btn-sky").click(function(){
			var type=$("#myTab .active").text();
			$(".importFileDay").val("");
			$("#fileToUpload").val('');
			var excelName=$("#fileToUpload").val();
//			alert(excelName);
			if("浏览器" == type.replace(/(^\s*)|(\s*$)/g, "")){
				$("#excelTemplate").empty();
				$("#excelTemplate").append("<a href='/visit/file-operation/downExcels?downPartName=ViClientBrowser'>下载模板</a>");
			}else if("网络设备类型" == type.replace(/(^\s*)|(\s*$)/g, "")){
				$("#excelTemplate").empty();
				$("#excelTemplate").append("<a href='/visit/file-operation/downExcels?downPartName=ViClientOs'>下载模板</a>");
			}else if("屏幕分辨率" == type.replace(/(^\s*)|(\s*$)/g, "")){
				$("#excelTemplate").empty();
				$("#excelTemplate").append("<a href='/visit/file-operation/downExcels?downPartName=ViClientScreen'>下载模板</a>");
			}else if("屏幕颜色" == type.replace(/(^\s*)|(\s*$)/g, "")){
				$("#excelTemplate").empty();
				$("#excelTemplate").append("<a href='/visit/file-operation/downExcels?downPartName=ViClientColor'>下载模板</a>");
			}else if("flash版本" == type.replace(/(^\s*)|(\s*$)/g, "")){
				$("#excelTemplate").empty();
				$("#excelTemplate").append("<a href='/visit/file-operation/downExcels?downPartName=ViClientFlash'>下载模板</a>");
			}else if("语言环境" == type.replace(/(^\s*)|(\s*$)/g, "")){
				$("#excelTemplate").empty();
				$("#excelTemplate").append("<a href='/visit/file-operation/downExcels?downPartName=ViClientLanguage'>下载模板</a>");
			}else if("是否支持cookie" == type.replace(/(^\s*)|(\s*$)/g, "")){
				$("#excelTemplate").empty();
				$("#excelTemplate").append("<a href='/visit/file-operation/downExcels?downPartName=ViClientIscookie'>下载模板</a>");
			}else if("网络提供商" == type.replace(/(^\s*)|(\s*$)/g, "")){
				$("#excelTemplate").empty();
				$("#excelTemplate").append("<a href='/visit/file-operation/downExcels?downPartName=ViClientIsp'>下载模板</a>");
			}else if("是否支持java" == type.replace(/(^\s*)|(\s*$)/g, "")){
				$("#excelTemplate").empty();
				$("#excelTemplate").append("<a href='/visit/file-operation/downExcels?downPartName=ViClientIsjava'>下载模板</a>");
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
		var excelName= $("#fileToUpload").val().toLowerCase();
		//获取被选中的table
		var type=$("#myTab .active").text().replace(/(^\s*)|(\s*$)/g, "");
		if(!$(".importFileDay").val()){
			alert("请选择日期");
			$(".importFileDay").val("");
    		$("#fileToUpload").val("");
    		return;
		}
		if(!$("#fileToUpload").val()){
			alert("添加个excel");
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
		        url:'/visit/access_analysis/system-environment/upload',  
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
			        		$('#uploadModal').modal('hide')
			        	}else{
			        		if(data.status==200001){
			        			alert(data.msg);
			        		}else{
			        			alert("导入失败");
			        		}
			        	$(".importFileDay").val("");
		        		$("#fileToUpload").val("");
			        	$('#uploadModal').modal('hide')
			        	}
			    } 
			});	
		}
		 
	});
 });