var ProductDetail = function(){
    var handleInfo = function() {
        $("#btnEditIntro").click(function(){
            var info = $("#formView p").html().trim();           
            $("#switch").val("edit");
            $("#formView").hide();
            $("#formEdit").show();
            $("#formEdit textarea").val(info);
            console.log(info);
        })

        $("#btnSaveIntro").click(function(){
            $("#switch").val("view");
            $("#formView").show();
            $("#formEdit").hide();
        })

        $("#btnCancelEdit").click(function(){
            $("#switch").val("view");
            $("#formView").show();
            $("#formEdit").hide();
        })

    }

    return{
         //main function to initiate the module
        init: function () {

            handleInfo();

        }
    }

}();
