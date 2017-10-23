var CompanyUsers = function(){
	var initCitySelect = function(){
        $('#city-select').citySelect({
            nodata: "none"
        });
    }

    var initPickers = function () {
        //init date pickers
        $('.date-picker').datepicker({
            rtl: Metronic.isRTL(),
            autoclose: true
        });
    }

    return {

        //main function to initiate the module
        init: function () {

            initPickers();
            initCitySelect();
            
        }

    };

}();