/*******************************************************************************
 * GLobal Directives
 ******************************************************************************/

// Route State Load Spinner(used on page or content load)
MetronicApp.directive('ngSpinnerBar', [ '$rootScope', function($rootScope) {
	return {
		link : function(scope, element, attrs) {
			// by defult hide the spinner bar
			element.addClass('hide'); // hide spinner bar by default

			// display the spinner bar whenever the route changes(the content
			// part started loading)
			$rootScope.$on('$stateChangeStart', function() {
				element.removeClass('hide'); // show spinner bar
			});

			// hide the spinner bar on rounte change success(after the content
			// loaded)
			$rootScope.$on('$stateChangeSuccess', function() {
				element.addClass('hide'); // hide spinner bar
				$('body').removeClass('page-on-load'); // remove page loading
				// indicator
				Layout.setSidebarMenuActiveLink('match'); // activate selected
				// link in the
				// sidebar menu

				// auto scorll to page top
				/***************************************************************
				 * setTimeout(function() { Metronic.scrollTop(); // scroll to
				 * the top on content load },
				 * $rootScope.settings.layout.pageAutoScrollOnLoad);
				 **************************************************************/
			});

			// handle errors
			$rootScope.$on('$stateNotFound', function() {
				element.addClass('hide'); // hide spinner bar
			});

			// handle errors
			$rootScope.$on('$stateChangeError', function() {
				element.addClass('hide'); // hide spinner bar
			});
		}
	};
} ])

// Handle global LINK click
MetronicApp.directive('a', function() {
	return {
		restrict : 'E',
		link : function(scope, elem, attrs) {
			if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
				elem.on('click', function(e) {
					e.preventDefault(); // prevent link click for above criteria
				});
			}
		}
	};
});

// Handle Dropdown Hover Plugin Integration
MetronicApp.directive('dropdownMenuHover', function() {
	return {
		link : function(scope, elem) {
			elem.dropdownHover();
		}
	};
});

MetronicApp.directive('tree', function($compile) {
	return {
		restrict : "E",
		scope : {
			family : '='
		},
		template : '' + '' + '<ul>'
				+ '<li ng-repeat="child in family.sonIndex">'
				+ '<tree family="child"></tree>' + '</li>' + '</ul>',
		compile : function(tElement, tAttr) {
			var contents = tElement.contents().remove();
			var compiledContents;
			return function(scope, iElement, iAttr) {
				if (!compiledContents) {
					compiledContents = $compile(contents);
				}
				compiledContents(scope, function(clone, scope) {
					iElement.append(clone);
				});
			};
		}
	};
});

MetronicApp.directive('trees',
function(RecursionHelper) {
	return {
		restrict : "E",
		replace : true,
		scope : {
			sonlabel : '='
		},
		template : '<ul class="sub-menu">'
				+ '<li ng-repeat="son in sonlabel" ng-if="son.privilegeType==\'Menu\'">'
				+ '<a href="{{son.url}}">'
				+ '<i class="{{son.icon}}"></i>'
				+ '<span class="title" ng-bind="son.privilegeName"></span><span class="arrow"  ng-if="son.sonIndex.length"></span></a>'
				+ '<trees sonlabel="son.sonIndex" ng-if="son.sonIndex.length" ></trees>'
				+ '</li></ul>',
		compile : function(element) {
			return RecursionHelper.compile(element);
		}
	}
});

// 文件上传
MetronicApp.directive('fileChange', [ '$parse', function($parse) {

	return {
		restrict : 'A',
		link : function($scope, element, attrs) {

			// Get the function provided in the file-change attribute.
			// Note the attribute has become an angular expression,
			// which is what we are parsing. The provided handler is
			// wrapped up in an outer function (attrHandler) - we'll
			// call the provided event handler inside the handler()
			// function below.
			var attrHandler = $parse(attrs['fileChange']);

			// This is a wrapper handler which will be attached to the
			// HTML change event.
			var handler = function(e) {

				$scope.$apply(function() {

					// Execute the provided handler in the directive's scope.
					// The files variable will be available for consumption
					// by the event handler.
					attrHandler($scope, {
						$event : e,
						files : e.target.files
					});
				});
			};

			// Attach the handler to the HTML change event
			element[0].addEventListener('change', handler, false);
		}
	};
} ]);

MetronicApp.directive('ngThumb',['$window',function($window) {
var helper = {
	support : !!($window.FileReader && $window.CanvasRenderingContext2D),
	isFile : function(item) {
		return angular.isObject(item)
				&& item instanceof $window.File;
	},
	isImage : function(file) {
		var type = '|'
				+ file.type.slice(file.type
						.lastIndexOf('/') + 1)
				+ '|';
		return '|jpg|png|jpeg|bmp|gif|'
				.indexOf(type) !== -1;
	}
};

return {
	restrict : 'A',
	template : '<canvas/>',
	link : function(scope, element, attributes) {
		if (!helper.support)
			return;

		var params = scope
				.$eval(attributes.ngThumb);

		if (!helper.isFile(params.file))
			return;
		if (!helper.isImage(params.file))
			return;

		var canvas = element.find('canvas');
		var reader = new FileReader();

		reader.onload = onLoadFile;
		reader.readAsDataURL(params.file);

		function onLoadFile(event) {
			var img = new Image();
			img.onload = onLoadImage;
			img.src = event.target.result;
		}

		function onLoadImage() {
			var width = params.width || this.width
					/ this.height * params.height;
			var height = params.height
					|| this.height / this.width
					* params.width;
			canvas.attr({
				width : width,
				height : height
			});
			canvas[0].getContext('2d').drawImage(
						this, 0, 0, width, height);
			}
		}
	};
} ]);

/**绑定地区数据*/
MetronicApp.directive('ngBindArea', [ '$compile', function($compile) {
	return {
		restrict : 'AC',
		compile : function ngBindCompile(templateElement) {
			$compile.$$addBindingClass(templateElement);
			return function ngBindLink(scope, element, attr) {
				$compile.$$addBindingInfo(element, attr.ngBind);
				element = element[0];
				scope.$watch(attr.ngBindArea, function ngBindWatchAction(value) {
					if (value == null || angular.isUndefined(value)) {
						element.textContent = '';
					} else if (value.province) {
						var val = value.province;
						if (value.city && value.city != value.province && value.city != value.county) {
							val += ' - ' + value.city;
						}
						if (value.county != undefined && value.county != null && value.county != ''&& value.county != "undefined") {
							val += ' - ' + value.county;
						}
						element.textContent = val;
					} else {
						element.textContent = value;
					}
				});
			};
		}
	};
}]);
/**绑定数据*/
MetronicApp.directive('ngBindWeek', [ '$compile', function($compile) {
	return {
		restrict : 'AC',
		compile : function ngBindCompile(templateElement) {
			$compile.$$addBindingClass(templateElement);
			return function ngBindLink(scope, element, attr) {
				$compile.$$addBindingInfo(element, attr.ngBind);
				element = element[0];
				scope.$watch(attr.ngBindWeek, function ngBindWatchAction(value) {
					if (value == null || angular.isUndefined(value)) {
						element.textContent = '';
					} else {
						
						var weekdays = ["周日","周一","周二","周三","周四","周五","周六"];
						element.textContent = weekdays[value];
					}
				});
			};
		}
	};
}]);
/**
 * ng-model日期数据格式化指令 
**/
MetronicApp.directive('ejpDateformat', ['$filter',function($filter){
	return {
		restrict : 'A',
		require: 'ngModel',
		link: function(scope, elem, attr, ngModelCtrl) {
			ngModelCtrl.$formatters.push(function (modelValue){
				if(modelValue == undefined){
					return '';
				}else if(angular.isDate(modelValue)){
					return $filter('date')(modelValue,(attr.ejpDateformat == '')?'yyyy-MM-dd':attr.ejpDateformat);
				}else if(angular.isNumber(modelValue)) {
					return $filter('date')(new Date(modelValue),(attr.ejpDateformat == '')?'yyyy-MM-dd':attr.ejpDateformat);
				}else {
					return modelValue;
				}
			});
		}
	};
}]);
/**
 * 数值过滤
 */
MetronicApp.directive('ejpNumberFilter', ['$filter',function($filter){
	return {
		restrict : 'A',
		require: 'ngModel',
		link: function(scope, elem, attr, ngModelCtrl) {
			var onf = ngModelCtrl.$formatters.pop();
			ngModelCtrl.$formatters.push(function (modelValue){
				if(modelValue == undefined){
					return '';
				}if(attr.ejpNumberFilter == '' || !isFinite(modelValue) || angular.isObject(modelValue)){
					return modelValue;
				}else{
					return new Number(modelValue).toFixed(attr.ejpNumberFilter);
				}
			});
			ngModelCtrl.$formatters.push(onf);
		}
	};
}]);

/**
 * 条件必输入项指令
**/
MetronicApp.directive('ifrequired', ["$parse",function($parse){
	return {
	    restrict: 'A',
	    require: '?ngModel',
		link: function(scope, elem, attr, ctrl) {
			if (!ctrl) return;

			scope.$watch(attr.ifrequired,function(value,oldValue,_scope){
				//console.log("监听值："+value);
				//重置当前控件
				ctrl.$setPristine();
				ctrl.$setUntouched();

				if(!value){
					/**此处需要综合考虑：条件变化后，是否清除当前控件的数据（可能是加载的数据或者初始化数据）*/
					ctrl.$setViewValue(Number.NaN);				
					//ctrl.$modelValue= Number.NaN;
					//ctrl.$$rawModelValue= undefined;
				}
				ctrl.$valid= true;
				ctrl.$invalid= false;
				
				ctrl.$validate();
			});
			
			ctrl.$validators.ifrequired = function(modelValue, viewValue) {
				var ifrequired = scope.$eval(attr.ifrequired);
				if(ifrequired){
					return !ctrl.$isEmpty(viewValue);
				}else{
					return true;
				}
			};

			attr.$observe('ifrequired', function(value) {
				//console.log("观察值："+value);
				ctrl.$validate();
			});
		}
	};
}]);

/**
 * 日期判断的指令(判断日期在传入的日期之后)
**/
MetronicApp.directive('gtDate', function(){
	function toDate(val){
		if(angular.isDate(val)){
			return val;
		}else if(angular.isString(val)){
			return new Date(val.replace(/-/g, "/"));
		}else if(angular.isNumber(val)){
			return  new Date(val);
		}else {
			throw new Error("转换异常！");
		}
		
	}
	return {
	    restrict: 'A',
	    require: '?ngModel',
		link: function(scope, elem, attr, ctrl) {
			if (!ctrl) return;
			
			scope.$watch(attr.gtDate,function(){				
				ctrl.$validate();
			});
			
			ctrl.$validators.gtDate = function(modelValue, viewValue) {
				var ltDate = scope.$eval(attr.gtDate);
				if(modelValue ==undefined|| ltDate==undefined ){
					return false;
				}else {
					return toDate(modelValue).getTime() > toDate(ltDate).getTime();
				}				
			};
			attr.$observe('gtDate', function() {
				ctrl.$validate();
			});
		}
	};
});

/**
 * 金额对比指令
**/
MetronicApp.directive('numCompaired', function(){
	return {
	    restrict: 'A',
	    require: '?ngModel',
		link: function(scope, elem, attr, ctrl) {
			if (!ctrl) return;
			 
			ctrl.$validators.numCompaired = function(modelValue, viewValue) {
				//debugger;
				var ltNum = scope.$eval(attr.numCompaired);
				if(modelValue ==undefined|| ltNum==undefined ){
					return false;
				}else {
					var lt_Num = parseInt(ltNum); 
					var gt_Num= parseInt(modelValue);
					console.log(gt_Num > lt_Num);
					return gt_Num > lt_Num;
				}				
			};
			attr.$observe('numCompaired', function() {
				ctrl.$validate();
			});
		}
	};
});

/**
 * 判断密码是否相同
**/
MetronicApp.directive('pwdSame', function(){
	return {
	    restrict: 'A',
	    require: '?ngModel',
		link: function(scope, elem, attr, ctrl) {
			if (!ctrl) return;
			 
			ctrl.$validators.pwdSame = function(modelValue, viewValue) {
				//debugger;
				var newPwd= scope.$eval(attr.pwdSame);
				if(modelValue ==undefined|| newPwd==undefined ){
					return false;
				}else {
					var new_pwd = parseInt(newPwd); 
					var pwd_two= parseInt(modelValue);
					return pwd_two == new_pwd;
				}				
			};
			attr.$observe('pwdSame', function() {
				ctrl.$validate();
			});
		}
	};
});

/**
 * 金额对比指令(优惠券激励活动新增规则)
**/
MetronicApp.directive('numCom', function(){
	return {
	    restrict: 'A',
	    require: '?ngModel',
		link: function(scope, elem, attr, ctrl) {
			if (!ctrl) return;
			
			scope.$watch(attr.numCom,function(){
				ctrl.$validate();
			})
			 
			ctrl.$validators.numCom = function(modelValue, viewValue) {
				//debugger;
				var ltNum = scope.$eval(attr.numCom);
				if(modelValue ==undefined && ltNum==undefined || modelValue==0 && ltNum==0){
					return true;
				}else if(modelValue !=undefined && ltNum ==undefined){
					return true;
				}else if(modelValue ==undefined && ltNum !=undefined){
					return true;
				}
				else if(modelValue !=undefined && ltNum !=undefined){
					var lt_Num = parseInt(ltNum); 
					var gt_Num= parseInt(modelValue);
					console.log(gt_Num > lt_Num);
					return gt_Num > lt_Num;
					
				}				
			};
			attr.$observe('numCom', function() {
				ctrl.$validate();
			});
		}
	};
});

/**
 * 手机号码验证
**/
MetronicApp.directive('mobile', function(){
	return {
		restrict : 'A',
		require: '?ngModel',
		link: function(scope, elem, attr, ctrl) {
			if (!ctrl) return;
			ctrl.$validators.mobile = function(modelValue, viewValue) {
				 var value = modelValue || viewValue;
				    return ctrl.$isEmpty(value) || /^((13[0-9])|(147)|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(value);
			};
			attr.$observe('mobile', function() {
				ctrl.$validate();
			});
		}
	};
});

/**
 * 地区输入项校验指令 
**/
MetronicApp.directive('ejpAreaCheck', ['$http',function($http){
	return {
		require: '?ngModel',
		link: function(scope, elem, attrs, ctrl) {
			var validateUrl = attrs.ejpAreaCheck ||'city/validateCity.action';
			var validationErrorKey = "areaCheck";
			function isEmpty(str){
				return null == str || typeof str === 'undefined' || str === '';
			}
			//监听
            scope.$watch(attrs.ngModel, function (modelValue) {
				ctrl.$setValidity("cityRequired",true);
				ctrl.$setValidity("provRequired",true);
				ctrl.$setValidity(validationErrorKey,true);
        		
				if(angular.isUndefined(modelValue) || isEmpty(modelValue.province)){
					ctrl.$setValidity("provRequired",false);
				}else if(isEmpty(modelValue.city)){
					ctrl.$setValidity("cityRequired",false);
					//console.log("假设【成功】")
				}else{			
					$http.post(validateUrl, modelValue).success(function(data, status){
						if(status === 200 && angular.isDefined(data) && data.result == "success"){
							ctrl.$setValidity(validationErrorKey,true);
							//console.log("校验【成功】")
						}else{
							ctrl.$setValidity(validationErrorKey,false);
							//console.log("校验【失败】")
						}
					}).error(function(data, status){
						ctrl.$setValidity(validationErrorKey,false);
						//console.log('通信【失败】');
					});
				}            	
            }, true);
		}
	};
}]);
/**
 * 分布信息显示指令
**/
MetronicApp.directive('paginationInfo', ['$http',function($http){
    return {  
        restrict: 'A',  
        scope: {  
        	paginationInfo: '='
        },  
        template: "<h5>每页 {{paginationInfo.itemsPerPage}}条 | 共 {{paginationInfo.totalResult}} 条记录 | 当前第 {{paginationInfo.index}} 页 | 共 {{paginationInfo.totalPage}} 页</h5>"  
    };	
}]);

/**
 * 翻页工具条
**/
MetronicApp.controller('EjpPaginationController', ['$scope', '$attrs', '$parse', function ($scope, $attrs, $parse) {
	  var self = this,
	      ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
	      setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;

	  this.init = function(ngModelCtrl_, config) {
	    ngModelCtrl = ngModelCtrl_;
	    this.config = config;

	    ngModelCtrl.$render = function() {
	      self.render();
	    };

	    if ($attrs.itemsPerPage) {
	      $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
	        self.itemsPerPage = parseInt(value, 10);
	        $scope.totalPages = self.calculateTotalPages();
	      });
	    } else {
	      this.itemsPerPage = config.itemsPerPage;
	    }
	  };

	  this.calculateTotalPages = function() {
	    var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
	    return Math.max(totalPages || 0, 1);
	  };

	  this.render = function() {
	    $scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;
	  };

	  $scope.selectPage = function(page) {
	    if ( $scope.page !== page && page > 0 && page <= $scope.totalPages) {
	      ngModelCtrl.$setViewValue(page);
	      ngModelCtrl.$render();
	    }
	  };
	  $scope.getPageSize = function(){
		  return self.itemsPerPage || this.itemsPerPage;
	  };
	  $scope.getText = function( key ) {
	    return $scope[key + 'Text'] || self.config[key + 'Text'];
	  };
	  $scope.noPrevious = function() {
	    return $scope.page === 1;
	  };
	  $scope.noNext = function() {
	    return $scope.page === $scope.totalPages;
	  };

	  $scope.$watch('totalItems', function() {
	    $scope.totalPages = self.calculateTotalPages();
	  });

	  $scope.$watch('totalPages', function(value) {
	    setNumPages($scope.$parent, value); // Readonly variable

	    if ( $scope.page > value ) {
	      $scope.selectPage(value);
	    } else {
	      ngModelCtrl.$render();
	    }
	  });
	}])

	.constant('ejpPaginationConfig', {
	  itemsPerPage: 10,
	  boundaryLinks: true,
	  directionLinks: true,
	  firstText: unescape('%AB'),//"First",
	  previousText: unescape('%u2039'),//"Previous",
	  nextText: unescape('%u1808'),//"Next",
	  lastText: unescape('%u1809'),//"Last",
	  rotate: true
	})

	.directive('ejpPagination', ['$parse', 'ejpPaginationConfig', function($parse, paginationConfig) {
	  return {
	    restrict: 'EA',
	    scope: {
	      totalItems: '=',
	      firstText: '@',
	      previousText: '@',
	      nextText: '@',
	      lastText: '@'
	    },
	    require: ['ejpPagination', '?ngModel'],
	    controller: 'EjpPaginationController',
	    templateUrl: 'template/pagination/ejp-pagination.html',
	    replace: true,
	    link: function(scope, element, attrs, ctrls) {
	      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

	      if (!ngModelCtrl) {
	         return; // do nothing if no ng-model
	      }

	      // Setup configuration parameters
	      var maxSize = angular.isDefined(attrs.maxSize) ? scope.$parent.$eval(attrs.maxSize) : paginationConfig.maxSize,
	          rotate = angular.isDefined(attrs.rotate) ? scope.$parent.$eval(attrs.rotate) : paginationConfig.rotate;
	      scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
	      scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : paginationConfig.directionLinks;

	      paginationCtrl.init(ngModelCtrl, paginationConfig);

	      if (attrs.maxSize) {
	        scope.$parent.$watch($parse(attrs.maxSize), function(value) {
	          maxSize = parseInt(value, 10);
	          paginationCtrl.render();
	        });
	      }

	      // Create page object used in template
	      function makePage(number, text, isActive) {
	        return {
	          number: number,
	          text: text,
	          active: isActive
	        };
	      }

	      function getPages(currentPage, totalPages) {
	        var pages = [];

	        // Default page limits
	        var startPage = 1, endPage = totalPages;
	        var isMaxSized = ( angular.isDefined(maxSize) && maxSize < totalPages );

	        // recompute if maxSize
	        if ( isMaxSized ) {
	          if ( rotate ) {
	            // Current page is displayed in the middle of the visible ones
	            startPage = Math.max(currentPage - Math.floor(maxSize/2), 1);
	            endPage   = startPage + maxSize - 1;

	            // Adjust if limit is exceeded
	            if (endPage > totalPages) {
	              endPage   = totalPages;
	              startPage = endPage - maxSize + 1;
	            }
	          } else {
	            // Visible pages are paginated with maxSize
	            startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;

	            // Adjust last page if limit is exceeded
	            endPage = Math.min(startPage + maxSize - 1, totalPages);
	          }
	        }

	        // Add page number links
	        for (var number = startPage; number <= endPage; number++) {
	          var page = makePage(number, number, number === currentPage);
	          pages.push(page);
	        }

	        // Add links to move between page sets
	        if ( isMaxSized && ! rotate ) {
	          if ( startPage > 1 ) {
	            var previousPageSet = makePage(startPage - 1, '...', false);
	            pages.unshift(previousPageSet);
	          }

	          if ( endPage < totalPages ) {
	            var nextPageSet = makePage(endPage + 1, '...', false);
	            pages.push(nextPageSet);
	          }
	        }

	        return pages;
	      }

	      var originalRender = paginationCtrl.render;
	      paginationCtrl.render = function() {
	        originalRender();
	        if (scope.page > 0 && scope.page <= scope.totalPages) {
	          scope.pages = getPages(scope.page, scope.totalPages);
	        }
	      };
	    }
	  };
	}]).run(["$templateCache",function(a) {
		a.put("template/pagination/ejp-pagination.html"
				,'<div>\n<ul class="pagination">\n'
				+'  <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(1)">{{getText(\'first\')}}</a></li>\n'
				+'  <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n'
				+'  <li ng-repeat="label in pages track by $index" ng-class="{active: label.active}"><a href ng-click="selectPage(label.number)">{{label.text}}</a></li>\n'
				+'  <li ng-if="directionLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n'
				+'  <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(totalPages)">{{getText(\'last\')}}</a></li>\n'
				+'</ul>\n<h5>每页 {{getPageSize()}}条 | 共 {{totalItems}} 条记录 | 当前第 {{page}} 页 | 共 {{totalPages}} 页</h5></div>');
	}]);

// 提交以后禁用按钮一段时间，防止重复提交
MetronicApp.directive('ejpNoMoreSubmit',['$interval',function($interval){
	var tmpDire = {
			restrict:'A',
			link:LinkFn
	};
	
	function LinkFn(mScope,mElement,mAttrs){
		mElement.bind('click',function(event){
			mElement[0].disabled=true;
			$interval(function(){
				mElement[0].disabled=false;
			},3000);
		})
	}
	
	return tmpDire;
}]);

// 校验时间应该在某个时间之前
MetronicApp.directive('ejpDateTerm',function(){
	var tmpDire = {
			restrict : 'A',
			require:'ngModel',
			link:LinkFn
	};
	
	function LinkFn(mScope,mElement,mAttrs,mNgModel){
		
		function dateAfterValidate(value){
			
			var DATE_REG = /\w{4}-\w{2}-\w{2}/;
			var terminateDate = new Date(mAttrs.termDate);
			if(!DATE_REG.test(mAttrs.termDate)){
				terminateDate = new Date(parseInt(mAttrs.termDate));
			}
			
			var beginDate = new Date(mAttrs.startDate);
			if(!DATE_REG.test(mAttrs.startDate)){
				beginDate = new Date(parseInt(mAttrs.startDate));
			}
			var myDate = new Date(value);
			
			if(myDate < beginDate){
				mNgModel.$setValidity('dateterm',true);
			}else{
				mNgModel.$setValidity('dateterm',false);
			}
			return value;
		}
		
		mNgModel.$parsers.push(dateAfterValidate);
	}
	
	return tmpDire;
});

// 校验时间在某个时间之后
MetronicApp.directive('beforeDate',function(){
	var tmpDire = {
			restrict : 'A',
			require:'ngModel',
			link:LinkFn
	};
	
	function LinkFn(mScope,mElement,mAttrs,mNgModel){
		
		function dateAfterValidate(value){
			
			var DATE_REG = /\w{4}-\w{2}-\w{2}/;
			
			var beginDate = new Date(mAttrs.startDate);
			if(!DATE_REG.test(mAttrs.startDate)){
				beginDate = new Date(parseInt(mAttrs.startDate));
			}
			
			var myDate = new Date(value);
			console.log(mAttrs.startDate,value);
			console.log(myDate,beginDate);
			
			if(myDate >= beginDate){
				mNgModel.$setValidity('datebefore',true);
			}else{
				mNgModel.$setValidity('datebefore',false);
			}
			return value;
		}
		
		mNgModel.$parsers.push(dateAfterValidate);
	}
	
	return tmpDire;
});

/**
 * 页面缓冲 进度条指令
 */
MetronicApp.directive('loadPageData',['$interval',function($interval){
	return {
        template: '<div class="blockUI blockMsg blockElement" style="z-index: 6011; position: absolute; padding: 0px; margin: 0px; width: 30%; top: 80%; left: 360px; text-align: center; color: rgb(0, 0, 0); border: 0px; cursor: wait;">'
        	      +'   <div class="loading-message loading-message-boxed">'
        	      +'       <img src="../assets/global/img/loading-spinner-grey.gif" align="" />'
        	      +'       <span>&nbsp;&nbsp;拼命加载中...</span>'
        	      +'   </div>'
        	      +'</div>',
        restrict: "E",
        replace: true
    }
}]);

MetronicApp.directive('submitLoad',['$interval',function($interval){
	return {
        template: '<div class="blockUI blockMsg blockElement" style="z-index: 2011; position: absolute; padding: 0px; margin: 0px; width: 30%; top: 80%; left: 360px; text-align: center; color: rgb(0, 0, 0); border: 0px; cursor: wait;">'
        	      +'   <div class="loading-message loading-message-boxed">'
        	      +'       <img src="../assets/global/img/loading-spinner-grey.gif" align="" />'
        	      +'       <span>&nbsp;&nbsp;提交中,请耐心等待...</span>'
        	      +'   </div>'
        	      +'</div>',
        restrict: "E",
        replace: true
    }
}]);

// 同前一个加载指令，改变了距离（left:30%）
MetronicApp.directive('loadData',function(){
	return {
        template: '<div class="blockUI blockMsg blockElement" style="z-index: 2011; position: absolute; padding: 0px; margin: 0px; width: 30%; top: 80%; left: 30%; text-align: center; color: rgb(0, 0, 0); border: 0px; cursor: wait;">'
        	      +'   <div class="loading-message loading-message-boxed">'
        	      +'       <img src="../assets/global/img/loading-spinner-grey.gif" align="" />'
        	      +'       <span>&nbsp;&nbsp;拼命加载中...</span>'
        	      +'   </div>'
        	      +'</div>',
        restrict: "E",
        replace: true
    }
});


//检测会员标签名称是否已经使用 
MetronicApp.directive('ejpValidTag',['$http','$q',function($http,$q){
	var tmpDire = {
			restrict:'A',
			require:'ngModel',
			link:link
	};
	
	function link(scope,element,attrs,ctrl){
		
		ctrl.$asyncValidators.ejpValidTag = function(modelValue,viewValue){
			// can not be null
			var counter = 0;
			var oriId = scope.tagUser.id;
			
			if(ctrl.$isEmpty(modelValue)){
				return $q.when();
			}
			
			var usedList = [];
			var def = $q.defer();
			
			var req = {
					url:"cityTag/findAllCityTagByCity",
					method:'POST',
					data:{
						city:scope.tagUser.city
					}
			};
			
			$http(req).then(successCb,failCb);
			
			function successCb(res){
				if(res.data.result === 'success'){
					usedList = [].concat(res.data.datas.dataList);
					angular.forEach(usedList,function(item){
						if(item.id != oriId && item.tagName === modelValue){
							counter++;
						}
					});
					
					console.log(usedList);
					
					if(counter < 1){
						def.resolve();
					}else{
						def.reject();
					}
				}else{
					console.log("failed get all city tag of ",scope.tagUser.city,res);
				}
			}
			
			function failCb(res){
				console.log("failed get all city tag of ",scope.tagUser.city,res);
			}
			return def.promise;
		}
	}
	
	return tmpDire;
}]);

MetronicApp.directive('refreshCollection',['$parse',function($parse){
	return {
		restrict:'A',
		require:['select','ngModel'],
		compile : function ngBindCompile($element, $attr) {
			var match = $attr.refreshCollection.match(/^\s*([\s\S]+?)\s+by\s+([\s\S]+?)?\s*$/);

			if (!match) {
				 throw new Error("Expected expression in form of \"refreshFn by param\".");
			}

			var refreshFn = $parse(match[1] || '');
			var param = match[2];

			return function(scope,element,attrs,ctrl){
				var unWatch = scope.$watch(param,function(nValue,oValue){
					ctrl[1].$setViewValue(Number.NaN);
					if(angular.isDefined(nValue)){
						refreshFn(scope)(nValue);
					}
				},true/*此处性能比较差*/);
			};
		}
	};
}]);

//金额校验
MetronicApp.directive('priceFormat',function(){
	return {
		restrict:'A',
		scope:{
			price:'='
		},
		link:function($scope,element,attrs){
			 
              element.bind('keyup',function(){
            	  var regStrs = [ 
	                 ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0 
	                 ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点 
	                 ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点 
	                 ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上 
	              ]; 
	              for(var i=0; i<regStrs.length; i++){ 
	                 var reg = new RegExp(regStrs[i][0]); 
	                 this.value = this.value.replace(reg, regStrs[i][1]); 
	              }
              });
              element.bind('blur',function(){	
            	  var v = this.value; 
	              if(v === ''){ 
	                  v = '0.00'; 
	              }else if(v === '0'){
	                  v = '0.00'; 
	              }else if(v === '0.'){ 
	                  v = '0.00'; 
	              }else if(/^0+\d+\.?\d*.*$/.test(v)){ 
	                  v = v.replace(/^0+(\d+\.?\d*).*$/, '$1'); 
	                  //v = inp.getRightPriceFormat(v).val; 
	              }else if(/^0\.\d$/.test(v)){ 
	                  v = v + '0'; 
	              }else if(!/^\d+\.\d{2}$/.test(v)){ 
	                  if(/^\d+\.\d{2}.+/.test(v)){ 
	                      v = v.replace(/^(\d+\.\d{2}).*$/, '$1'); 
	                  }else if(/^\d+$/.test(v)){ 
	                      v = v + '.00'; 
	                  }else if(/^\d+\.$/.test(v)){ 
	                      v = v + '00'; 
	                  }else if(/^\d+\.\d$/.test(v)){
	                      v = v + '0'; 
	                  }else if(/^[^\d]+\d+\.?\d*$/.test(v)){ 
	                      v = v.replace(/^[^\d]+(\d+\.?\d*)$/, '$1'); 
	                  }else if(/\d+/.test(v)){ 
	                      v = v.replace(/^[^\d]*(\d+\.?\d*).*$/, '$1'); 
	                      //ty = false; 
	                  }else if(/^0+\d+\.?\d*$/.test(v)){ 
	                      v = v.replace(/^0+(\d+\.?\d*)$/, '$1'); 
	                      //ty = false; 
	                  }else{ 
	                      v = '0.00'; 
	                  } 
	              } 
	              this.value = v; 
              });
		}
	}
	
});

//tooltip directive
MetronicApp.directive('tooltips', [function () {
    return {
        restrict: "C",
        link: function (scope, elem) {
            $(elem).tooltip();
        }
    };
}]);

//验证码指令 wr
MetronicApp.directive('validate',function(){
	var	validateDri={
		restrict:'E',
		template:"<img id='imgObj'  ng-src='{{code}}' ng-click='changeImg()' />",
		link:functionLink
	};
	
	function functionLink($scope,element,attrs){
		$scope.code='code';
		element.css("width", "102");
		element.css("height", "42");
		element.bind("mouseenter", function() {
			element.css("cursor", "pointer");
		});
		$scope.changeImg=function(){
			$scope.code=chgUrl($scope.code);
			console.log($scope.code);
		}
	};
	
	function chgUrl(url) {
		var timestamp = (new Date()).valueOf();
		url = url.substring(0, 4);
		if ((url.indexOf("&") >= 0)) {
			url = url + "×tamp=" + timestamp;
		} else {
			url = url + "?timestamp=" + timestamp;
		}
		return url;
	}
	
	return validateDri;
});

/**输出单条规模信息*/
MetronicApp.directive('stackTrace',function(){
	return {
        restrict: "E",
        replace: true,
        scope: {
            item: '='
        },
        template:
        "<div style=\"margin-left:20px\">"+
        "at <span data-ng-bind=\"item.claSS\"></span>.<span data-ng-bind=\"item.method\"></span>("+
        "<span data-ng-if=\"item.file != null\">"+
        "	<span data-ng-bind=\"item.file\"></span>"+
        "	<span data-ng-if=\"item.line > -1\">:<span data-ng-bind=\"item.line\"></span></span>"+
        "</span>"+
        "<span data-ng-if=\"item.file == null\">Unknown Source</span>)"+
        "</div>"
	};
});

/**输出异常信息*/
MetronicApp.directive('throwable',function(){
	return {
        restrict: "E",
        replace: true,
        scope: {
        	item:'='
        },
        template:"<div>"
        +"<div><span data-ng-bind=\"item.name\" style=\"color:red\"></span>:<span data-ng-bind=\"item.message\"></span></div>"
        +"<div data-ng-repeat=\"est in item.extendedStackTrace\">"
        +"    <stack-trace item=\"est\"></stack-trace>"
        +"</div>"
        +"</div>"
	};
});

//number校验
MetronicApp.directive('numberFormat',function(){
	return {
		restrict:'A',
		scope:{
			price:'='
		},
		link:function($scope,element,attrs){
			 
              element.bind('keyup',function(){
            	  var regStrs = [ 
	                 ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0 
	                 ['[^\\d\\.]+$', ''] //禁止录入任何非数字和点 
	              ]; 
	              for(var i=0; i<regStrs.length; i++){ 
	                 var reg = new RegExp(regStrs[i][0]); 
	                 this.value = this.value.replace(reg, regStrs[i][1]); 
	              }
              });
              element.bind('blur',function(){	
            	  var v = this.value; 
	              if(v === ''){ 
	                  v = '0'; 
	              }else if(v === '0'){
	                  v = '0'; 
	              }else if(v === '0.'){ 
	                  v = '0'; 
	              }else if(/^0+\d+\.?\d*.*$/.test(v)){ 
	                  v = v.replace(/^0+(\d+\.?\d*).*$/, '$1'); 
	                  //v = inp.getRightPriceFormat(v).val; 
	              }else if(/^0\.\d$/.test(v)){ 
	                  v = v; 
	              }else if(!/^\d+\.\d{2}$/.test(v)){ 
	                  if(/^\d+\.\d{2}.+/.test(v)){ 
	                      v = v.replace(/^(\d+\.\d{2}).*$/, '$1'); 
	                  }else if(/^\d+$/.test(v)){ 
	                      v = v ; 
	                  }else if(/^\d+\.$/.test(v)){ 
	                      v = v; 
	                  }else if(/^\d+\.\d$/.test(v)){
	                      v = v ; 
	                  }else if(/^[^\d]+\d+\.?\d*$/.test(v)){ 
	                      v = v.replace(/^[^\d]+(\d+\.?\d*)$/, '$1'); 
	                  }else if(/\d+/.test(v)){ 
	                      v = v.replace(/^[^\d]*(\d+\.?\d*).*$/, '$1'); 
	                      //ty = false; 
	                  }else if(/^0+\d+\.?\d*$/.test(v)){ 
	                      v = v.replace(/^0+(\d+\.?\d*)$/, '$1'); 
	                      //ty = false; 
	                  }else{ 
	                      v = '0'; 
	                  } 
	              } 
	              this.value = v; 
              });
		}
	}
	
});

