

//审核钢信通管理
var gxtaudits = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#gxtaudits').dataTable({
              "sDom": "t<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
              "iDisplayLength": 15,
              
              "language": {
                  "search": "",
                  "sLengthMenu": "_MENU_",
                  "oPaginate": {
                      "sPrevious": "上一页",
                      "sNext": "下一页"
                  }
              },
              "aoColumns": [
			    { "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": true },
				{ "bSortable": false },
                { "bSortable": false },
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();

//钢信通认证列表管理
var gxtauthentication = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#gxtauthentication').dataTable({
              "sDom": "t<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
              "iDisplayLength": 15,
              
              "language": {
                  "search": "",
                  "sLengthMenu": "_MENU_",
                  "oPaginate": {
                      "sPrevious": "上一页",
                      "sNext": "下一页"
                  }
              },
              "aoColumns": [
			    { "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": true },
				{ "bSortable": true },
				{ "bSortable": false },
				{ "bSortable": false },
                { "bSortable": false },
				{ "bSortable": false },
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();

//审核钢信通证书管理
var gxtauditscertificate = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#gxtauditscertificate').dataTable({
              "sDom": "t<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
              "iDisplayLength": 15,
              
              "language": {
                  "search": "",
                  "sLengthMenu": "_MENU_",
                  "oPaginate": {
                      "sPrevious": "上一页",
                      "sNext": "下一页"
                  }
              },
              "aoColumns": [
			    { "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": true },
                { "bSortable": false },
				{ "bSortable": false },
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();

//钢信通证书管理
var gxtcertificate = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#gxtcertificate').dataTable({
              "sDom": "t<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
              "iDisplayLength": 15,
              
              "language": {
                  "search": "",
                  "sLengthMenu": "_MENU_",
                  "oPaginate": {
                      "sPrevious": "上一页",
                      "sNext": "下一页"
                  }
              },
              "aoColumns": [
			    { "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": true },
				{ "bSortable": false },
				{ "bSortable": true },
                { "bSortable": false },
				{ "bSortable": false },
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();

//价格区间管理
var priceinterval = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#priceinterval').dataTable({
              "sDom": "t<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
              "iDisplayLength": 15,
              
              "language": {
                  "search": "",
                  "sLengthMenu": "_MENU_",
                  "oPaginate": {
                      "sPrevious": "上一页",
                      "sNext": "下一页"
                  }
              },
              "aoColumns": [
			    { "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": false },
				{ "bSortable": true },
                { "bSortable": true }
              ],

              "aaSorting": []
          });
      }
  };
}();

