/**
 * 全局访问页面默认加载数据图
 */

function drawDefaultLinePic(div_id) {
	// 基于准备好的dom，初始化echarts图表
	var defaultLineChart = echarts.init(document.getElementById(div_id));
	var defaultLineOption = {
		noDataLoadingOption : {
			text : '暂无数据',
			effect : 'bubble',
			effectOption : {
				effect : {
					n : 0
				}
			},
			textStyle : {
				fontSize : 12
			}
		},
		tooltip : {
			trigger : 'item',
			formatter : "{b} : {c} ({d}%)"
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

function drawDefaultCirclePic(div_id) {
	var defaultCircleChart1 = echarts.init(document.getElementById(div_id));
	var	defaultCircleOption = {
			noDataLoadingOption : {
				text : '暂无数据',
				effect : 'bubble',
				effectOption : {
					effect : {
						n : 0
					}
				},
				textStyle : {
					fontSize : 12
				}
			},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		legend : {
			show : false,
			data : []
		},

		calculable : false,
		series : [ 0 ]
	};
	defaultCircleChart1.setOption(defaultCircleOption);
}