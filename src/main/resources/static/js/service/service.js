/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope','securityService',function($rootScope,securityService) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 200
                // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'layout/css/',
        userDetailsId: ''
    };

    $rootScope.settings = settings;

    //securityService.setUserInfo('YJP_OP_UserInfo');
    
    //console.log($rootScope.currentUserInfo);
    
    //配置静态资源访问 权限
    $rootScope.privilegeSettings = {

    }
    
    //获取用户角色对静态资源的访问权限
    $rootScope.userPrivileges = '';
   /* $.post('findUserPrivilegeList.action').success(
        function(data) {
            $rootScope.userPrivileges = data;
            console.log("获取权限信息>>>>>>>>>>>>>>>>>>>" + data);
        }).error(function(data) {
        console.log(data);
    });*/

    return settings;
}]);
//
// //Interceptor Service拦截器
// MetronicApp.factory('myInterceptor', ['$q', '$rootScope',
//     function($q, $rootScope) {
//         var Interceptor = {
//             'request': function(config) {
//                 var access = false;
//                 //检查文件是否已经配置了权限
// //                console.log(config);
// //                console.log(config.url);
//                 var url = config.url.toLowerCase().replace("/himalaya", "");
// //                console.log(url)
//                 var privilegeCode = $rootScope.privilegeSettings[url];
// //                console.log(privilegeCode);
//
//                 //页面有权限限制， 检查用户是否有访问权限
//                 if (privilegeCode != null) {
//                     if ($rootScope.userPrivileges.datas != null) {
//                         $rootScope.userPrivileges.datas.forEach(function(privilege) {
//                             if (privilege.privilegeCode == privilegeCode) {
//                                 access = true;
//                             }
//                         });
//                     }
//                 } else {
//                     //页面不需要权限
//                     access = true;
//                 }
//
//                 if (!access) {
//                     console.log("你没有权限访问当前页面" + config.url);
//                     $rootScope.$state.go('dashboard');
//                 }
//                 return config;
//             },
//             'response': function(config) {
//                 if (config.data == 'failed') {
//                     console.log("权限不足，不能访问" + config);
//                     $rootScope.$state.go('dashboard');
//                 }
//                 return config;
//             },
//             'requestError': function(rejection) {
//                 //console.log('myInterceptor requestError');
//                 //console.log(rejection);
//                 return rejection;
//             },
//             'responseError': function(rejection) {
//                 //console.log('myInterceptor responseError');
//                 return rejection;
//             }
//         };
//
//         return Interceptor;
//     }
// ]);

// 上传文件service
MetronicApp.service('fileUpload', ['$http', function($http) {
    this.uploadFileToUrl = function(params, picModel, files, uploadUrl) {
        var fd = new FormData();
        fd.append("file", files[0]);
        fd.append("file", files[1]);
        fd.append("file", files[2]);
        fd.append("file", files[3]);
        fd.append("file", files[4]);
        fd.append('owner', picModel.owner);
        fd.append('sequence', picModel.sequence);
        fd.append('code', picModel.code);
        fd.append('businessId', picModel.businessId);
        fd.append('params', params);

        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).success(function(data) {
            console.log(data);
        }).error(function() {});
    }

}]);


MetronicApp.service('fileDownload', ['$http', function($http) {

    this.downloadFileToUrl = function(picModel, picUrl, downloadUrl) {
        return $http.post(downloadUrl, {
            'picUrl': picUrl,
            'code': picModel.code,
            'businessId': picModel.businessId,
            'id': picModel.id
        }).success(function(data) {
            console.log(data.picUrl);
        }).error(function(error) {});
    }

}]);

//
MetronicApp.factory('RecursionHelper', ['$compile', function($compile) {
    return {
        /**
         * Manually compiles the element, fixing the recursion loop.
         * @param element
         * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
         * @returns An object containing the linking functions.
         */
        compile: function(element, link) {
            // Normalize the link parameter
            if (angular.isFunction(link)) {
                link = {
                    post: link
                };
            }

            // Break the recursion loop by removing the contents
            var contents = element.contents().remove();
            var compiledContents;
            return {
                pre: (link && link.pre) ? link.pre : null,
                /**
                 * Compiles and re-adds the contents
                 */
                post: function(scope, element) {
                    // Compile the contents
                    if (!compiledContents) {
                        compiledContents = $compile(contents);
                    }
                    // Re-add the compiled contents to the element
                    compiledContents(scope, function(clone) {
                        element.append(clone);
                    });
                    // Call the post-linking function, if any
                    if (link && link.post) {
                        link.post.apply(null, arguments);
                    }
                }
            };
        }
    };
}]);

//ajax service
MetronicApp.service('ajaxService', ['$http', "blockUI", function($http, blockUI) {

    this.AjaxDelete = function(route, successFunction, errorFunction) {
        setTimeout(function() {
            $http({
            		method:"DELETE",
            		url:route
            }).success(
                function(response, status, headers, config) {
                    successFunction(response, status);
                }).error(
                function(response) {
                    errorFunction(response);
                });
        }, 500);
    };


    this.AjaxPut = function(data, route, successFunction, errorFunction) {
        setTimeout(function() {
            $http({
            		method:"PUT",
            		url:route,
            		data:data
            }).success(
                function(response, status, headers, config) {
                    successFunction(response, status);
                }).error(
                function(response) {
                    errorFunction(response);
                });
        }, 500);
    };

    this.AjaxPost = function(data, route, successFunction, errorFunction) {
        setTimeout(function() {
            $http.post(route, data).success(
                function(response, status, headers, config) {
                    successFunction(response, status);
                }).error(
                function(response) {
                    errorFunction(response);
                });
        }, 500);
    }

    this.AjaxGet = function(route, successFunction, errorFunction) {
        setTimeout(function() {
            $http({
                method: 'GET',
                url: route
            }).success(
                function(response, status, headers, config) {
                    successFunction(response, status);
                }).error(
                function(response) {
                    errorFunction(response);
                });
        }, 500);
    }

    this.AjaxGetWithData = function(data, route, successFunction, errorFunction) {
        setTimeout(function() {
            $http({
                method: 'GET',
                url: route,
                params: data,
                dataType: "json"
            }).success(
                function(response, status, headers, config) {
                    successFunction(response, status);
                }).error(
                function(response) {
                    errorFunction(response);
                });
        }, 500);
    }

    this.AjaxPostWithBlock = function(data, route, successFunction, errorFunction) {
        console.log(blockUI)
        var dataBlockUI = blockUI.instances.get("dataBlockUI");
        dataBlockUI.start();
        setTimeout(function() {
            $http.post(route, data).success(
                function(response, status, headers, config) {
                    successFunction(response, status);
                    dataBlockUI.stop();
                }).error(
                function(response) {
                    errorFunction(response);
                    dataBlockUI.stop();
                });
        }, 500);
    }
    
    this.AjaxGetWithBlock = function(route, successFunction, errorFunction) {
        console.log(blockUI)
        var dataBlockUI = blockUI.instances.get("dataBlockUI");
        dataBlockUI.start();
        setTimeout(function() {
            $http.get(route).success(
                function(response, status, headers, config) {
                    successFunction(response, status);
                    dataBlockUI.stop();
                }).error(
                function(response) {
                    errorFunction(response);
                    dataBlockUI.stop();
                });
        }, 500);
    }

}]);


/**
 * ModalService
 */
MetronicApp.service('modalService', ['$modal', function($modal) {
    this.openModal = function(config) {
        var DEFAULT = {
            url: 'views/modals/popupMessage.html',
            ctrl: 'modalInstanceCtrl',
            size: '',
            param: ''
        }

        var config = $.extend(DEFAULT, config);

        //创建弹框对象
        var modalInstance = $modal.open({
            templateUrl: config.url,
            controller: config.ctrl,
            size: config.size,
            resolve: {
                items: function() {
                    return config.param;
                }
            }
        });

        //弹框打开后执行
        if (config.openedFunction && typeof(openedFunction) == "function") {
            modalInstance.opened.then(function() {
                config.openedFunction();
            });
        }

        //弹框提交成功后回掉函数
        modalInstance.result.then(function(result) {
            config.responseSuccess(result)
        }, function(reason) {
            config.responseError(reason)
        });
    }
}]);

/**
 * 自定义alert提示窗口<br>
 * 
 * usage:<br>
 * 1) 只提示消息 
 *    ejpAlert.show('your message');
 * 2) 自定义标题的提示消息
 *    ejpAlert.show({title:'your title',msg:'your message'});
 * 3) 带响应操作的提示消息
 *    ejpAlert.show('your message').result.then(function(param){
 *    	  // OK 按钮响应
 *        // your code
 *    },function(param){
 *        // 取消按钮响应
 *        // your code
 *    });
 * */
MetronicApp.service('ejpAlert', ['$modal','$http', function($modal,$http) {
	/*消息提示模式窗口*/
    this.show = function(config) {
    	var DEFAULT = {
			templateUrl:'views/modals/common/popupMessage.html',
			controller:function($scope, $modalInstance, items){
				$scope.results = items;
				// 确认按钮
				$scope.ok = function() {
					$modalInstance.close();
				}; 
				// 取消按钮
				$scope.cancel = function() {
					$modalInstance.dismiss('cancel');
				};
			},
			size:'sm',
			title:'提示消息',
			msg:''
    	}
    	
    	var cfg = (Object.prototype.toString.call(config) === "[object String]") ? $.extend(DEFAULT, {msg:config}) : $.extend(DEFAULT, config);
    	
        //创建弹框对象
        var modalInstance = $modal.open({
            templateUrl: cfg.templateUrl,
            controller: cfg.controller,
            size: cfg.size,
            resolve: {
            	items: function() {
                    return {title:cfg.title,msg:cfg.msg};
                }
            }
        });
        return modalInstance;
    };
    /*审核确认模式窗口*/
    this.check = function(config){
    	var DEFAULT = {
			templateUrl:'views/modals/common/popupCheckWin.html',
			controller:function($scope, $modalInstance, items){
				$scope.results = items;
				// 确认按钮
				$scope.ok = function() {
					$modalInstance.close();
				}; 
				// 取消按钮
				$scope.cancel = function() {
					$modalInstance.dismiss('cancel');
				};
			},
			size:'sm',
			title:'审核提示',
			msg:''
    	}
    	
    	var cfg = (Object.prototype.toString.call(config) === "[object String]") ? $.extend(DEFAULT, {msg:config}) : $.extend(DEFAULT, config);
    	
        //创建弹框对象
        var modalInstance = $modal.open({
            templateUrl: cfg.templateUrl,
            controller: cfg.controller,
            size: cfg.size,
            resolve: {
            	items: function() {
                    return {title:cfg.title,msg:cfg.msg};
                }
            }
        });
        return modalInstance;    	
    };

    /*选择产品模式窗口*/
    this.selectProduct = function(params){
            //创建弹框对象
            var modalInstance = $modal.open({
                templateUrl: 'views/modals/common/popupProduct.html',
                controller: 'SelectProductController',
                size: 'lg',
                resolve: {
                	params: function() {
                        return {param:params};
                    }
                }
            });
            return modalInstance; 	
    	
    }
    /*选择用户模式窗口*/
    this.selectUser = function(params){
            //创建弹框对象
            var modalInstance = $modal.open({
                templateUrl: 'views/modals/common/popupUser.html',
                controller: 'SelectUserController',
                size: 'lg',
                resolve: {
                	params: function() {
                        return {param:params};
                    }
                }
            });
            return modalInstance;
    	
    }
    
    // 根据城市选择产品
    this.selectProductSKUByCity = function(params){
    	 //创建弹框对象
        var modalInstance = $modal.open({
            templateUrl: 'views/modals/common/popupProductSKUByCity.html',
            controller: 'SelectProductByCityController',
            size: 'lg',
            resolve: {
            	params: function() {
                    return {param:params};
                }
            }
        });
        return modalInstance;
    };
    
 // 根据城市选择类目
    this.selectCategoryByCity = function(params){
    	 //创建弹框对象
        var modalInstance = $modal.open({
            templateUrl: 'views/modals/common/popupCategoryByCity.html',
            controller: 'SelectCategoryByCityController',
            size: 'lg',
            resolve: {
            	params: function() {
                    return {param:params};
                }
            }
        });
        return modalInstance;
    };
    
    // 选择组合产品下各项规则
    this.selectRuleByCity = function(params){
    	 //创建弹框对象
        var modalInstance = $modal.open({
            templateUrl: params.templateUrl,//'views/modals/common/popupRuleByCity.html',
            controller: 'SelectRuleByCityController',
            size: 'lg',
            resolve: {
            	params: function() {
                    return {param:params};
                }
            }
        });
        return modalInstance;
    };
    
    /*选择用户模式窗口*/
    this.selectUserByCity = function(params){
            //创建弹框对象
            var modalInstance = $modal.open({
                templateUrl: 'views/modals/common/popupUser.html',
                controller: 'SelectUserByCityController',
                size: 'lg',
                resolve: {
                	params: function() {
                        return {param:params};
                    }
                }
            });
            return modalInstance;
    	
    };
    
    // 选择规则下的商品
    this.selectProductOfRule = function(obj){
    	var modalInstance = $modal.open({
    		templateUrl:'views/modals/common/popupProductSKUByCity.html',
    		controller:'SelectProductOfRuleController',
    		size:'lg',
    		resolve:{
    			params:function(){
    				return {param:obj};
    			}
    		}
    	});
    	
    	return modalInstance;
    }
   
    
    //判定城市是否合法
    this.getCityId = function(city){
    	
    	var url = "city/getCityId.action";
    	var id = '';
    	
    	$http.post(url,city)
    	    .success(function(data){
    	    	id = data;
//    	    	console.log('city id of ' + JSON.stringify(city) + ' is ' + id + ' and data is ' + data);
    	    })
    	    .error(function(data){
//    	    	this.show('城市信息不合法');
    	    	console.log('failed get city id of ' + JSON.stringify(city));
    	    });
    	
    	return id;
    };
    
}]);


/**
 * securityService.js
 */
MetronicApp.service('securityService', ['$rootScope', function ($rootScope) {
	this.setUserInfo = function(cookieName) {
		var search = cookieName + "="
		var returnvalue = "";
		if (document.cookie.length > 0) {
			offset = document.cookie.indexOf(search);
			if (offset != -1) {
				offset += search.length
				end = document.cookie.indexOf(";",
						offset);
				if (end == -1)
					end = document.cookie.length;
				returnvalue = decodeURIComponent(document.cookie.substring(offset, end));
				// unescape(document.cookie.substring(offset,
				// end))
			}
		}
		$rootScope.currentUserInfo = JSON.parse(returnvalue);
		return returnvalue;
	};
}]);

MetronicApp.service('utilService', ['$http', function($http) {

    //把obj的json数组添加target的json数组
    this.unionJSON = function(target, obj) {
        for (var i = 0; i < obj.length; i++) {
            target.push(obj[i]);
        }
    }

    //判断item对象的attr属性是否存在于一个json数组
    this.isExist = function(target, item, attr) {
        var val = item.attr;
        for (var i = 0; i < target.length; i++) {
            var cur = obj[i].attr;
            if (cur == val) {
                return true;
            } else {
                return false;
            }
        }
    }

    this.formatDate = function(stamp) {
        var stamp = new Date(stamp);
        var year = stamp.getFullYear();
        var month = stamp.getMonth() + 1;
        var date = stamp.getDate();
        var hour = stamp.getHours();
        var minute = stamp.getMinutes();
        var second = stamp.getSeconds();
        return year + "-" + month + "-" + date
    }
}]);

//获取用户Cookie信息
MetronicApp.service('getUserInfo',function(){
	var getUserInfo=function getCookieVal(cookieName) {
        var search = cookieName+"=";
        var returnvalue = "";
        if (document.cookie.length > 0) {
            offset = document.cookie.indexOf(search);
            if (offset != -1) {
                offset += search.length
                end = document.cookie.indexOf(";",
                    offset);
                if (end == -1)
                    end = document.cookie.length;
                returnvalue = decodeURIComponent(document.cookie
                    .substring(offset, end));
                // unescape(document.cookie.substring(offset,
                // end))
            }
        }
        return returnvalue;
    };
    return {
    	userInfo:function(){
    		user=getUserInfo('YJP_PARTNER_UserInfo');
    		if(user==undefined||user==''){
    			return null;
    		}
    		return JSON.parse(user);
    	}
    }
});

//等待数据加载
MetronicApp.service('pagedataLoading',function(){
	this.loading = function(){
		Metronic.blockUI({
			target: '#datatable_ajax',
			boxed: true
		});
	}
	this.unloading = function(){
		Metronic.unblockUI('#datatable_ajax');
	}
});




//数据存取帮助服务
MetronicApp.service('dataHelper',function(){
	
	this.setObject = function(key,value){
		$.cookie(key, JSON.stringify(value)); 
	}
	this.getObject = function(key){
		var k = $.cookie(key);
		if(k == undefined || k == null || k == ''){
			return null;
		}
		return JSON.parse($.cookie(key));
	}
	
	this.setString = function(key,value){
		$.cookie(key, value); 
	}
	this.getString = function(key){
		return $.cookie(key);;
	}
});
