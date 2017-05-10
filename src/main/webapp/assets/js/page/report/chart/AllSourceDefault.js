/**
 * 全局访问页面默认加载数据图
 */

var defaultLineChart;
var defaultLineChart2;
var defaultLineOption;
function drawDefaultLinePic() {
	// 基于准备好的dom，初始化echarts图表
	defaultLineChart = echarts.init(document.getElementById('line'));
	defaultLineChart2 = echarts.init(document.getElementById('line2'));
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
	defaultLineChart2.setOption(defaultLineOption);
}

function drawDefaultCirclePic() {
	var defaultCircleChart1 = echarts.init(document.getElementById('circle'));
	var defaultCircleChart2= echarts.init(document.getElementById('circle2'));
	var	defaultCircleOption = {
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
			trigger : 'item',
			formatter : "{b} : {c} ({d}%)"
		},
		legend : {
			show : false,
			data : []
		},

		calculable : false,
		series : [ 0 ]
	};
	defaultCircleChart1.setOption(defaultCircleOption);
	defaultCircleChart2.setOption(defaultCircleOption);
}