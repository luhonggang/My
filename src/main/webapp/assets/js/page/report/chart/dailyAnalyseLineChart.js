

var lineChart = echarts.init(document.getElementById('linePic'));

var lineOption = {
	noDataLoadingOption : {
		text : '暂无数据',
		effect : 'bubble',
		effectOption : {
			effect : {
				n : 0
			}
		}
	},
	tooltip : {
		trigger : 'axis'
	},
	legend : {data:[]},

	xAxis : [ {
		type : 'category',
		boundaryGap : false,
//	 data : result.tpv.xdata
	} ],
	yAxis : [ {
		type : 'value'
	} ],

	series : [0]
};

var defaultLineChart;
var defaultLineOption;
function drawDefaultLinePic() {
	// 基于准备好的dom，初始化echarts图表
	defaultLineChart = echarts.init(document.getElementById('linePic'));
	defaultLineOption = {
		noDataLoadingOption : {
			text : '暂无数据',
			effect : 'bubble',
			effectOption : {
				effect : {
					n : 0
				}
			}
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {

			x : 'right'
		},

		xAxis : [ {
			type : 'category',
			boundaryGap : false,
			data : []
		} ],
		grid : {
			y : 10
		},
		yAxis : [ {
			type : 'value'
		} ],

		series : [ 0 ]
	};

	defaultLineChart.setOption(defaultLineOption);
}

