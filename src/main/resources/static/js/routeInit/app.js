/*******************************************************************************
 * Metronic AngularJS App Main Script
 ******************************************************************************/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", ["ui.router", "ui.bootstrap",
    "oc.lazyLoad", "ngSanitize", "pasvaz.bindonce", "ngMessages",
    "blockUI", "toastr", "ncy-angular-breadcrumb", "ui.select"]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/* Configure angular-block-ui */
MetronicApp.config(['blockUIConfig', function (blockUIConfig) {
    // Change the default overlay message
    blockUIConfig.message = '加载中...';

    // Change the default delay to 100ms before the blocking is visible
    blockUIConfig.delay = 100;

    // Disable automatically blocking of the user interface
    blockUIConfig.autoBlock = false;

    // Disable auto body block
    blockUIConfig.autoInjectBodyBlock = false;

    // Provide the custom template via a url
    blockUIConfig.templateUrl = 'shared/block-ui-tpl.html';

}]);

/* Configure angular-breadscrumb */
MetronicApp.config(function ($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        prefixStateName: 'dashboard',
        templateUrl: 'shared/breadscrumb-tpl.html'
    });
})

// AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config([ '$controllerProvider', function($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use
    // it
    // in new ones!
    $controllerProvider.allowGlobals();
} ]);

MetronicApp.config([ '$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(['$rootScope','$location', '$q','toastr','getUserInfo',function($rootScope,$location,$q,toastr,getUserInfo) {
        return {

            response:function(resp){

                //统一处理响应数据
                if('fail'=== resp.data.result){
                    toastr.info(resp.data.message, 'Info');
                    delete resp.data.result;
                }else if('error' === resp.data.result){
                    toastr.error(resp.data.message, 'Error');
                    delete resp.data.result;
                }else if('success'=== resp.data.result){
                    delete resp.data.detailMessage;
                }else if('failure'===resp.data.result){
                    toastr.error(resp.data.message, 'Error');
                    $location.path('/dashboard.html');
                }
                return resp;
            }
        };
    }]);
} ]);


/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope',
    function ($scope) {
        $scope.$on('$viewContentLoaded', function () {
            Metronic.initComponents(); // init core components
            // Layout.init(); // Init entire layout(header, footer, sidebar,
            // etc) on page load if the partials included in server side
            // instead of loading with ng-include directive
        });
    }]);


/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', '$http', '$log', '$location',
    'modalService', '$modal', 'getUserInfo', function ($scope, $http, $log, $location, modalService, $modal, getUserInfo) {
        $scope.$on('$includeContentLoaded', function () {
            Layout.initHeader(); // init header

            $scope.userInfo = getUserInfo.userInfo();
            $scope.open = function () {
                modalService.openModal({
                    'url': 'views/modals/common/swapRoleModal.html',
                    'ctrl': ModalSwapRoleCtrl,
                    'size': 'sm',
                    responseSuccess: function (result) {
                        if (result == 'success') {
                            window.location = "index.html";
                        }
                    },
                    responseError: function (reason) {
                        $log.info('Modal dismissed at: ' + new Date());
                    }
                });
            };

            $scope.logout = function () {
                window.location = "login.html";
            };

            $scope.upDatePassword = function () {
                //创建修改密码弹框
                var modalInstance = $modal.open({
                    templateUrl: 'views/modals/common/upDateUserPassword.html',
                    controller: 'upDateUserPasswordCtrl',
                    size: 'md',
                    resolve: {
                        items: function () {
                            return {};
                        }
                    }
                });
                modalInstance.result.then(
                    function (result) {
                        if (result == 'success') {
                            window.location = "index.html";
                        }
                    }, function (errMsg) {
                        $log.info('Modal dismissed at: ' + new Date());
                    }
                );
            };


        });
    }]).controller("upDateUserPasswordCtrl", ["$rootScope", "$scope", "$location", "$http", "$modalInstance", "getUserInfo", "ejpAlert", function ($rootScope, $scope, $location, $http, $modalInstance, getUserInfo, ejpAlert) {
    //修改用户密码

    var identity = getUserInfo.userInfo();
    $scope.result = {};

    $scope.upDatePassword = function (obj) {
        if (obj.newPass != obj.newPass1) {
            ejpAlert.show("两次密码不一致！");
            return;
        }

        if (obj.newPass.length < 6) {
            ejpAlert.show("密码至少为6位字符！");
            return;
        }

        var dto = {
            'oldPass': obj.oldPass,
            'newPass': obj.newPass,
            'identity': identity
        };
        $http.post('changePasswordByOldPassword.action', dto).success(
            function (data) {
                if (data.result == 'success') {
                    ejpAlert.show("修改成功！");
                    $modalInstance.close(data);
                } else if (data.result == 'fail') {
                    ejpAlert.show(data.message);
                } else if (data.result == 'error') {
                    $rootScope.msg = data.message;
                    // 跳转到错误页面
                    $location.path('/error.html');
                }
            });
    };
    $scope.cancel = function () {
        $modalInstance.close();
    }
}]);


/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', [
    '$scope',
    '$http',
    function ($scope, $http) {
        $scope.$on('$includeContentLoaded', function () {
            Layout.initSidebar(); // init sidebar
        });

        $scope.sidebarList = {};

        // 读取Cookie

        // var search = 'YJP_PARTNER_UserInfo' + "=";
        // var returnvalue = "";
        // if (document.cookie.length > 0) {
        //     offset = document.cookie.indexOf(search);
        //     if (offset != -1) {
        //         offset += search.length
        //         end = document.cookie.indexOf(";", offset);
        //         if (end == -1)
        //             end = document.cookie.length;
        //         returnvalue = decodeURIComponent(document.cookie.substring(offset,
        //             end));
        //         // unescape(document.cookie.substring(offset,
        //         // end))
        //     }
        // }


        $scope.getSidebarList = function () {
            $http.post('templates/findUserPrivilegeList').success(
                function (data) {
                    $scope.sidebarList = data.datas.dataList;
                    console.log(data);
                }).error(function () {
                console.log("error");
            })
        };
        $scope.getSidebarList();
    }]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer
    });
}]);


/* Init global settings and run the app */
MetronicApp.run([ "$rootScope", "settings", "$state",
    function($rootScope, settings, $state) {
        $rootScope.$state = $state; // state to be accessed from view
    } ]);


/* Setup Rounting For All Pages */
MetronicApp
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            // Redirect any unmatched url
            $urlRouterProvider.otherwise("/dashboard.html");

            $stateProvider
            // Dashboard
                .state(
                    'dashboard',
                    {
                        url : "/dashboard.html",
                        templateUrl : "views/dashboard.html",
                        data : {
                            pageTitle : '首页'
                        },
                        ncyBreadcrumb : {
                            label : '<i class="fa fa-home"></i>首页',
                        },
                        controller : "DashboardController",
                        resolve : {
                            deps : [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad
                                        .load({
                                            name : 'MetronicApp',
                                            insertBefore : '#ng_load_plugins_before', // load
                                            files : [
                                                '../assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',

                                                '../assets/pages/scripts/index.js',

                                                'js/controllers/DashboardController.js'

                                            ]
                                        });
                                } ]
                        }
                    })

                // 错误页
                .state(
                    'error',
                    {
                        url : "/error.html",
                        templateUrl : "shared/error.html",
                        data : {
                            pageTitle : '出错了'
                        },
                        ncyBreadcrumb : {
                            // label : '<i class="fa
                            // fa-home"></i>首页',
                        },
                        controller : "ErrorController",
                        resolve : {
                            deps : [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad
                                        .load({
                                            name : 'MetronicApp',
                                            insertBefore : '#ng_load_plugins_before', // load
                                            files : [ 'js/controllers/ErrorController.js' ]
                                        });
                                } ]
                        }
                    })

        } ]);