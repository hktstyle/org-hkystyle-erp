'use strict';

MetronicApp.controller('DashboardController', function($rootScope, $scope, $http,ejpAlert,$state) {
	
	$scope.$on("switchRole_broadcast", function(event,arg){
		if(arg.dashboard){
			$scope.renderView();
		}
	});

    // // set sidebar closed and body solid layout mode
    // $rootScope.settings.layout.pageBodySolid = true;
    // $rootScope.settings.layout.pageSidebarClosed = false;
    //
    // $scope.identity = {};
    //
    // var beginTime  = moment().subtract('days', 29)._d
    // var  endTime = moment()._d ;
    //
    // $scope.beginTime = beginTime;
    // $scope.endTime = endTime;
    //
    // var orderSO = {
    	// timeS : beginTime,
    	// timeE : endTime
    // };
    //
	// var bizSO = {
	// 	beginTime:beginTime,
	// 	endTime:endTime
	// }
	//
    // $scope.order = {};
    // $scope.bizUser = {};
    //
    // /**
     // * 订单数据
     // */
    // $scope.orderLabels = [];
    // $scope.orderSeries = [''];
	// $scope.orderData = [];
	//
	// $scope.getOrderData = function(){
	// 	$http.post( 'order/getJiupiOrderCount' , orderSO).success(function (response) {
   //          if (response.result === 'success') {
   //          	$scope.order = response.data;
   //          }
	//     });
	// }
   //
   //
   //  /**
   //   * 最新订单列表 和折线图
   //   */
	// $scope.getJiupiOrderInfo = function(){
	//     $http.post( 'order/getJiupiOrderInfo',orderSO).success(function (response) {
	//         if (response.result === 'success') {
	//         	$scope.orderlog = response.data;
	//             $scope.orderlog.item = response.data.monthOrders;
	//             $scope.orderlog.orderItemList = response.data.itemList;
	//
	//         	 var flagData = [];
	//
	//         	 angular.forEach($scope.orderlog.item,function(data,index){
	//         		 $scope.orderLabels.push(data.createTime);
	//          		 flagData.push(data.orderAmount);
	//         	 });
	//         	 $scope.orderData.push(flagData);
	//         }
	//     });// SUCCESS FUNCTION END
	// }
   //  /**
   //   * 会员相关数据 和折线图
   //   */
   //  $scope.labels = [];
   //  $scope.series = [''];
	// $scope.data = [];
	// $scope.hasBizChartData = false;//判断会员的折线图是否有数据
	// $scope.getBizUserData = function(){
	// 	$http.post('bizUser/getBizUserDetailData',bizSO).success(function (response) {
	// 		if (response.result === 'success') {
	// 			$scope.bizUser = response.data;
	// 			var flagData = [];
	//
	// 			if(!$scope.hasBizChartData){
	// 				for(var key in $scope.bizUser.userMap){
	// 					$scope.labels.push(key);
	// 					flagData.push($scope.bizUser.userMap[key]);
	// 				}
	// 				$scope.data.push(flagData);
	// 				$scope.hasBizChartData = true;
	// 			}
	// 		}
	// 	});// SUCCESS FUNCTION END
	// }
	//
	// $scope.findHomeAuditContentList = function(){
	//     $http.get('auditInfo/findHomeAuditContentList/.action').success(function (data) {
	//         if (data.result === 'success') {
	//         	$scope.otherLog = data.list;
	//         }
	//    });
	// }
	//
	// /**
	//  * 获取视图中的数据
	//  */
	// $scope.renderView = function(){
	// 	$scope.identity = UserInfoService.userInfo();//刷新用户信息
	//     if($scope.identity.isCityAdmin){
	// 		$scope.targetOrderUrl = "#/cityadmin_order_list.html";
	// 		$scope.targetBizUserUrl = "#/cityAdmin_bizUser_list.html";
	// 	}else{
	// 	    $scope.targetOrderUrl = "#/order_list.html";
	// 		$scope.targetBizUserUrl = "#/bizUser_list.html"
	// 	}
	//
	// 	$scope.getOrderData();
	// 	$scope.getJiupiOrderInfo();
	// 	$scope.getBizUserData();
	// 	$scope.findHomeAuditContentList();
	// }
	//
	// $scope.renderView();
	//
   // //日期范围控件 BEGIN
   //   var cb = function(start, end, label) {
   //     $('#reportrange span').html(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
   //   }
   //
   //   var optionSet1 = {
   //     language:  'zh-CN',
   //     startDate: moment().subtract('days', 29),
   //     endDate: moment(),
   //     minDate: '01/01/2012',
   //     maxDate: '12/31/2014',
   //     dateLimit: { days: 60 },
   //     showDropdowns: true,
   //     showWeekNumbers: true,
   //     timePicker: false,
   //     timePickerIncrement: 1,
   //     timePicker12Hour: true,
   //     ranges: {
   //        '今天': [moment(), moment()],
   //        '昨天': [moment().subtract('days', 1), moment().subtract('days', 1)],
   //        '近一周': [moment().subtract('days', 6), moment()],
   //        '近30天': [moment().subtract('days', 29), moment()],
   //        '本月': [moment().startOf('month'), moment().endOf('month')],
   //        '上月': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
   //     },
   //     opens: 'left',
   //     buttonClasses: ['btn btn-default'],
   //     applyClass: 'btn-small btn-primary',
   //     cancelClass: 'btn-small',
   //     format: 'MM/DD/YYYY',
   //     separator: ' to ',
   //     locale: {
   //         applyLabel: '确定',
   //         cancelLabel: '取消',
   //         fromLabel: '起始时间',
   //         toLabel: '结束时间',
   //         customRangeLabel: '自定义',
   //         daysOfWeek: ['周日', '周一', '周二', '周三', '周四', '周五','周六'],
   //         monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
   //         firstDay: 1
   //     }
   //   };
   //
   //   var optionSet2 = {
   //     language:  'zh-CN',
   //     startDate: moment().subtract('days', 7),
   //     endDate: moment(),
   //     opens: 'left',
   //     ranges: {
   //        '今天': [moment(), moment()],
   //        '昨天': [moment().subtract('days', 1), moment().subtract('days', 1)],
   //        '近一周': [moment().subtract('days', 6), moment()],
   //        '近30天': [moment().subtract('days', 29), moment()],
   //        '本月': [moment().startOf('month'), moment().endOf('month')],
   //        '上月': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
   //     },
   //     locale: {
   //         applyLabel: '确定',
   //         cancelLabel: '取消',
   //         fromLabel: '起始时间',
   //         toLabel: '结束时间',
   //         customRangeLabel: '自定义',
   //         daysOfWeek: ['周日', '周一', '周二', '周三', '周四', '周五','周六'],
   //         monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
   //         firstDay: 1
   //     }
   //   };
   //
   //   $('#reportrange span').html(moment().subtract('days', 29).format('MM/DD/YYYY') + ' - ' + moment().format('MM/DD/YYYY'));
   //
   //   $('#reportrange').daterangepicker(optionSet1, cb);
   //   $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
   //
   //   $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
   //
   //  	  orderSO.timeS = picker.startDate._d;
   //  	  orderSO.timeE = picker.endDate._d;
   //  	  $scope.getOrderData();
   //
   //  	  bizSO.beginTime = picker.startDate._d;
   //  	  bizSO.endTime = picker.endDate._d;
   //  	  $scope.getBizUserData();
   //   });
   //
   //  $('#options1').click(function() {
   //     $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
   //   });
   //
   //  $('#options2').click(function() {
   //     $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
   //   });
   //
   //  $('#destroy').click(function() {
   //     $('#reportrange').data('daterangepicker').remove();
   //   });
   //
   //日期范围控件 END  
});