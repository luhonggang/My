//推荐企业
var basicDataTable = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#dsbasic').dataTable({
              "sDom": "t<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
              "iDisplayLength": 6,
              
              "language": {
                  "search": "",
                  "sLengthMenu": "_MENU_",
                  "oPaginate": {
                      "sPrevious": "上一页",
                      "sNext": "下一页"
                  }
              },
              "aoColumns": [
                null,
                { "bSortable": false },
                { "bSortable": false },
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();

