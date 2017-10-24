MetronicApp.controller("productController",
    ['$rootScope', '$scope', '$http', '$location', '$modal', 'pagedataLoading', 'ejpAlert', 'getUserInfo',
        function ($rootScope, $scope, $http, $location, $modal, pagedataLoading, ejpAlert, getUserInfo) {
            $scope.$on('$viewContentLoaded', function () {
                Metronic.initAjax();

                // set default layout mode
                $rootScope.settings.layout.pageBodySolid = false;
                $rootScope.settings.layout.pageSidebarClosed = false;

                var vm = $scope.vm = {};
                vm.pages = {
                    itemsPerPage: 20,
                    index: 1,
                    totalResult: 0,
                    totalPage: 0
                };
                vm.items = [];
                $scope.vo = {
                    pageIndex:vm.pages.index,
                    state:1
                };
                // $scope.vo.pageIndex = vm.pages.index;

                $scope.productState = [{
                    value:0,
                    name:'下架'
                }, {
                    value:1,
                    name:'上架'
                }];

                //获取用户角色
                $scope.identity = getUserInfo.userInfo();

                $scope.getProductList = function () {
                    //显示加载中……
                    pagedataLoading.loading();
                    $http.post("product/listProduct", $scope.vo).success(function (data) {
                        if (data.success === true) {
                            $scope.vm.items = data.datas;
                            $scope.vm.pages.totalResult = data.totalCount;
                            $scope.vm.pages.totalPage = data.totalPage;
                        } else {
                            ejpAlert.show(data.desc);
                        }
                        //隐藏加载中……
                        pagedataLoading.unloading();
                    })
                }
                $scope.getProductList();

                /* ***********************查询功能********************************** */
                //查询按钮
                $scope.searchClick = function () {
                    $scope.vm.pages = {
                        itemsPerPage: 20,
                        index: 1,
                        totalResult: 0,
                        totalPage: 0
                    };
                    $scope.getProductList();
                };
                //清空按钮
                $scope.resetClick = function () {
                    $scope.vo = {};
                    $scope.getProductList();
                };


                //修改商品价格
                $scope.changePrice = function (data) {
                    var modalInstance = $modal.open({
                        templateUrl: 'views/modals/product/changePrice.html',
                        controller: 'changePriceController',
                        //大小配置不能自定义大小，只能是sm，md，lg等这些值
                        size: 'sm',
                        resolve: {
                            requestResults: function () {
                                return data;
                            }
                        }
                    });

                    // 成功的回调方法 （可带参数）
                    modalInstance.result.then(function () {
                        $scope.getProductList();
                        // 失败的回调方法
                    }, function () {
                        $scope.getProductList();
                    });
                };

                $scope.disable = function (data) {
                    $http.post('product/disable/' + $scope.identity.userId, data).success(function (data) {
                        if (data.success === true) {
                            ejpAlert.show('下架成功~');
                            $scope.getProductList();
                        } else {
                            ejpAlert.show(data.desc);
                        }
                    });
                }

            });
        }])
    .controller("changePriceController",
        ['$rootScope', '$scope', '$state', 'settings', '$http', '$location', '$modal', '$stateParams', '$log', 'dataHelper', 'ejpAlert', 'getUserInfo', 'pagedataLoading', '$modalInstance', 'requestResults',
            function ($rootScope, $scope, $state, settings, $http, $location, $modal, $stateParams, $log, dataHelper, ejpAlert, getUserInfo, pagedataLoading, $modalInstance, requestResults) {

                $scope.product = {
                    id: requestResults.id,
                    sellingPrice: requestResults.sellingPrice
                };

                var identity = getUserInfo.userInfo();
                $scope.ok = function () {
                    if ($scope.product.sellingPrice <= 0) {
                        ejpAlert.show('价格必须大于0~');
                    } else {
                        $http.post('product/changePrice/' + identity.userId, $scope.product).success(function (data) {
                            if (data.success === true) {
                                ejpAlert.show('设置成功');
                                $modalInstance.close();
                            } else {
                                ejpAlert.show(data.desc);
                            }
                        });
                    }
                };
                // 取消按钮
                $scope.cancel = function () {
                    // 跳转到列表页面
                    $modalInstance.dismiss('cancel');
                };
            }]);

MetronicApp.controller("productDetailController",
    ['$rootScope', '$scope', '$http', '$location', '$modal', 'pagedataLoading', 'ejpAlert', '$stateParams',
        function ($rootScope, $scope, $http, $location, $modal, pagedataLoading, ejpAlert, $stateParams) {
            $scope.$on('$viewContentLoaded', function () {
                Metronic.initAjax();

                // set default layout mode
                $rootScope.settings.layout.pageBodySolid = false;
                $rootScope.settings.layout.pageSidebarClosed = false;

                $scope.id = $stateParams.id;

                $scope.product = {};

                //获得小品会详情
                $scope.tastDetail = function () {
                    // 正在加载
                    Metronic.blockUI({
                        message: '加载中，请稍后...'
                    });
                    $http.get("product/getProductDetail/" + $stateParams.id).success(function (data) {
                        if (data.success === true) {
                            $scope.product = data.data;
                        } else {
                            ejpAlert.show(data.desc);
                        }
                        // 取消加载
                        Metronic.unblockUI();
                    })
                }
                $scope.tastDetail();
            });
        }]);