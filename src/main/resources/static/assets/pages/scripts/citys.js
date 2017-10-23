var Citys = function(){
    var initCitySelect = function(){
        $('#city-select').citySelect({
            nodata: "none"
        });
    }

    return {

        //main function to initiate the module
        init: function () {

            initCitySelect();
            
        }

    };

    }();