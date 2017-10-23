MetronicApp.controller("productController",
    ['$rootScope', '$scope', '$http', '$location', '$modal', 'pagedataLoading', 'ejpAlert', 'getUserInfo',
        function ($rootScope, $scope, $http, $location, $modal, pagedataLoading, ejpAlert, getUserInfo) {
            $scope.$on('$viewContentLoaded', function () {
                Metronic.initAjax();

                // set default layout mode
                $rootScope.settings.layout.pageBodySolid = false;
                $rootScope.settings.layout.pageSidebarClosed = false;

                $scope.vo = {};

                var vm = $scope.vm = {};
                vm.pages = {
                    itemsPerPage: 20,
                    index: 1,
                    totalResult: 0,
                    totalPage: 0
                };
                vm.items = [];

                //获取用户角色
                $scope.identity = getUserInfo.userInfo();

                $scope.getTastingList = function () {
                    // //显示加载中……
                    // pagedataLoading.loading();
                    // $http.post("tasting/findTastingList/"+vm.pages.index,$scope.vo).success(function(data){
                    //     if(data.result==="success"){
                    //         $scope.vm.items = data.datas.dataList ;
                    //         $scope.vm.pages.totalResult = data.datas.pager.recordCount;
                    //         $scope.vm.pages.totalPage = data.datas.pager.totalPage;
                    //     }
                    //     //隐藏加载中……
                    //     pagedataLoading.unloading();
                    // })
                }
                $scope.getTastingList();

                /* ***********************查询功能********************************** */
                //查询按钮
                $scope.cityVo = {};
                $scope.searchClick = function () {
                    $scope.vo.province = $scope.cityVo ? $scope.cityVo.province : null;
                    $scope.vo.city = $scope.cityVo.city ? $scope.cityVo.city.name : null;
                    $scope.vo.cityId = $scope.cityVo.city ? $scope.cityVo.city.id : null;
                    if ($scope.vo.province && !$scope.vo.cityId) {
                        ejpAlert.show("城市搜索必须选择省和市！");
                        return;
                    }

                    $scope.vm.pages = {
                        itemsPerPage: 20,
                        index: 1,
                        totalResult: 0,
                        totalPage: 0
                    };
                    $scope.getTastingList();
                };
                //清空按钮
                $scope.resetClick = function () {
                    $scope.vo = {};
                    $scope.cityVo = {};
                    $scope.getTastingList();
                };

            });
        }]);