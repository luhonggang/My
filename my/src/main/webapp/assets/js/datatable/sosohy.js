//推荐企业
var companies = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#companies').dataTable({
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
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();

//新增推荐企业
var addedCompanies = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#addedcompanies').dataTable({
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
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();

//推荐钢厂
var steelmill = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#steelmill').dataTable({
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

//新增推荐钢厂
var addedsteelmill = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#addedsteelmill').dataTable({
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
                { "bSortable": true },
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();

//推荐钢铁协会
var association = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#association').dataTable({
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

//新增推荐钢铁协会
var addedassociation = function () {
  return {
      init: function () {
          //Datatable Initiating
          var oTable = $('#addedassociation').dataTable({
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
                { "bSortable": true },
                { "bSortable": false }
              ],

              "aaSorting": []
          });
      }
  };
}();

//企业分类管理
var InitiateEditableDataTable = function () {
    return {
        init: function () {
            //Datatable Initiating
            var oTable = $('#editabledatatable').dataTable({
               
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
                  null,
                  null,
                  null,
                  { "bSortable": false }
                ]
            });

            var isEditing = null;

            //Add New Row
            $('#editabledatatable_new').click(function (e) {
                e.preventDefault();
                var aiNew = oTable.fnAddData(['', '', '', '',
                        '<a href="#" class="btn btn-success btn-xs save"><i class="fa fa-edit"></i> 保存</a> <a href="#" class="btn btn-warning btn-xs cancel"><i class="fa fa-times"></i> 取消</a>'
                ]);
                var nRow = oTable.fnGetNodes(aiNew[0]);
                editRow(oTable, nRow);
                isEditing = nRow;
            });

            //c an Existing Row
            $('#editabledatatable').on("click", 'a.delete', function (e) {
                e.preventDefault();

                if (confirm("确定要删除这一行吗?") == false) {
                    return;
                }

                var nRow = $(this).parents('tr')[0];
                oTable.fnDeleteRow(nRow);
                alert("该行已被删除");
            });

            //Cancel Editing or Adding a Row
            $('#editabledatatable').on("click", 'a.cancel', function (e) {
                e.preventDefault();
                if ($(this).attr("data-mode") == "new") {
                    var nRow = $(this).parents('tr')[0];
                    oTable.fnDeleteRow(nRow);
                } else {
                    restoreRow(oTable, isEditing);
                    isEditing = null;
                }
            });

            //Edit A Row
            $('#editabledatatable').on("click", 'a.edit', function (e) {
                e.preventDefault();

                var nRow = $(this).parents('tr')[0];

                if (isEditing !== null && isEditing != nRow) {
                    restoreRow(oTable, isEditing);
                    editRow(oTable, nRow);
                    isEditing = nRow;
                } else {
                    editRow(oTable, nRow);
                    isEditing = nRow;
                }
            });

            //Save an Editing Row
            $('#editabledatatable').on("click", 'a.save', function (e) {
                e.preventDefault();
                if (this.innerHTML.indexOf("保存") >= 0) {
                    saveRow(oTable, isEditing);
                    isEditing = null;
                    //Some Code to Highlight Updated Row
                }
            });


            function restoreRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);

                for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                    oTable.fnUpdate(aData[i], nRow, i, false);
                }

                oTable.fnDraw();
            }

            function editRow(oTable, nRow) {
                var aData = oTable.fnGetData(nRow);
                var jqTds = $('>td', nRow);
                jqTds[0].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[0] + '">';
                jqTds[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[1] + '">';
                jqTds[2].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[2] + '">';
                jqTds[3].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[3] + '">';
                jqTds[4].innerHTML = '<a href="#" class="btn btn-success btn-xs save"><i class="fa fa-save"></i> 保存</a> <a href="#" class="btn btn-warning btn-xs cancel"><i class="fa fa-times"></i> 取消</a>';
            }

            function saveRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate('<a href="#" class="btn btn-info btn-xs edit"><i class="fa fa-edit"></i> 编辑</a> <a href="#" class="btn btn-danger btn-xs delete"><i class="fa fa-trash-o"></i> 删除</a>', nRow, 4, false);
                oTable.fnDraw();
            }

            function cancelEditRow(oTable, nRow) {
                var jqInputs = $('input', nRow);
                oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                oTable.fnUpdate('<a href="#" class="btn btn-info btn-xs edit"><i class="fa fa-edit"></i> 编辑</a> <a href="#" class="btn btn-danger btn-xs delete"><i class="fa fa-trash-o"></i> 删除</a>', nRow, 4, false);
                oTable.fnDraw();
            }
        }

    };
}();