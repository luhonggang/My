function loadTotalStatistics(startDate,endDate){
	var paramJson={
	  startDate:startDate,
	  endDate:endDate
	};
	$.ajax({
		type : 'POST',
		url : "/visit/page-analysis-report/searchDomainStatistics",
		data : paramJson,
		success : function(result) {
			if(result.status=="200"){
				var totalIpNum="--";
				var totalUv="--";
				var totalPv="--";
				var totalNewVisitor="--";
				var totalVisitNum="--";
			    if(result.data){
			    	 totalIpNum=result.data.ipNum;
					 totalUv=result.data.uv;
					 totalPv=result.data.pv;
					 totalVisitNum=result.data.visitNum;
					 totalNewVisitor=result.data.newVisitorNum;
					 
			    }	
				$("#totalPv").html(totalPv);
				$("#totalUv").html(totalUv);
				$("#totalIpNum").html(totalIpNum);
				$("#totalNewVisitor").html(totalNewVisitor);
				$("#totalVisitNum").html(totalVisitNum);
			}
		},
		dataType : "json"
	});
	
}
function loadDomainPageData(startDate,endDate){//分页加载页面数据
	var jsonData={
	 startDate:startDate,
	 endDate:endDate,
	 pageSize:10,
	 pageNum:1
	};
	$("#domainReportTab").pagination({
		url: "/visit/page-analysis-report/loadDomainReportByPage",
		paramJson:jsonData
	});	
}
function downloadFile(){
	var startDate = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD');
	var endDate = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');	
	window.location.href="/visit/page-analysis-report/downDomainFile?startDate="+startDate+"&endDate="+endDate;
}
$(function(){//页面初始化
	 var currentDate=new Date();
	 var endDate=new Date();
	 var startDate=new Date(currentDate.setMonth(currentDate.getMonth()-1));
	$('#date01').daterangepicker({
		 startDate: startDate,
		  endDate: endDate,
		  format: "YYYY-MM-DD"
		  
	},function(start, end,label) {
		var startDate=start.format('YYYY-MM-DD');
		var endDate = end.format('YYYY-MM-DD');
		loadDomainPageData(startDate,endDate);
		loadTotalStatistics(startDate,endDate);
	});
	var sd = $("#date01").data("daterangepicker").startDate.format('YYYY-MM-DD')
	var ed = $("#date01").data("daterangepicker").endDate.format('YYYY-MM-DD');
	$("#downLoadDomainIcon").on("click",downloadFile);
	loadDomainPageData(sd,ed);
	loadTotalStatistics(sd,ed);
});


