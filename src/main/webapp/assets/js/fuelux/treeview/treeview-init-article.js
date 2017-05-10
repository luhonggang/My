//树结构
var UITree = function () {
    return {
        init: function () {
            $(".tree-folder-header").click(function(){
                $(this).siblings(".tree-folder-content").children(".tree-folder").show();
                $(this).siblings(".tree-folder-content").children(".tree-item").show();
                $(this).children("i").addClass(".fa-folder-open");
            });           
        }
    };
}();