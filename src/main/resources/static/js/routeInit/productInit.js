/**
 * 产品管理
 */
MetronicApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        // 默认跳转路径
        // $urlRouterProvider.otherwise("/product_list.html");

        $stateProvider
        //小品会管理
            .state('product_manage', {
                ncyBreadcrumb: {
                    label: '产品管理'
                }
            })
        //产品列表
            .state(
                'product_list',
                {
                    url: "/product_list.html",
                    templateUrl: "views/product/product_list.html",
                    data: {
                        pageTitle: '产品列表管理'
                    },
                    ncyBreadcrumb: {
                        label: '产品列表管理',
                        parent: 'product_manage'
                    },
                    controller: "productController",
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad
                                    .load([{
                                        name: 'MetronicApp',
                                        insertBefore: '#ng_load_plugins_before',
                                        files: [
                                            '../assets/global/plugins/select2/select2.css',
                                            '../assets/global/plugins/angularjs/plugins/ui-select/selectize.default.css',
                                            '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                                            '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                                            '../assets/global/plugins/angularjs/angular-sanitize.js',
                                            'js/controllers/product/productController.js']
                                    }]);
                            }]
                    }
                })
            .state('product_detail',
                {
                    url: "/product_detail/:id",
                    templateUrl: "views/product/product_detail.html",
                    controller: 'productDetailController',
                    data: {
                        pageTitle: '产品'
                    },
                    ncyBreadcrumb: {
                        label: '产品',
                        parent: 'product_list'
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'MetronicApp',
                                insertBefore: '#ng_load_plugins_before',
                                files: [
                                    '../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                                    '../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
                                    'js/controllers/product/productController.js']
                            }]);
                        }]
                    }
                });
    }]);